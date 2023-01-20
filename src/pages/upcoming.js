import { DateTime } from 'luxon';
import { Content } from '@codeday/topo/Molecule';
import {
  Heading, Link, Text, Grid,
} from '@codeday/topo/Atom';
import { apiFetch } from '@codeday/topo/utils';
import Page from '../components/Page';
import { UpcomingPageQuery } from './upcoming.gql';

const mapClearEvent = (e) => { e.webname = e.contentfulWebname; return e; };

function EventListItem({ event }) {
  const dateStr = event.startDate && DateTime.fromISO(event.startDate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  return (
    <Link as="a" href={`/${event.webname}`} target="_blank">{event.name}{dateStr ? ` (${dateStr})` : ''}</Link>
  );
}

export default function UpcomingPage({ query }) {
  const open = query.clear.open.map(mapClearEvent);
  const closed = query.clear.closed.map(mapClearEvent);
  const allClearWebnames = [...open, ...closed].map((e) => e.webname);

  const notScheduled = query.cms.regions.items.filter((e) => !allClearWebnames.includes(e.webname));

  const gridSize = { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' };

  return (
    <Page>
      <Content maxWidth="container.lg" mt={-8}>
        {open.length > 0 && (
          <>
            <Heading as="h2" mt={8}>Events Accepting Registrations</Heading>
            <Grid templateColumns={gridSize} gap={4}>
              {open.map((e) => <EventListItem event={e} key={e.webname} />)}
            </Grid>
          </>
        )}

        {closed.length > 0 && (
          <>
            <Heading as="h2" mt={8}>Planned</Heading>
            <Text>Typically registrations open 3-4 weeks before the event date.</Text>
            <Text mb={8}>(We are still looking for a venue for most of these events. <Link href="mailto:team@codeday.org">Can you help?</Link>)</Text>
            <Grid templateColumns={gridSize} gap={4}>
              {closed.map((e) => <EventListItem event={e} key={e.webname} />)}
            </Grid>
          </>
        )}
        <Heading as="h2" mt={8}>Regions Without Current Events</Heading>
        <Text mb={8}>We&apos;re <Link href="/organize">looking for volunteers to help organize these events.</Link></Text>
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

export async function getStaticProps() {
  const query = await apiFetch(UpcomingPageQuery, { clearDate: getDate() });
  return {
    props: {
      query,
      random: Math.random(),
    },
    revalidate: 500,
  };
}
