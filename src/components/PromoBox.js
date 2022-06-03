import React, { useState } from 'react';
import {
  Flex, Box, Button, TextInput, Text,
} from '@codeday/topo/Atom';
import { apiFetch } from '@codeday/topo/utils';
import { UiCheck } from '@codeday/topocons/Icon';
import { print } from 'graphql';
import { useToast } from '@chakra-ui/react';
import { CheckPromoCode } from './PromoBox.gql';

export default function PromoBox({ event, onChange, ...rest }) {
  const [promoCode, setPromoCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(event.requiresPromoCode);
  const toast = useToast();

  const promoAppliedString = event.requiresPromoCode ? `Access Code: ${promoCode}` : `Promo: ${promoCode}`;
  const promoAskString = event.requiresPromoCode ? `Access code required.` : `Have a promo code?`;

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
      {event.requiresPromoCode && (<Text mt={4} mb={2} ml={1} fontSize="sm" fontWeight="bold">Access Code</Text>)}
      <Flex>
        <TextInput
          d="inline"
          w="100%"
          minWidth={20}
          ml={2}
          placeholder={event.requiresPromoCode ? 'Access Code' : 'Promo Code'}
          value={promoCode}
          onChange={
            (e) => setPromoCode(e.target.value)
          }
        />
        <Button
          d="inline"
          ml={2}
          colorScheme="green"
          isLoading={isLoading}
          disabled={event.requiresPromoCode && !promoCode}
          onClick={async () => {
            if (!promoCode) {
              onChange(undefined, undefined, undefined, undefined);
              setShow(false);
              return;
            }

            setIsLoading(true);
            try {
              const result = await apiFetch(print(CheckPromoCode), { id: event.id, code: promoCode });
              const promoDetails = result?.clear?.findFirstEvent?.checkPromoCode;
              if (!promoDetails?.valid) throw new Error('Promo code not found.');
              if (promoDetails.remainingUses !== null && promoDetails.remainingUses <= 0) {
                throw new Error('Promo code has been fully used.');
              }
              toast({
                status: 'success',
                title: `${promoDetails.displayDiscountName} Applied`,
                description: `${promoDetails.displayDiscountAmount} off!`,
              });
              setShow(false);
              onChange(promoCode, promoDetails.effectivePrice, promoDetails.remainingUses, promoDetails.metadata);
            } catch (ex) {
              toast({
                status: 'error',
                title: 'Error',
                description: ex.toString(),
              });
              setPromoCode('');
            }
            setIsLoading(false);
          }}
        >
          <UiCheck />
        </Button>
      </Flex>
    </Box>
  );
}
