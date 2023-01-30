import { Heading } from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ApplyForWorkshop from '../../components/ApplyForWorkshop';
import Page from '../../components/Page';
import { WorkshopStaticPathsQuery, WorkshopStaticPropsQuery } from './workshop.gql';

export default function Workshop({ event, webname }) {
  const { t } = useTranslation();
  if (!event) {
    return (
      <Page slug={`/${webname}`}>
        <Content>
          <Heading as="h2" fontSize="5xl" textAlign="center">{t('error.message.no-event')}</Heading>
        </Content>
      </Page>
    );
  }

  return (
    <Page slug={`/${webname}`} event={event} title={t('workshop-apply.title', { region: event.name })}>
      <Content>
        <Heading as="h2" fontSize="3xl" textAlign="center">{t('workshop-apply.title', { region: event.name })}</Heading>
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

export async function getStaticProps({ params: { webname }, locale }) {
  const result = await apiFetch(print(WorkshopStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
  });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      event: result?.clear?.findFirstEvent || null,
    },
    revalidate: 60,
  };
}
