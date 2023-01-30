import { Heading, Link, Text } from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { DisappointedFace } from '@codeday/topocons/Emoji/People';
import { useTranslation, Trans } from 'next-i18next';
import React from 'react';
import Page from './Page';

export default function ErrorPage({ details }) {
  const { t } = useTranslation();
  return (
    <Page title="Error">
      <Content>
        <Heading textAlign="center">
          <DisappointedFace height="5em" width="5em" /><br />{t('error.message.default')}
        </Heading>
        <Heading textAlign="center" as="h2">
          <Trans components={{ click: <Link href="mailto:team@codeday.org" /> }} i18nKey="error.contact" />
        </Heading>
        <Text textAlign="center" color="gray.500"> { details }</Text>
      </Content>
    </Page>
  );
}
