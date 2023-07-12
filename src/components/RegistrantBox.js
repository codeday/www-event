/* eslint-disable react/prop-types */
import React, {
  useEffect, useReducer, useRef,
} from 'react';
import { useRouter } from 'next/router';
import {
  Grid, Box, NumberInput, TextInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text,
} from '@codeday/topo/Atom';
import { UiError } from '@codeday/topocons/Icon';
import { Trans, useTranslation } from 'next-i18next';
import PhoneInput from './PhoneInput';

export default function RegistrantBox({ event, onChange, ...rest }) {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [ticketData, setTicketData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );

  useEffect(() => {
    setTicketData(['locale', locale]);
  }, [locale]);

  const initialRender = useRef(true);
  useEffect(() => {
    const isValid = Boolean(ticketData?.firstName && ticketData?.lastName
      && (
        (event.customContactAnd && (ticketData?.email && (ticketData?.phone || ticketData?.whatsApp)))
        || (!event.customContactAnd && (ticketData?.email || ticketData?.phone || ticketData?.whatsApp))
      )
      && ticketData?.age && ticketData.age >= event.minAge && ticketData.age <= event.maxAge)
      && (!event.customRegCollectOrg || ticketData?.metadata?.organization);

    if (initialRender.current) initialRender.current = false;
    else onChange(ticketData, isValid);
  }, [ticketData]);

  return (
    <Box borderWidth={1} {...rest}>
      <Box bg="gray.300" p={2} color="black" fontWeight="bold" fontSize="lg">{t('Register:participant-info')}</Box>
      <Box p={4}>
        <Text fontSize="sm" fontWeight="bold" mb={0}>{t('name')}</Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
          <TextInput
            w="100%"
            placeholder={t('first-name')}
            value={ticketData.firstName || ''}
            onChange={
              (e) => setTicketData(['firstName', e.target.value])
            }
          />
          <TextInput
            w="100%"
            placeholder={t('last-name')}
            value={ticketData.lastName || ''}
            onChange={
              (e) => setTicketData(['lastName', e.target.value])
            }
          />
        </Grid>

        <Grid
          mb={4}
          templateColumns={{ base: '1fr', md: 'minmax(0, 100%) 1fr minmax(0, 100%)' }}
          alignItems="start"
          gap={4}
        >
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('email')}</Text>
            <TextInput
              w="100%"
              placeholder={t('email-long')}
              value={ticketData.email || ''}
              onChange={
                (e) => setTicketData(['email', (e.target.value || '').trim().toLowerCase()])
              }
            />
          </Box>
          <Box
            color="current.textLight"
            fontSize="sm"
            textAlign="center"
            mt={8}
            whiteSpace="nowrap"
          >
            {event.customContactAnd ? t('divider-and') : t('divider-or')}
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('phone-long')}</Text>
            <PhoneInput
              w="100%"
              placeholder={t('phone')}
              region={event.region || {}}
              onChange={(phoneNumber, _, isWhatsApp) => {
                setTicketData([isWhatsApp ? 'whatsApp' : 'phone', phoneNumber]);
                setTicketData([!isWhatsApp ? 'whatsApp' : 'phone', null]);
              }}
            />
          </Box>
        </Grid>

        {event.customRegCollectOrg && (
          <Box pb={4}>
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('Register:collect-org')}</Text>
            <TextInput
              w="100%"
              placeholder={t('Register:collect-org-prefill')}
              value={ticketData?.metadata?.organization || ''}
              onChange={
                (e) => setTicketData(['metadata', { organization: e.target.value }])
              }
            />
          </Box>
        )}

        <Text fontSize="sm" fontWeight="bold" mb={0}>
          {t('Register:collect-participant-age', { context: ticketData.firstName ? undefined : 'generic', name: ticketData.firstName })}
        </Text>
        <NumberInput
          w="3xs"
          min={0}
          keepWithinRange
          value={ticketData.age || ''}
          onChange={
            (value) => setTicketData(['age', value ? Number.parseInt(value) : null])
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        {ticketData.age < event.minAge || ticketData.age > event.maxAge
          ? (
            <Box bg="red.50" borderColor="red.500" color="red.800" borderWidth={1} mt={4} p={4}>
              <Text bold>
                <Trans
                  ns="Register"
                  i18nKey="invalid-age.header"
                  components={{
                    errorIcon: <UiError />,
                  }}
                />
              </Text>
              <Text mb={0}>
                {t('Register:invalid-age.too', { context: ticketData.age > event.maxAge ? 'old' : 'young', minAge: event.minAge, maxAge: event.maxAge })}
              </Text>
            </Box>
          ) : (event.overnightMinAge && ticketData.age < event.overnightMinAge ? (
            <Box bg="red.50" borderColor="red.500" color="red.800" borderWidth={1} mt={4} p={4}>
              <Text bold>
                <Trans
                  ns="Register"
                  i18nKey="overnight-warning.header"
                  components={{
                    errorIcon: <UiError />,
                  }}
                />
              </Text>
              <Text mb={0}>{t('Register:overnight-warning.body', { age: event.overnightMinAge })}</Text>
            </Box>
          ) : null)}
      </Box>
    </Box>
  );
}
