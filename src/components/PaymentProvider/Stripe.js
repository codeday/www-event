/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Button } from '@codeday/topo/Atom';
import { apiFetch, useAnalytics } from '@codeday/topo/utils';
import { useColorMode } from '@codeday/topo/Theme';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { print } from 'graphql';
import { useToast, useToken } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { getPaymentIntent } from '../../../utils';
import { RegisterMutation, FinalizePaymentMutation, WithdrawFailedPaymentMutation } from '../RegisterForm.gql';

export default function StripePaymentBox({
  event, ticketsData, guardianData, promoCode, finalPrice, isValid, onComplete, ...rest
}) {
  const [gray600, gray800, black, white] = useToken('colors', ['gray.600', 'gray.800', 'black', 'white']);
  const { colorMode } = useColorMode();
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const analytics = useAnalytics();
  const [isStripeReady, setIsStripeReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const ready = (finalPrice === 0 || isStripeReady) && isValid;
  const expectedPrice = finalPrice * ticketsData.length;

  return (
    <Box pb={8} {...rest}>
      {finalPrice > 0 && (
        <Box mb={0} p={4} rounded="sm" borderWidth={1}>
          <CardElement
            onChange={(e) => setIsStripeReady(e.complete)}
            options={{
              style: {
                base: {
                  fontFamily: 'Sofia Pro,Helvetica,Arial,sans-serif',
                  fontSize: '16px',
                  color: colorMode === 'light' ? black : white,
                  '::placeholder': {
                    color: colorMode === 'light' ? gray600 : gray800,
                  },
                },
              },
            }}
          />
        </Box>
      )}
      <Button
        shadow="md"
        w="100%"
        borderTopRadius={0}
        colorScheme={ready ? 'green' : 'gray'}
        disabled={!ready}
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          analytics.goal('T5G5AK5S', 0);
          try {
            const result = await apiFetch(print(RegisterMutation), {
              eventId: event.id,
              ticketsData,
              guardianData: guardianData || undefined,
              promoCode,
              paymentProvider: 'stripe',
            });

            if (expectedPrice > 0) {
              const intentSecret = getPaymentIntent(result.clear.registerForEvent);
              const intent = await stripe.retrievePaymentIntent(intentSecret);
              if (Math.abs(intent.paymentIntent.amount - expectedPrice * 100) >= 1) {
                throw new Error(
                  t('payment.error.total-changed', {
                    currency: event.region.currency || 'USD',
                    price: intent.paymentIntent.amount / 100,
                  }),
                );
              }

              // eslint-disable-next-line no-unused-vars
              const { error: stripeError } = await stripe.confirmCardPayment(intentSecret, {
                payment_method: {
                  card: elements.getElement(CardElement),
                },
              });

              if (stripeError) {
                await apiFetch(print(WithdrawFailedPaymentMutation), {
                  paymentIntentId: intent.paymentIntent.id,
                  paymentProvider: 'stripe',
                });
                throw new Error(stripeError.message);
              }

              await apiFetch(print(FinalizePaymentMutation), {
                paymentIntentId: intent.paymentIntent.id,
                paymentProvider: 'stripe',
              });
            }

            onComplete(false, typeof result.clear.registerForEvent === 'object' ? result.clear.registerForEvent?.tickets || [] : []);
          } catch (ex) {
            toast({
              status: 'error',
              title: 'Error',
              description: ex.response?.errors
                ? ex.response.errors.map((error) => error.message).join(' ')
                : ex.toString(),
            });
          }
          setIsLoading(false);
        }}
      >
        {ready
          ? (expectedPrice === 0 ? t('payment.confirm.free') : t('payment.confirm.pay', {
            currency: event.region.currency || 'USD', price: expectedPrice,
          }))
          : t('fill-required')}
      </Button>
    </Box>
  );
}
