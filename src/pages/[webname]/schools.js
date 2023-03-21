import { Heading, Button, Box } from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../../components/Page';
import RequestSchoolSupport from '../../components/RequestSchoolSupport';
import { SchoolsStaticPropsQuery } from './schools.gql';

export default function Schools({ event, webname, locale }) {
  const { t } = useTranslation('Schools');
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
    <Page slug={`/${webname}`} event={event} title={t('title', { event: event?.name })}>
      <Content>
        <Heading as="h2" fontSize="3xl" textAlign="center" mb={2}>{t('title', { event: event?.name })}</Heading>
        <Box textAlign="center" mb={8}>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <Button mr={2} as="a" href={`/${locale}/${webname}`}>&laquo; {t('back')}</Button>
          <Button mr={2} as="a" href={`/${locale}/${webname}#register`}>{t('register')}</Button>
        </Box>
        <RequestSchoolSupport event={event} />
      </Content>
    </Page>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { webname }, locale }) {
  const result = await apiFetch(print(SchoolsStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
    locale: locale ?? 'en-US',
  });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US', ['common', 'Schools'])),
      event: result?.clear?.findFirstEvent || null,
      locale: locale ?? 'en-US',
      webname,
    },
    revalidate: 60,
  };
}
