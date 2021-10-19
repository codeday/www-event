/* eslint-disable react/prop-types */
import React, { useReducer, useState } from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import { Ticket } from '@codeday/topocons/Icon';
import DataCollection from '@codeday/topo/Molecule/DataCollection';
import PaymentBox from './PaymentBox';
import PromoBox from './PromoBox';
import RegistrantBox from './RegistrantBox';

export default function RegisterForm({ event, ...props }) {
  const [ticketData, setTicketData] = useState();
  const [guardianData, setGuardianData] = useState();
  const [isValid, setIsValid] = useState();
  const [promoCode, setPromoCode] = useState();
  const [finalPrice, setFinalPrice] = useState(event.activeTicketPrice);
  const [isComplete, setIsComplete] = useState(false);

  if (isComplete) {
    return (
      <Box borderWidth={2} rounded={3} borderColor="brand.600" {...props}>
        <Box p={4} bg="brand.600">
          <Heading color="white">Register for CodeDay</Heading>
        </Box>
        <Box p={8} textAlign="center">
          <Text fontSize="3xl" bold>You&apos;re going to CodeDay!</Text>
          <Text>
            You&apos;re all set, and we&apos;re excited to meet you in-person. Keep an eye out for a waiver.
          </Text>
          <Text>
            No need to print a ticket, we&apos;ll check you in by name at the door.
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box borderWidth={{ base: 0, md: 2 }} rounded={3} borderColor="brand.600" {...props}>
      <Box p={4} bg="brand.600">
        <Heading color="white">Register for CodeDay</Heading>
      </Box>
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={4} p={{ base: 0, md: 8 }}>
        {/* Registration */}
        <Box mb={{ base: 8, lg: 0 }}>
          <RegistrantBox
            event={event}
            onChange={(ticket, guardian, valid) => {
              setTicketData(ticket);
              setGuardianData(guardian);
              setIsValid(valid);
            }}
          />
        </Box>

        {/* Payment */}
        <Box>
          <Heading as="h4" fontSize="lg" mb={2}>Payment</Heading>
          <Box mb={8}>
            <Text>
              1x <Ticket />
              &nbsp;CodeDay Ticket {event.canEarlyBirdRegister ? <>(Early Bird)</> : null} - ${event.activeTicketPrice}
            </Text>
            <PromoBox onChange={(c, p) => { setPromoCode(c); setFinalPrice(p); }} />
          </Box>
          <PaymentBox
            event={event}
            ticketData={ticketData}
            guardianData={guardianData}
            promoCode={promoCode}
            finalPrice={finalPrice}
            isValid={isValid}
            onComplete={() => setIsComplete(true)}
            mb={4}
          />
        </Box>
      </Grid>
      <Box p={8} pt={0}>
        <DataCollection message="pii" />
      </Box>
    </Box>
  );
}
