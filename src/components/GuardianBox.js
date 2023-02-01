/* eslint-disable react/prop-types */
import React, {
  useEffect, useReducer, useRef,
} from 'react';
import {
  Grid, Box, TextInput, Text,
} from '@codeday/topo/Atom';
import { useTranslation } from 'next-i18next';
import PhoneInput from './PhoneInput';

export default function GuardianBox({ event, onChange, ...rest }) {
  const [guardianData, setGuardianData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );
  const initialRender = useRef(true);
  const { t } = useTranslation('Register');
  useEffect(() => {
    const isValid = Boolean(
      guardianData?.firstName
      && guardianData?.lastName
      && guardianData?.email
      && (guardianData?.phone || guardianData?.whatsApp),
    );

    if (initialRender.current) initialRender.current = false;
    else onChange(guardianData, isValid);
  }, [guardianData]);

  return (
    <Box borderWidth={1} {...rest}>
      <Box bg="gray.300" p={2} color="black" fontWeight="bold" fontSize="lg">
        {t('guardian.heading')}
        <Text fontSize="sm" mb={0}>{t('guardian.subheading')}</Text>
      </Box>
      <Box p={2}>
        <Text fontSize="sm" fontWeight="bold" mb={0}>{t('common:name')}</Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
          <TextInput
            w="100%"
            placeholder={t('common:first-name')}
            value={guardianData.firstName || ''}
            onChange={
              (e) => setGuardianData(['firstName', e.target.value])
            }
          />
          <TextInput
            w="100%"
            placeholder={t('common:last-name')}
            value={guardianData.lastName || ''}
            onChange={
              (e) => setGuardianData(['lastName', e.target.value])
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
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('common:email')}</Text>
            <TextInput
              w="100%"
              placeholder={t('common:email-long')}
              value={guardianData.email || ''}
              onChange={
                (e) => setGuardianData(['email', e.target.value])
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
            {t('common:divider-and')}
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('common:phone-long')}</Text>
            <PhoneInput
              w="100%"
              placeholder={t('common:phone')}
              region={event.region || {}}
              onChange={(phoneNumber, _, isWhatsApp) => {
                setGuardianData([isWhatsApp ? 'whatsApp' : 'phone', phoneNumber]);
                setGuardianData([!isWhatsApp ? 'whatsApp' : 'phone', null]);
              }}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
