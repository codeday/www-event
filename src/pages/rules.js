import React from 'react';
import { Heading, Link, Text } from '@codeday/topo/Atom';
import { Content, GithubAuthors } from '@codeday/topo/Molecule';
import { Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../components/Page';

export default function Rules() {
  return (
    <Page darkHeader={false} title="Rules">
      <Content mb={6} mt={-12}>
        <GithubAuthors repository="www-event" path="src/pages/rules.js" />
      </Content>
      <Content maxW="container.md">
        <Trans
          ns="Rules"
          i18nKey="rules"
          components={{
            h2: <Heading mb={6} as="h2" fontSize="4xl" />,
            h3: <Heading mt={6} mb={2} as="h3" fontSize="2xl" />,
            p: <Text mb={2} />,
            inset: <Text mb={2} ml={6} />,
            conductLink: <Link href="https://www.codeday.org/conduct" />,
          }}
        />
      </Content>
    </Page>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['Rules', 'common'])),
    },
  };
}
