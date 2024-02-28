import {
  useCallback, useEffect, useMemo, useReducer, useRef, useState,
} from 'react';
import { apiFetch } from '@codeday/topo/utils';
import shuffle from 'knuth-shuffle-seeded';
import {
  Box, Button, Divider, Heading, Text,
} from '@codeday/topo/Atom';
import { Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TrackSurveyResponse } from './index.gql';
import BasicDemographics from './BasicDemographics';
import Study from './Study';
import { Laptop, Uber } from './BonusSupport';

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export default function PostRegistrationSurvey({
  ticket, inlineWithMultipleTickets, promoMetadata: _promoMetadata, ...props
}) {
  const promoMetadata = (_promoMetadata || ticket.promoCode?.metadata) || {};
  const [pages, setPages] = useState([]);
  const { t } = useTranslation('Survey');

  // Figure out which questions to ask. We will ask less questions when the user has just finished registering multiple people.
  useEffect(() => {
    let newPages = [[...BasicDemographics]];
    if (!inlineWithMultipleTickets) {
      // Add optional questions for participant support bonuses depending on the promo code
      if (promoMetadata.laptop) newPages[0].unshift(Laptop);
      if (promoMetadata.uber) newPages[0].unshift(Uber);

      // Add a few study questions to the first page
      const shuffledStudy = shuffle(Study, ticket.id);
      newPages.push(...chunks(shuffledStudy, 5));
    }
    newPages = newPages
      .map((p) => p.filter((el) => el && el.length !== 0))
      .filter((el) => el && el.length !== 0);
    setPages(newPages);
  }, [inlineWithMultipleTickets, _promoMetadata, ticket.promoCode?.metadata]);

  // If the user already answered all questions on one page, but not the next page, we'll start them on that page.
  const defaultPage = useMemo(() => {
    for (const i in pages) {
      if (Object.hasOwn(pages, i)) {
        for (const q of pages[i]) {
          if (!(q.key in (ticket.surveyResponses || {}))) return i;
        }
      }
    }
    return 0;
  }, [ticket.surveyResponses]);
  const [pageNumber, nextPage] = useReducer((_prev) => Math.min(_prev + 1, pages.length - 1), defaultPage);

  // Show submission indicators
  const [questionsLoading, setQuestionsLoading] = useReducer((_prev, [key, value]) => ({ ..._prev, [key]: value }), {});

  // Sends the response to Clear
  const pendingRequests = useRef({});
  const sendResponse = useCallback((key, value) => {
    if (key in pendingRequests.current) clearTimeout(pendingRequests.current[key]);
    pendingRequests.current[key] = setTimeout(async () => {
      await apiFetch(TrackSurveyResponse, {
        ticket: ticket.id, privateKey: ticket.privateKey, key, value,
      });
      setQuestionsLoading([key, false]);
    }, 500);
  }, [ticket]);

  // Updates the response
  const [responses, setResponse] = useReducer((_prev, [key, value]) => {
    setQuestionsLoading([key, true]);
    sendResponse(key, value);
    return { ..._prev, [key]: value };
  }, ticket.surveyResponses || {});

  if (pages.length === 0) return <></>;

  const currentPageComplete = pages[pageNumber].filter((q) => !(q.key in responses)).length === 0;

  return (
    <Box borderColor="gray.700" borderWidth={2} {...props}>
      <Box p={4} bg="gray.700" color="white">
        <Heading fontSize="xl">{t('title', { name: `${ticket.firstName} ${ticket.lastName}` })}</Heading>
      </Box>
      <Box p={4}>
        {pages[pageNumber].filter((q) => q?.type && q?.key).map((q) => (
          <Box key={q.key}>
            <Heading fontSize="md" mb={2}>
              <Box display="inline" verticalAlign="top">
                {t(q.i18nKey ?? `questions.${q.key}`, { name: ticket.firstName })}
              </Box>
              {questionsLoading[q.key] && <Spinner ml={2} size="xs" />}
            </Heading>
            <q.type
              {...q.props}
              key={q.key}
              questionKey={q.key}
              value={responses[q.key] || ''}
              onSubmit={(val) => setResponse([q.key, val])}
            />
            {q.study && <Text mt={2} fontSize="xs">{t('study')}</Text>}
            <Divider mt={4} mb={4} />
          </Box>
        ))}
        <Box textAlign="center">
          {(pages.length - 1) === pageNumber
            ? (<Text fontSize="sm">{t('last')}</Text>)
            : (
              <Button
                colorScheme="green"
                disabled={!currentPageComplete}
                onClick={() => currentPageComplete && nextPage()}
              >
                {t('next')}
              </Button>
            )}
        </Box>
      </Box>
    </Box>
  );
}
