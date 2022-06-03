/* eslint-disable react/prop-types */
import React, { useState, useReducer, useEffect } from 'react';
import {
  Grid, Box, Button, List, ListItem, Heading, Link, Text,
} from '@codeday/topo/Atom';
import { CognitoForm, DataCollection } from '@codeday/topo/Molecule';
import { useTheme, apiFetch, useAnalytics } from '@codeday/topo/utils';
import { Ticket } from '@codeday/topocons/Icon';
import { print } from 'graphql';
import PaymentBox from './PaymentBox';
import PromoBox from './PromoBox';
import RegistrantBox from './RegistrantBox';
import GuardianBox from './GuardianBox';
import { RefreshRemainingQuery } from './RegisterForm.gql';
import { camelCaseObject } from '../../utils';

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

  const analytics = useAnalytics();
  const gray = useTheme().colors.gray[300];
  const { black } = useTheme().colors;
  const [guardianData, setGuardianData] = useState();
  const [guardianValid, setGuardianValid] = useState(false);
  const [promoCode, setPromoCode] = useState();
  const [promoPrice, setPromoPrice] = useState();
  const [promoMetadata, setPromoMetadata] = useState();
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [maxTickets, setMaxTickets] = useState();
  const [remainingTickets, setRemainingTickets] = useState(event.remainingTickets);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const refreshRemaining = async () => {
      const remainingRes = await apiFetch(print(RefreshRemainingQuery), { eventId: event.id });
      if (typeof remainingRes?.clear?.event?.remainingTickets !== 'undefined') {
        setRemainingTickets(remainingRes.clear.event.remainingTickets);
      }
    };
    const interval = setInterval(refreshRemaining, 30000);
    refreshRemaining();
    return () => clearInterval(interval);
  }, [typeof window]);

  const calcMaxTickets = Math.min(10, maxTickets || 10, remainingTickets || 10);
  const finalPrice = promoPrice !== null && typeof promoPrice !== 'undefined' ? promoPrice : event.activeTicketPrice;
  const hasMinors = tickets
    .filter((ticket) => ticket.ticketData.age && ticket.ticketData.age < event.majorityAge)
    .length > 0;

  if (isComplete) {
    analytics.goal('7XJLEFKY', 0);
    return (
      <Box {...props}>
        <Box p={8} textAlign="center">
          <Text fontSize="3xl" bold>You&apos;re going to CodeDay! Now customize your experience.</Text>
          <Text>
            No need to print a ticket, we&apos;ll check you in by name. Please complete the following information:
          </Text>
          <CognitoForm
            formId="104"
            onSubmit={() => { analytics.goal('8YRYGGMT', 0); }}
            prefill={{
              EventGroupId: event.eventGroup.id,
              EventId: event.id,
              Region: event.contentfulWebname,
              TicketCount: tickets.length,
              PromoCode: promoCode ? promoCode.toUpperCase().trim() : undefined,
              PromoMetadata: camelCaseObject(promoMetadata),
              Tickets: tickets.map((ticket) => ({
                Name: {
                  First: ticket.ticketData.firstName,
                  Last: ticket.ticketData.lastName,
                },
                Phone: ticket.ticketData.phone,
                Email: ticket.ticketData.email,
              })),
            }}
            css={`
              .cog-repeating-section__add-button, .cog-repeating-section__remove-button,
              .cog-repeating-section .cog-section__heading {
                display: none !important;
              }
              .cog-repeating-section .cog-row,
              .cog-repeating-section .cog-repeating-section__section,
              .cog-repeating-section .cog-section__inner { margin-left: 0 !important; padding-left: 0 !important; }
              .cog-name .cog-label { display: none !important; }
              .cog-name .cog-input.is-read-only {
                width: calc(100% + 17px) !important;
                background-color: ${gray} !important;
                color: ${black} !important;
                font-size: 2em !important;
                padding: 0.5em !important;
                margin: -9px !important;
              }
            `}
          />
        </Box>
      </Box>
    );
  }

  if (remainingTickets <= 0) {
    return (
      <Box {...props}>
        <Box p={8} textAlign="center">
          <Text fontSize="3xl" bold>Sorry, we&apos;re sold out!</Text>
          <Text>
            We are at absolute maximum capacity, and cannot make exceptions. No tickets will be available at the door.
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box {...props}>
      {event.requiresPromoCode && (
        <Text fontWeight="bold" fontSize="lg" color="red.600">
          This CodeDay isn&apos;t open to the public. If you&apos;ve been invited, enter your Access Code to register.
        </Text>
      )}
      {remainingTickets <= 20 && (
        <Text fontWeight="bold" fontSize="lg" color="red.600">
          Only {remainingTickets} ticket{remainingTickets !== 1 ? 's' : ''} left!
        </Text>
      )}
      <Grid mt={4} templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={4}>
        {/* Registration */}
        <Box mb={{ base: 8, lg: 0 }}>
          {tickets.length > calcMaxTickets && (
            <Box bg="red.50" borderColor="red.500" color="red.800" borderWidth={1} p={4} mb={4} m={{ base: 4, md: 0 }}>
              <Text mb={0}>
                Sorry, only {calcMaxTickets} ticket{calcMaxTickets !== 1 ? 's are' : ' is'} available{
                  maxTickets !== null && typeof maxTickets !== 'undefined' ? ' at this price' : ''
                }. Please remove {tickets.length - calcMaxTickets} to continue.
              </Text>
            </Box>
          )}
          {tickets.map((_, i) => (
            <RegistrantBox
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              event={event}
              mb={4}
              onChange={(ticketData, isValid) => {
                if (!isStarted) {
                  analytics.goal('WJ8DFCV7', 0);
                  setIsStarted(true);
                }
                updateTickets({
                  i,
                  ticketData,
                  isValid,
                });
              }}
            />
          ))}
          <Box mb={4} textAlign="center">
            {tickets.length > 1 && (
              <Button mr={2} onClick={() => updateTickets({ action: 'remove' })}>Remove Ticket</Button>
            )}
            {tickets.length < calcMaxTickets && (
              <Button onClick={() => updateTickets({ action: 'add' })}>Add Ticket</Button>
            )}
          </Box>
          {hasMinors && (
            <GuardianBox
              mb={4}
              event={event}
              onChange={(guardian, valid) => { setGuardianData(guardian); setGuardianValid(valid); }}
            />
          )}
          <Box p={{ base: 4, md: 0 }} pb={4}>
            <DataCollection message="pii" />
          </Box>
        </Box>

        {/* Payment */}
        <Box p={{ base: 4, md: 0 }}>
          <Heading as="h4" fontSize="lg" mb={2}>Payment</Heading>
          <Box mb={4}>
            <Text mb={1}>
              {tickets.length}x <Ticket />
              &nbsp;CodeDay Ticket {event.canEarlyBirdRegister ? <>(Early Bird)</> : null}
              {' - '}{event.region.currencySymbol || '$'}{finalPrice * tickets.length}
            </Text>
            <PromoBox
              event={event}
              onChange={(c, p, u, m) => { setPromoCode(c); setPromoPrice(p); setMaxTickets(u); setPromoMetadata(m); }}
            />
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
              && (!event.requiresPromoCode || promoCode)
            }
            onComplete={() => {
              setIsComplete(true);
              analytics.goal('8FI259EA', 0);
            }}
            mb={4}
          />
          <Box color="current.textLight">
            <Heading as="h4" fontSize="sm" fontWeight="bold" mb={1}>Terms</Heading>
            <List styleType="disc" fontSize="sm" listStylePosition="outside" pl={4}>
              <ListItem>Prices are in {event.region.currency || 'USD'}.</ListItem>
              <ListItem>
                You must follow the{' '}
                <Link href="https://www.codeday.org/conduct" target="_blank">Code of Conduct</Link>{' '}
                &amp; safety rules.
              </ListItem>
              <ListItem>You will need to sign a waiver.</ListItem>
              <ListItem>We may photograph or record you.</ListItem>
              <ListItem>Refunds are available until 48 hours before kickoff.</ListItem>
            </List>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
