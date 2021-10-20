/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import List, { Item as ListItem } from '@codeday/topo/Atom/List';
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
          <Box pt={4} pb={4}>
            <DataCollection message="pii" />
          </Box>
        </Box>

        {/* Payment */}
        <Box>
          <Heading as="h4" fontSize="lg" mb={2}>Payment</Heading>
          <Box mb={4}>
            <Text mb={1}>
              1x <Ticket />
              &nbsp;CodeDay Ticket {event.canEarlyBirdRegister ? <>(Early Bird)</> : null} - ${finalPrice}
            </Text>
            <PromoBox event={event} onChange={(c, p) => { setPromoCode(c); setFinalPrice(p); }} />
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
          <Box color="current.textLight">
            <Heading as="h4" fontSize="sm" fontWeight="bold" mb={1}>Terms</Heading>
            <List styleType="disc" fontSize="sm" listStylePosition="outside" pl={4}>
              <ListItem>
                You must comply with the{' '}
                <Link href="https://www.codeday.org/conduct" target="_blank">Code of Conduct</Link>{' '}
                &amp; COVID safety rules (including vaccine and mask requirements).
              </ListItem>
              <ListItem>You will need to sign a waiver.</ListItem>
              <ListItem>We may photograph or record you.</ListItem>
              <ListItem>Refunds are available until 24 hours prior.</ListItem>
            </List>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
