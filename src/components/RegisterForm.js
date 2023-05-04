/* eslint-disable react/prop-types */
import { Trans, useTranslation } from 'next-i18next';
import React, { useState, useReducer, useEffect } from 'react';
import {
  Grid, Box, Button, List, ListItem, Heading, Link, Text,
} from '@codeday/topo/Atom';
import { DataCollection } from '@codeday/topo/Molecule';
import { apiFetch, useAnalytics } from '@codeday/topo/utils';
import { Ticket } from '@codeday/topocons/Icon';
import { print } from 'graphql';
import PaymentBox from './PaymentBox';
import PromoBox from './PromoBox';
import RegistrantBox from './RegistrantBox';
import GuardianBox from './GuardianBox';
import { RefreshRemainingQuery } from './RegisterForm.gql';
import PostRegistrationSurvey from './PostRegistrationSurvey';

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
  const [guardianData, setGuardianData] = useState();
  const [guardianValid, setGuardianValid] = useState(false);
  const [promoCode, setPromoCode] = useState();
  const [promoPrice, setPromoPrice] = useState();
  const [promoMetadata, setPromoMetadata] = useState();
  const [isStarted, setIsStarted] = useState(false);
  const [isRequestScholarship, setRequestScholarship] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [maxTickets, setMaxTickets] = useState();
  const [createdTickets, setCreatedTickets] = useState([]);
  const [remainingTickets, setRemainingTickets] = useState(event.remainingTickets);
  const { t } = useTranslation('Register');

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
        <Box p={8}>
          <Box mb={4} textAlign="center">
            {isPending ? (
              <>
                <Text fontSize="3xl" bold>{t('pending.heading')}</Text>
                <Text>{t('pending.body')}</Text>
              </>
            ) : (
              <>
                <Text fontSize="3xl" bold>{t('confirmed.heading')}</Text>
                <Text>{t('confirmed.body')}</Text>
              </>
            )}
          </Box>
          {!isPending && createdTickets.map((ticket) => (
            <PostRegistrationSurvey
              key={ticket.id}
              ticket={ticket}
              promoMetadata={promoMetadata}
              inlineWithMultipleTickets={createdTickets.length > 1}
            />
          ))}
        </Box>
      </Box>
    );
  }

  if (remainingTickets <= 0) {
    return (
      <Box {...props}>
        <Box p={8} textAlign="center">
          <Text fontSize="3xl" bold>{t('sold-out.heading')}</Text>
          <Text>{t('sold-out.body')}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box {...props}>
      {event.requiresPromoCode && (
        <Text fontWeight="bold" fontSize="lg" color="red.600">{t('requires-promo-code')}</Text>
      )}
      {remainingTickets <= 20 && (
        <Text fontWeight="bold" fontSize="lg" color="red.600">{t('remaining-tickets', { count: remainingTickets })}</Text>
      )}
      <Grid mt={4} templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={4}>
        {/* Registration */}
        <Box mb={{ base: 8, lg: 0 }}>
          {tickets.length > calcMaxTickets && (
            <Box bg="red.50" borderColor="red.500" color="red.800" borderWidth={1} p={4} mb={4} m={{ base: 4, md: 0 }}>
              <Text mb={0}>
                {t('too-many-tickets', {
                  count: calcMaxTickets,
                  numTicketsToRemove: tickets.length - calcMaxTickets,
                  context: maxTickets !== null && typeof maxTickets !== 'undefined' ? 'more-than-available' : undefined,
                })}
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
                // ticketData always includes locale key
                if (!isStarted && Object.keys(ticketData).length > 1) {
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
              <Button mr={2} onClick={() => updateTickets({ action: 'remove' })}>{t('remove-ticket')}</Button>
            )}
            {tickets.length < calcMaxTickets + 5 && (
              <Button onClick={() => updateTickets({ action: 'add' })}>{t('add-ticket')}</Button>
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
            <DataCollection message="payment" />
          </Box>
        </Box>

        {/* Payment */}
        <Box p={{ base: 4, md: 0 }}>
          <Heading as="h4" fontSize="lg" mb={2}>{t('payment.header')}</Heading>
          <Box mb={4}>
            <Text mb={1}>
              <Trans
                ns="Register"
                i18nKey="payment.ticket-summary"
                components={{ ticketIcon: <Ticket /> }}
                count={tickets.length}
                values={{
                  currency: event.region.currency || 'USD',
                  price: finalPrice * tickets.length,
                }}
                context={event.canEarlyBirdRegister ? 'early-bird' : undefined}
              />
            </Text>
            {isRequestScholarship ? (
              <Link fontSize="sm" color="current.textLight" onClick={() => setRequestScholarship(false)}>{t('payment.cancel-scholarship')}</Link>
            ) : (
              <>
                <PromoBox
                  event={event}
                  onChange={(c, p, u, m) => { setPromoCode(c); setPromoPrice(p); setMaxTickets(u); setPromoMetadata(m); }}
                />
                {finalPrice > 0 && (
                  <Link
                    fontSize="sm"
                    color="current.textLight"
                    onClick={() => setRequestScholarship(true)}
                  >
                    {t('payment.request-scholarship')}
                  </Link>
                )}
              </>
            )}
          </Box>
          <PaymentBox
            event={event}
            isRequestScholarship={isRequestScholarship}
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
            onComplete={(pending, _createdTickets) => {
              setIsPending(pending);
              setIsComplete(true);
              setCreatedTickets(_createdTickets);
              analytics.goal('8FI259EA', 0);
            }}
            mb={4}
          />
          <Box color="current.textLight">
            <Heading as="h4" fontSize="sm" fontWeight="bold" mb={1}>{t('terms.header')}</Heading>
            <List styleType="disc" fontSize="sm" listStylePosition="outside" pl={4}>
              <Trans
                ns="Register"
                i18nKey="terms.body"
                components={{
                  listItem: <ListItem />,
                  conductLink: <Link href="https://www.codeday.org/conduct" target="_blank" />,
                  rulesLink: <Link href="/rules" target="_blank" />,
                }}
                values={{
                  currency: event.region.currency || 'USD',
                }}
              />
            </List>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
