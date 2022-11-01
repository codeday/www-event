import React, { useEffect } from 'react';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import { apiFetch } from '@codeday/topo/utils';
import Page from '../../components/Page';
import { MapStaticPathsQuery, MapStaticPropsQuery } from './map.gql';

export default function EventHome({ event, webname }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.location = event?.venue?.mapLink || `/${webname}`;
  }, [typeof window, event]);
  return <Page />;
}

export async function getStaticPaths() {
  const allRegions = await apiFetch(print(MapStaticPathsQuery));
  const allWebnames = allRegions?.cms?.regions?.items
    .reduce((accum, r) => [...accum, r.webname, ...(r.aliases || [])], []) || [];

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { webname } }) {
  const result = await apiFetch(print(MapStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
  });
  return {
    props: {
      webname,
      event: result?.clear?.findFirstEvent || null,
    },
    revalidate: 60,
  };
}
