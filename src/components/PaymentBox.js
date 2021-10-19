/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Box from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import { Ticket } from '@codeday/topocons/Icon';
import Button from '@codeday/topo/Atom/Button';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { print } from 'graphql';
import { apiFetch } from '@codeday/topo/utils';
import { useToast } from '@chakra-ui/core';
import { RegisterMutation } from './RegisterForm.gql';

export default function PaymentBox({
  event, ticketData, guardianData, promoCode, finalPrice, isValid, onComplete, ...rest
}) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [isStripeReady, setIsStripeReady] = useState(false);
  const ready = isStripeReady && isValid;
  return (
    <Box shadow="md" rounded="sm" borderWidth={1} p={4} {...rest}>
      <Box mb={8}>
        <CardElement onChange={(e) => setIsStripeReady(e.complete)} />
      </Box>
      <Button
        rounded={0}
        w="100%"
        variantColor={ready ? 'brand' : 'gray'}
        disabled={!ready}
        onClick={async () => {
          try {
            const result = await apiFetch(print(RegisterMutation), {
              eventId: event.id,
              ticketData,
              ...(ticketData.age < 18 ? { guardianData } : {}),
              promoCode,
            });
            const intentSecret = result.clear.registerForEvent;
            const intent = await stripe.retrievePaymentIntent(intentSecret);
            if (intent.paymentIntent.amount !== finalPrice * 100) {
              throw new Error(
                `The total changed since the page was loaded (this usually means a discount expired), and you were`
                  + ` NOT charged. The new total is ${intent.paymentIntent.amount / 100}. Please refresh the page.`,
              );
            }

            // eslint-disable-next-line no-unused-vars
            const { error: stripeError } = await stripe.confirmCardPayment(intentSecret, {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            });
            // if (stripeError) throw stripeError; // TODO: Uncomment once payment intent processing is fixed
            onComplete();
          } catch (ex) {
            toast({
              status: 'error',
              title: 'Error',
              description: ex.toString(),
            });
          }
        }}
      >
        {ready ? `Pay Now ($${finalPrice})` : '(fill all required fields)'}
      </Button>
    </Box>
  );
}
