import React, { useReducer, useState } from 'react';
import Box from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import TextInput from '@codeday/topo/Atom/Input/Text';
import NumInput from '@codeday/topo/Atom/Input/Numeric';
import Divider from '@codeday/topo/Atom/Divider';
import { UiError, UiCheck, Ticket } from '@codeday/topocons/Icon';
import Button from '@codeday/topo/Atom/Button';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { print } from 'graphql';
import { useToasts, apiFetch } from '@codeday/topo/utils';
import { RegisterMutation } from './RegisterForm.gql';
import DataCollection from '@codeday/topo/Molecule/DataCollection';

const MIN_AGE = 13;
const MAX_AGE = 25;

// export const api = 'http://localhost:4000';
// export const apiFetch = (query, variables, headers) => {
//   const client = new GraphQLClient(api, { headers });
//   return client.request(query, variables);
// };

export default function RegisterForm({ event, ...props }) {
  const { success, error } = useToasts();
  const stripe = useStripe();
  const elements = useElements();
  const [ticketData, setTicketData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );
  const [guardianData, setGuardianData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );
  const [promoCode, setPromoCode] = useState();
  const [promoCodeLoading, setPromoCodeLoading] = useState(false);
  const [finalPrice, setFinalPrice] = useState(event.activeTicketPrice);
  return (
    <Box borderWidth={2} rounded={3} borderColor="brand.500" {...props}>
      <Box p={4} bg="brand.500">
        <Heading color="white">Register for CodeDay</Heading>
      </Box>
      <Box m={2} p={4}>
        <Text mb={1}>What is your name?</Text>
        <TextInput
          d="inline"
          m={2}
          w="xs"
          placeholder="First Name"
          value={ticketData.firstName}
          onChange={
            (e) => setTicketData(['firstName', e.target.value])
          }
        />
        <TextInput
          d="inline"
          w="xs"
          placeholder="Last"
          value={ticketData.lastName}
          onChange={
            (e) => setTicketData(['lastName', e.target.value])
          }
        />
        <Text mb={1} mt={2}>How old are you?</Text>
        <NumInput
          m={2}
          w="3xs"
          min={0}
          keepWithinRange
          value={ticketData.age}
          onChange={
            (value) => setTicketData(['age', value])
          }
        />
        {ticketData.age < MIN_AGE
          ? (
            <Text bold color="red.800">
              <UiError />&nbsp;Unfortunately, students under {MIN_AGE} are not allowed to attend CodeDay.
            </Text>
          ) : null}
        {ticketData.age > MAX_AGE
          ? (
            <Text bold color="red.800">
              <UiError />&nbsp;Unfortunately, students over {MAX_AGE} are not allowed ato attend CodeDay.
            </Text>
          ) : null}

        <Text mb={1} mt={2}>
          How can we contact you?
          <br />
          <Text as="span" color="gray.600">(only one of these is required)</Text>
        </Text>
        <TextInput
          d="inline"
          w="xs"
          m={2}
          placeholder="Email Address"
          value={ticketData.email}
          onChange={
            (e) => setTicketData(['email', e.target.value])
          }
        />
        <TextInput
          d="inline"
          w="xs"
          placeholder="Phone Number"
          value={ticketData.phone}
          onChange={
            (e) => setTicketData(['phone', e.target.value])
          }
        />
        {ticketData.age < 18
          ? (
            <>
              <Divider />
              <Text mb={1} mt={2}>
                What is the name of your parent/guardian?
              </Text>
              <TextInput
                d="inline"
                w="xs"
                m={2}
                placeholder="First"
                value={guardianData.firstName}
                onChange={
                  (e) => setGuardianData(['firstName', e.target.value])
                }
              />
              <TextInput
                d="inline"
                w="xs"
                m={2}
                placeholder="Last"
                value={guardianData.lastName}
                onChange={
                  (e) => setGuardianData(['lastName', e.target.value])
                }
              />
              <Text mb={1} mt={2}>
                How can we reach them?
              </Text>
              <TextInput
                d="inline"
                w="xs"
                m={2}
                placeholder="Email Address"
                value={guardianData.email}
                onChange={
                  (e) => setGuardianData(['email', e.target.value])
                }
              />
              <TextInput
                d="inline"
                w="xs"
                m={2}
                placeholder="Phone Number"
                value={guardianData.phone}
                onChange={
                  (e) => setGuardianData(['phone', e.target.value])
                }
              />
            </>
          ) : null}
        <Divider />
        <Text>Do you have a promo code?</Text>
        <TextInput
          d="inline"
          w="xs"
          m={2}
          placeholder="Promo Code"
          value={promoCode}
          onChange={
            (e) => setPromoCode(e.target.value)
          }
        />
        <Button
          d="inline"
          m={2}
          variantColor="green"
          isLoading={promoCodeLoading}
          disabled={promoCodeLoading}
          onClick={
            () => {
              setPromoCodeLoading(true);
            }
          }
        >
          <UiCheck />
        </Button>
        <Divider />
        <Text bold>Payment Details:</Text>
        <Box d="inline-block" m={2} p={4} boxShadow="lg">
          <Text color="gray.800">
            1x <Ticket />
            &nbsp;CodeDay Ticket {event.canEarlyBirdRegister? <>(Early Bird)</>:null} - ${event.activeTicketPrice}
          </Text>
          <Box w="md" bg="gray.50" rounded={1} p={2}>
            <CardElement />
          </Box>
          <Button
            rounded={0}
            w="100%"
            variantColor="brand"
            onClick={async () => {
              let result;
              if (ticketData.age < 18) {
                result = await apiFetch(print(RegisterMutation), {
                  eventId: event.id,
                  ticketData,
                  guardianData,
                  promoCode,
                });
              } else {
                result = await apiFetch(print(RegisterMutation), {
                  eventId: event.id,
                  ticketData,
                  promoCode,
                });
              }
              if (result.errors) {
                error(result.errors[0]);
              }
              const intentSecret = result.clear.registerForEvent;
              const intent = await stripe.retrievePaymentIntent(intentSecret);
              if (intent.paymentIntent.amount !== finalPrice * 100) {
                error('Ticket price mismatch. Please refresh and try again');
              } else {
                const { error: stripeError } = await stripe.confirmCardPayment(intentSecret, {
                  payment_method: {
                    card: elements.getElement(CardElement),
                  },
                });
                if (stripeError) error(stripeError);
                else success('Payment completed!');
              }
            }}
          >
            Pay Now (${finalPrice})
          </Button>
          <Text color="gray.800" fontSize="xs" textAlign="center">
            Secured by <Link href="https://stripe.com">Stripe</Link>
          </Text>
        </Box>
        <DataCollection message="pii" />
      </Box>
    </Box>
  );
}
