import { Heading } from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import ApplyForWorkshop from '../../components/ApplyForWorkshop';
import Page from '../../components/Page';
import { WorkshopStaticPathsQuery, WorkshopStaticPropsQuery } from './workshop.gql';

export default function Workshop({ event, webname }) {
  if (!event) {
    return (
      <Page slug={`/${webname}`}>
        <Content>
          <Heading as="h2" fontSize="5xl" textAlign="center">Sorry, we couldn&apos;t find that CodeDay.</Heading>
        </Content>
      </Page>
    );
  }

  return (
    <Page slug={`/${webname}`} event={event} title="Submit Workshop">
      <Content>
        <Heading as="h2" fontSize="3xl" textAlign="center">CodeDay {event.name} Workshop Submission</Heading>
        <ApplyForWorkshop alwaysOpen event={event} />
      </Content>
    </Page>
  );
}

export async function getStaticPaths() {
  const allRegions = await apiFetch(print(WorkshopStaticPathsQuery));
  const allWebnames = allRegions?.cms?.regions?.items
    .reduce((accum, r) => [...accum, r.webname, ...(r.aliases || [])], []) || [];

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { webname } }) {
  const result = await apiFetch(print(WorkshopStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
  });
  return {
    props: {
      event: result?.clear?.findFirstEvent || null,
    },
    revalidate: 60,
  };
}
