import {
  useCallback, useMemo, useReducer, useRef,
} from 'react';
import { apiFetch } from '@codeday/topo/utils';
import shuffle from 'knuth-shuffle-seeded';
import {
  Box, Button, Divider, Heading, Text,
} from '@codeday/topo/Atom';
import { TrackSurveyResponse } from './index.gql';
import BasicDemographics from './BasicDemographics';
import Study from './Study';

export default function PostRegistrationSurvey({
  ticket, inlineWithMultipleTickets, promoMetadata, ...props
}) {
  // Figure out which questions to ask. We will ask less questions when the user has just finished registering multiple people.
  let pages = [BasicDemographics];
  if (!inlineWithMultipleTickets) {
    const shuffledStudy = shuffle(Study, ticket.id);
    pages[0].push(...shuffledStudy.slice(0, 3));
    pages.push(shuffledStudy.slice(3));
  }
  pages = pages.filter((el) => el.length !== 0);

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

  // Sends the response to Clear
  const pendingRequests = useRef({});
  const sendResponse = useCallback((key, value) => {
    if (key in pendingRequests.current) clearTimeout(pendingRequests.current[key]);
    pendingRequests.current[key] = setTimeout(() => {
      apiFetch(TrackSurveyResponse, {
        ticket: ticket.id, privateKey: ticket.privateKey, key, value,
      });
    }, 500);
  }, [ticket]);

  // Updates the response
  const [responses, setResponse] = useReducer((_prev, [key, value]) => {
    sendResponse(key, value);
    return { ..._prev, [key]: value };
  }, ticket.surveyResponses || {});

  const currentPageComplete = pages[pageNumber].filter((q) => !(q.key in responses)).length === 0;

  return (
    <Box borderColor="gray.700" borderWidth={2} {...props}>
      <Box p={4} bg="gray.700" color="white">
        <Heading fontSize="xl">Post-Registration Information for {ticket.firstName} {ticket.lastName}</Heading>
        <Text fontSize="sm">Your responses are automatically saved.</Text>
      </Box>
      <Box p={4}>
        {pages[pageNumber].filter((q) => q?.type && q?.key).map((q) => (
          <Box key={q.key} mb={8}>
            <Heading fontSize="md" mb={2}>
              {typeof q.title === 'function' ? q.title(ticket.firstName) : q.title}
            </Heading>
            <q.type
              {...q.props}
              key={q.key}
              value={responses[q.key] || ''}
              onSubmit={(val) => setResponse([q.key, val])}
            />
          </Box>
        ))}
        <Divider mb={4} mt={4} />
        <Box textAlign="center">
          {(pages.length - 1) === pageNumber
            ? <Text fontSize="sm">This is the last page. Your responses are automatically saved.</Text>
            : (
              <Button
                colorScheme="green"
                disabled={!currentPageComplete}
                onClick={() => currentPageComplete && nextPage()}
              >
                Next Page
              </Button>
            )}
        </Box>
      </Box>
    </Box>
  );
}
