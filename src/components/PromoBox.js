import React, { useReducer, useState } from 'react';
import Box, { Flex, Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import TextInput from '@codeday/topo/Atom/Input/Text';
import { UiCheck } from '@codeday/topocons/Icon';
import Button from '@codeday/topo/Atom/Button';
import { print } from 'graphql';
import { apiFetch } from '@codeday/topo/utils';
import { useToast } from '@chakra-ui/core';

export default function PromoBox({ onChange, ...rest }) {
  const [promoCode, setPromoCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();

  if (!show) {
    return (
      <Box
        color="current.textLight"
        textDecoration="underline"
        fontSize="sm"
        cursor="pointer"
        onClick={() => setShow(true)}
        {...rest}
      >
        {promoCode ? `Promo: ${promoCode}` : 'Have a promo code?'}
      </Box>
    );
  }

  return (
    <Box {...rest}>
      <Flex>
        <TextInput
          d="inline"
          w="100%"
          minWidth={20}
          ml={2}
          placeholder="Promo Code"
          value={promoCode}
          onChange={
            (e) => setPromoCode(e.target.value)
          }
        />
        <Button
          d="inline"
          ml={2}
          variantColor="green"
          isLoading={isLoading}
          onClick={async () => {
            if (!promoCode) {
              setShow(false);
              return;
            }

            setIsLoading(true);
            try {
              // TODO
              throw new Error('Sorry, that promo code is invalid.');
              setShow(false);
              onChange(promoCode);
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
