/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useRazorpay from 'react-razorpay';
import { Box, Button } from '@codeday/topo/Atom';
import { apiFetch, useAnalytics } from '@codeday/topo/utils';
import { print } from 'graphql';
import { useToast } from '@chakra-ui/react';
import getConfig from 'next/config';
import { RegisterMutation, FinalizePaymentMutation, WithdrawFailedPaymentMutation } from '../RegisterForm.gql';

const { publicRuntimeConfig } = getConfig();

export default function RazorpayPaymentBox({
  event, ticketsData, guardianData, promoCode, finalPrice, isValid, onComplete, ...rest
}) {
  const Razorpay = useRazorpay();
  const toast = useToast();
  const analytics = useAnalytics();
  const [isLoading, setIsLoading] = useState(false);
  const expectedPrice = finalPrice * ticketsData.length;

  return (
    <Box shadow="md" rounded="sm" borderWidth={1} p={4} {...rest}>
      <Button
        rounded={0}
        w="100%"
        colorScheme={isValid ? 'green' : 'gray'}
        disabled={!isValid}
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          analytics.goal('T5G5AK5S', 0)
          let result;
          try {
            result = await apiFetch(print(RegisterMutation), {
              eventId: event.id,
              ticketsData,
              guardianData: guardianData || undefined,
              promoCode,
              paymentProvider: 'razorpay',
            });
          } catch (ex) {
            toast({
              status: 'error',
              title: 'Error',
              description: ex.response?.errors
                ? ex.response.errors.map((error) => error.message).join(' ')
                : ex.toString(),
            });
            setIsLoading(false);
            return;
          }

          if (expectedPrice <= 0) {
            setIsLoading(false);
            onComplete();
            return;
          }

          const intentId = result.clear.registerForEvent;
          const rzpay = new Razorpay({
            key: publicRuntimeConfig.razorpayKey,
            amount: Math.round(expectedPrice * 100),
            currency: 'INR',
            name: 'CodeDay',
            description: 'CodeDay registration',
            order_id: intentId,
            theme: {
              color: '#ff686b',
            },
            async handler() {
              await apiFetch(print(FinalizePaymentMutation), {
                paymentIntentId: intentId,
                paymentProvider: 'razorpay',
              });
              setIsLoading(false);
              onComplete();
            },
            modal: {
              escape: false,
              async ondismiss() {
                await apiFetch(print(WithdrawFailedPaymentMutation), {
                  paymentIntentId: intentId,
                  paymentProvider: 'razorpay',
                });
                setIsLoading(false);
              },
            },
          });
          rzpay.on('payment.failed', async (res) => {
            await apiFetch(print(WithdrawFailedPaymentMutation), {
              paymentIntentId: intentId,
              paymentProvider: 'razorpay',
            });
            toast({
              status: 'error',
              title: 'Error',
              description: res.description,
            });
            setIsLoading(false);
          });
          rzpay.open();
        }}
      >
        {isValid
          ? (expectedPrice === 0 ? 'Complete Free Registration' : `Pay Now (${event.region?.currencySymbol}${expectedPrice})`)
          : '(fill all required fields)'}
      </Button>
    </Box>
  );
}
