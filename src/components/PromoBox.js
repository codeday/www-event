import React, { useState, useRef, useEffect } from 'react';
import {
  Flex, Box, Button, TextInput, Text,
} from '@codeday/topo/Atom';
import { apiFetch, useToasts } from '@codeday/topo/utils';
import { UiCheck } from '@codeday/topocons/Icon';
import { print } from 'graphql';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CheckPromoCode } from './PromoBox.gql';

export default function PromoBox({ event, onChange, ...rest }) {
  const [promoCode, setPromoCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(event.requiresPromoCode);
  const { error, success } = useToasts();
  const { t } = useTranslation('Register');
  const router = useRouter();
  const autoAppliedPromo = useRef(false);

  const promoAppliedString = event.requiresPromoCode ? t('promo-applied.access-code', { promoCode }) : t('promo-applied.promo-code', { promoCode });
  const promoAskString = event.requiresPromoCode ? t('promo-ask.access-code') : t('promo-ask.promo-code');

  const handleSubmitPromo = async (code) => {
    if (!code) {
      onChange(undefined, undefined, undefined, undefined);
      setShow(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiFetch(print(CheckPromoCode), { id: event.id, code });
      const promoDetails = result?.clear?.findFirstEvent?.checkPromoCode;
      if (!promoDetails?.valid) throw new Error(t('common:error.message.no-promo'));
      if (promoDetails.remainingUses !== null && promoDetails.remainingUses <= 0) throw new Error(t('common:error.message.promo-fully-used'));
      success(t('common:success.message.promo-applied', {
        context: promoDetails.type,
        promoName: promoDetails.displayDiscountName,
        discountAmount: promoDetails.discountAmount,
        currency: event.region.currency || 'USD',
      }));
      setShow(false);
      onChange(code, promoDetails.effectivePrice, promoDetails.remainingUses, promoDetails.metadata);
    } catch (ex) {
      error(ex.toString());
      setPromoCode('');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.query.promo && typeof router.query.promo === 'string' && !!router.query.promo.trim() && !autoAppliedPromo.current) {
      setShow(true);
      setPromoCode(router.query.promo);
      handleSubmitPromo(router.query.promo);
      autoAppliedPromo.current = true;
    }
  }, [router.query]);

  if (!show) {
    return (
      <Box
        color={(event.requiresPromoCode && !promoCode) ? 'red.600' : 'current.textLight'}
        textDecoration="underline"
        fontSize="sm"
        cursor="pointer"
        onClick={() => setShow(true)}
        {...rest}
      >
        {promoCode ? promoAppliedString : promoAskString}
      </Box>
    );
  }

  return (
    <Box {...rest}>
      {event.requiresPromoCode && (<Text mt={4} mb={2} ml={1} fontSize="sm" fontWeight="bold">{t('access-code')}</Text>)}
      <Flex>
        <TextInput
          display="inline"
          w="100%"
          minWidth={20}
          ml={2}
          placeholder={event.requiresPromoCode ? t('access-code') : t('promo-code')}
          value={promoCode}
          onChange={
            (e) => setPromoCode(e.target.value)
          }
        />
        <Button
          display="inline"
          ml={2}
          colorScheme="green"
          isLoading={isLoading}
          disabled={event.requiresPromoCode && !promoCode}
          onClick={() => handleSubmitPromo(promoCode)}
        >
          <UiCheck />
        </Button>
      </Flex>
    </Box>
  );
}
