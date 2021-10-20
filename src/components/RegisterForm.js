/* eslint-disable react/prop-types */
import React, { useState, useReducer } from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import List, { Item as ListItem } from '@codeday/topo/Atom/List';
import Button from '@codeday/topo/Atom/Button';
import { Ticket } from '@codeday/topocons/Icon';
import DataCollection from '@codeday/topo/Molecule/DataCollection';
import PaymentBox from './PaymentBox';
import PromoBox from './PromoBox';
import RegistrantBox from './RegistrantBox';
import GuardianBox from './GuardianBox';

export default function RegisterForm({ event, ...props }) {
  const [tickets, updateTickets] = useReducer((prev, {
    action, i, isValid, ticketData,
  }) => {
    if (action === 'add') return [...prev, { isValid: false, ticketData: {} }];
    if (action === 'remove') return prev.slice(0, Math.max(1, prev.length - 1));
    const ret = [...prev];
    ret[i] = {
      isValid,
      ticketData,
    };
    return ret;
  }, [{ isValid: false, ticketData: {} }]);
  const [guardianData, setGuardianData] = useState();
  const [guardianValid, setGuardianValid] = useState(false);
  const [promoCode, setPromoCode] = useState();
  const [promoPrice, setPromoPrice] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [maxTickets, setMaxTickets] = useState();

  const calcMaxTickets = Math.min(10, maxTickets || 10);
  const finalPrice = promoPrice !== null && typeof promoPrice !== 'undefined' ? promoPrice : event.activeTicketPrice;
  const hasMinors = tickets
    .filter((ticket) => ticket.ticketData.age && ticket.ticketData.age < event.majorityAge)
    .length > 0;

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
          {tickets.map((_, i) => (
            <RegistrantBox
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              event={event}
              mb={4}
              onChange={(ticketData, isValid) => {
                updateTickets({
                  i,
                  ticketData,
                  isValid,
                });
              }}
            />
          ))}
          <Box mb={4}>
            {tickets.length > 1 && (
              <Button onClick={() => updateTickets({ action: 'remove' })}>-</Button>
            )}
            {tickets.length < calcMaxTickets && (
              <Button mr={2} onClick={() => updateTickets({ action: 'add' })}>+</Button>
            )}
          </Box>
          {hasMinors && (
            <GuardianBox
              mb={4}
              event={event}
              onChange={(guardian, valid) => { setGuardianData(guardian); setGuardianValid(valid); }}
            />
          )}
          <Box pb={4}>
            <DataCollection message="pii" />
          </Box>
        </Box>

        {/* Payment */}
        <Box>
          <Heading as="h4" fontSize="lg" mb={2}>Payment</Heading>
          <Box mb={4}>
            <Text mb={1}>
              {tickets.length}x <Ticket />
              &nbsp;CodeDay Ticket {event.canEarlyBirdRegister ? <>(Early Bird)</> : null}
              {' - '}${finalPrice * tickets.length}
            </Text>
            <PromoBox event={event} onChange={(c, p, u) => { setPromoCode(c); setPromoPrice(p); setMaxTickets(u); }} />
          </Box>
          <PaymentBox
            event={event}
            ticketsData={tickets.map((ticket) => ticket.ticketData)}
            guardianData={hasMinors ? guardianData : null}
            promoCode={promoCode}
            finalPrice={finalPrice}
            isValid={
              (!hasMinors || guardianValid)
              && tickets.length <= calcMaxTickets
              && tickets.map((ticket) => ticket.isValid).reduce((a, b) => a && b, true)
            }
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
