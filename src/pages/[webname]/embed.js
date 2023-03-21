import React, { useCallback, useEffect, useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { useRouter } from 'next/router';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import { Box, Heading, Text } from '@codeday/topo/Atom';
import { useColorMode } from '@codeday/topo/Theme';
import { apiFetch } from '@codeday/topo/utils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IndexStaticPathsQuery, IndexStaticPropsQuery } from './index.gql';
import RegisterBox from '../../components/RegisterBox';

export default function EventHome({
  webname, region, event
}) {
  // Redirect the user to the canonical URL
  const router = useRouter();
  const ref = useRef();
  const { colorMode } = useColorMode();
  const { t } = useTranslation('EventHome');

  const sendCurrentSize = useCallback(
    (s) => { if (typeof window !== 'undefined') window.top?.postMessage(JSON.stringify({ type: 'embedResize', height: s }), '*'); },
    [ref, typeof window]
  );
  const messageHandler = useCallback(
    (e) => { if (e.data === 'poll') return sendCurrentSize(ref.current.getBoundingClientRect().height); },
    [sendCurrentSize]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('message', messageHandler);
    messageHandler({ data: 'poll' });
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [typeof window]);
  useResizeObserver(ref, (e) => sendCurrentSize(e.contentRect.height));

  if (!region) return <Heading as="h2" fontSize="5xl" textAlign="center">{t('common:error.message.no-event')}</Heading>;

  return (
    <Box ref={ref}>
      <Box
        borderWidth={2}
        borderColor={colorMode === 'light' ? 'red.600' : 'red.900'}
        borderRadius="sm"
        p={0}
      >
        <Box p={4} bg={colorMode === 'light' ? 'red.600' : 'red.900'} color="white">
          <Heading fontSize="2xl">{t('register-header')}</Heading>
          <Text fontWeight="bold">{t('register-subheader')}</Text>
        </Box>
        <Box p={{ base: 4, lg: 8 }}>
          <RegisterBox event={event} region={region} webname={webname} />
        </Box>
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  const allWebnamesQuery = await apiFetch(print(IndexStaticPathsQuery), { endDate: DateTime.now().minus({ days: 1 }) });
  const allWebnames = allWebnamesQuery?.clear?.events.map((e) => e.contentfulWebname).filter(Boolean);

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ locale, params: { webname } }) {
  const result = await apiFetch(print(IndexStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
    cmsEndDate: DateTime.now().minus({ days: 1 }),
    locale: locale && locale !== '_default' ? locale : 'en-US',
  });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US', ['EventHome', 'Register', 'Scholarship', 'common'])),
      webname,
      region: result?.cms?.regions?.items[0] || null,
      event: result?.clear?.findFirstEvent || null,
      locale,
      localizationConfig: result?.cms?.regions?.items[0]?.localizationConfig?.sys?.id || null,
    },
    revalidate: 60,
  };
}
