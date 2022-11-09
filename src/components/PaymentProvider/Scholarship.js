/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  TextInput,
} from '@codeday/topo/Atom';
import { apiFetch, useAnalytics } from '@codeday/topo/utils';
import { print } from 'graphql';
import { Select, useToast } from '@chakra-ui/react';
import { ScholarshipMutation } from '../RegisterForm.gql';

export default function ScholarshipBox({
  event, ticketsData, guardianData, finalPrice, isValid, onComplete, ...rest
}) {
  const [scholarshipReason, setScholarshipReason] = useState('');
  const [scholarshipReasonOther, setScholarshipReasonOther] = useState(null);
  const toast = useToast();
  const analytics = useAnalytics();
  const [isLoading, setIsLoading] = useState(false);
  const ready = scholarshipReason && (scholarshipReason !== 'OTHER' || scholarshipReasonOther) && isValid;
  const expectedPrice = finalPrice * ticketsData.length;

  return (
    <Box shadow="md" rounded="sm" borderWidth={1} p={4} {...rest}>
      <Text fontWeight="bold">Why do you need a scholarship?</Text>
      <Select placeholder=" " onChange={(e) => setScholarshipReason(e.target.value)} default>
        <option value="FAMILY_CANT_AFFORD">My family can't afford it.</option>
        <option value="CANT_AFFORD">I can't personally afford it, and I'm not financially supported by my family.</option>
        <option value="FAMILY_UNSURE">I can't personally afford it, and I haven't asked my family.</option>
        <option value="DONT_BELIEVE_PAY">I don't like the idea of paying for events like this.</option>
        <option value="OTHER">Other</option>
      </Select>
      {scholarshipReason === 'OTHER' && (
        <>
          <Text fontWeight="bold" mt={4}>Please elaborate below:</Text>
          <TextInput onChange={(e) => setScholarshipReasonOther(e.target.value)} value={scholarshipReasonOther} />
        </>
      )}
      <Button
        mt={4}
        rounded={0}
        w="100%"
        colorScheme={ready ? 'green' : 'gray'}
        disabled={!ready}
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          analytics.goal('MRELY0XP', 0);
          try {
            await apiFetch(print(ScholarshipMutation), {
              eventId: event.id,
              ticketsData,
              guardianData: guardianData || undefined,
              scholarshipReason,
              scholarshipReasonOther,
            });

            onComplete(true);
          } catch (ex) {
            toast({
              status: 'error',
              title: 'Error',
              description: ex.response?.errors
                ? ex.response.errors.map((error) => error.message).join(' ')
                : ex.toString(),
            });
          }
          setIsLoading(false);
        }}
      >
        {ready
          ? (`Request ${event.region.currencySymbol || '$'}${expectedPrice.toFixed(2)} ticket scholarship`)
          : '(fill all required fields)'}
      </Button>
    </Box>
  );
}
