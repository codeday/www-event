import { Content } from '@codeday/topo/Molecule';
import {
  Heading, Link, Text, Grid,
} from '@codeday/topo/Atom';
import { apiFetch } from '@codeday/topo/utils';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../components/Page';
import { UpcomingPageQuery } from './upcoming.gql';

const mapClearEvent = (e) => { e.webname = e.contentfulWebname; return e; };

function EventListItem({ event }) {
  return (
    <Link href={`/${event.webname}`} target="_blank" textDecor="none">
      <Text textDecor="underline">{event.name}</Text>
      {event.displayDate && <Text fontSize="sm" color="current.textLight">{event.displayDate}</Text>}
    </Link>
  );
}

export default function UpcomingPage({ query }) {
  const { t } = useTranslation('Upcoming');
  const open = query.clear.open.map(mapClearEvent);
  const closed = query.clear.closed.map(mapClearEvent);
  const allClearWebnames = [...open, ...closed].map((e) => e.webname);

  const notScheduled = query.cms.regions.items.filter((e) => !allClearWebnames.includes(e.webname));

  const gridSize = { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' };

  return (
    <Page title={t('title')}>
      <Content maxWidth="container.lg" mt={-8}>
        {open.length > 0 && (
          <>
            <Heading as="h2" mt={12}>{t('accepting-registrations')}</Heading>
            <Text mb={4}>{t('accepting-registrations-details')}</Text>
            <Grid templateColumns={gridSize} gap={4}>
              {open.map((e) => <EventListItem event={e} key={e.webname} />)}
            </Grid>
          </>
        )}

        {closed.length > 0 && (
          <>
            <Heading as="h2" mt={12}>{t('searching-venue')}</Heading>
            <Text mb={4}>
              <Trans ns="Upcoming" i18nKey="searching-venue-details" components={{ click: <Link href="mailto:team@codeday.org" /> }} />
            </Text>
            <Grid templateColumns={gridSize} gap={4}>
              {closed.map((e) => <EventListItem event={e} key={e.webname} />)}
            </Grid>
          </>
        )}
        <Heading as="h2" mt={12}>{t('searching-volunteers')}</Heading>
        <Text mb={4}>
          <Trans ns="Upcoming" i18nKey="searching-volunteers-details" components={{ click: <Link href="/organize" /> }} />
        </Text>
        <Grid templateColumns={gridSize} gap={4}>
          {notScheduled.map((e) => <EventListItem event={e} key={e.webname} />)}
        </Grid>
      </Content>
    </Page>
  );
}

const getDate = (offsetHours) => {
  const d = new Date();
  d.setUTCHours(d.getUTCHours() - 7 + (offsetHours || 0));
  return d.toISOString();
};

export async function getStaticProps({ locale }) {
  const query = await apiFetch(UpcomingPageQuery, { clearDate: getDate(), locale: locale && locale !== '_default' ? locale : 'en-US' });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US', ['Upcoming', 'common'])),
      query,
      random: Math.random(),
    },
    revalidate: 500,
  };
}
