/* eslint-disable react/prop-types */
import React, {
  useEffect, useReducer, useRef, useState,
} from 'react';
import { DateTime } from 'luxon';
import Box, { Flex, Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import TextInput from '@codeday/topo/Atom/Input/Text';
import NumInput from '@codeday/topo/Atom/Input/Numeric';
import Divider from '@codeday/topo/Atom/Divider';
import { UiError } from '@codeday/topocons/Icon';

export const MAJORITY_AGE = 18;
export const MIN_AGE = 13;
export const MAX_AGE = 25;

export default function RegistrantBox({ event, onChange, ...rest }) {
  const [ticketData, setTicketData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );
  const [guardianData, setGuardianData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );

  const initialRender = useRef(true);
  useEffect(() => {
    const isValid = ticketData?.firstName && ticketData?.lastName
    && (ticketData?.email || ticketData?.phone)
    && ticketData?.age && ticketData.age > MIN_AGE && ticketData.age < MAX_AGE
    && (ticketData.age > MAJORITY_AGE || (
      guardianData?.firstName && guardianData?.lastName && (guardianData?.email || guardianData?.phone)
    ));

    if (initialRender.current) initialRender.current = false;
    else onChange(ticketData, guardianData, isValid);
  }, [ticketData, guardianData]);

  return (
    <Box borderWidth={1} {...rest}>
      <Box bg="gray.300" p={2} color="black" fontWeight="bold" fontSize="lg">
        Participant Info
      </Box>
      <Box p={4}>
        <Text fontSize="sm" fontWeight="bold" mb={0}>Name</Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
          <TextInput
            w="100%"
            placeholder="First (Given) Name"
            value={ticketData.firstName}
            onChange={
              (e) => setTicketData(['firstName', e.target.value])
            }
          />
          <TextInput
            w="100%"
            placeholder="Last (Family) Name"
            value={ticketData.lastName}
            onChange={
              (e) => setTicketData(['lastName', e.target.value])
            }
          />
        </Grid>

        <Grid
          mb={4}
          templateColumns={{ base: '1fr', md: 'minmax(0, 100%) 1fr minmax(0, 100%)' }}
          alignItems="center"
          gap={4}
        >
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>Email</Text>
            <TextInput
              w="100%"
              placeholder="Email Address"
              value={ticketData.email}
              onChange={
                (e) => setTicketData(['email', e.target.value])
              }
            />
          </Box>
          <Box color="current.textLight" fontSize="sm" textAlign="center">&mdash;&nbsp;OR&nbsp;&mdash;</Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>Phone Number</Text>
            <TextInput
              w="100%"
              placeholder="Phone Number"
              value={ticketData?.phone?.replace(/[^0-9]/g, '')}
              onChange={
                (e) => setTicketData(['phone', e.target.value])
              }
            />
          </Box>
        </Grid>

        <Text fontSize="sm" fontWeight="bold" mb={0}>
          {ticketData.firstName ? `${ticketData.firstName}'s` : 'Participant'} Age
        </Text>
        <NumInput
          w="3xs"
          min={0}
          keepWithinRange
          value={ticketData.age}
          onChange={
            (value) => setTicketData(['age', value])
          }
        />

        {ticketData.age < MAJORITY_AGE && ticketData.age > MIN_AGE && ticketData.age < MAX_AGE
          ? (
            <>
              <Divider mb={8} mt={8} />
              <Text fontSize="lg" fontWeight="bold">Parent/Guardian Information</Text>
              <Text fontSize="sm" fontWeight="bold" mb={0}>Name</Text>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
                <TextInput
                  w="100%"
                  placeholder="First (Given) Name"
                  value={guardianData.firstName}
                  onChange={
                    (e) => setGuardianData(['firstName', e.target.value])
                  }
                />
                <TextInput
                  w="100%"
                  placeholder="Last (Family) Name"
                  value={guardianData.lastName}
                  onChange={
                    (e) => setGuardianData(['lastName', e.target.value])
                  }
                />
              </Grid>
              <Grid
                mb={4}
                templateColumns={{ base: '1fr', md: 'minmax(0, 100%) 1fr minmax(0, 100%)' }}
                alignItems="center"
                gap={4}
              >
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={0}>Email</Text>
                  <TextInput
                    w="100%"
                    placeholder="Email Address"
                    value={guardianData.email}
                    onChange={
                      (e) => setGuardianData(['email', e.target.value])
                    }
                  />
                </Box>

                <Box color="current.textLight" fontSize="sm" textAlign="center">&mdash;&nbsp;OR&nbsp;&mdash;</Box>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={0}>Phone Number</Text>
                  <TextInput
                    w="100%"
                    placeholder="Phone Number"
                    value={guardianData?.phone?.replace(/[^0-9]/g, '')}
                    onChange={
                      (e) => setGuardianData(['phone', e.target.value])
                    }
                  />
                </Box>
              </Grid>
            </>
          ) : null}

        {ticketData.age < MIN_AGE || ticketData.age > MAX_AGE
          ? (
            <Box bg="red.50" borderColor="red.500" color="red.800" borderWidth={1} mt={4} p={4}>
              <Text bold><UiError /> Sorry, you won&apos;t be able to register.</Text>
              <Text mb={0}>
                CodeDay is mostly targeted to high school students, and isn&apos;t a good fit for those{' '}
                who are {ticketData.age > MAX_AGE ? `over ${MAX_AGE}` : `under ${MIN_AGE}`}.
              </Text>
            </Box>
          ) : null}
      </Box>
    </Box>
  );
}
