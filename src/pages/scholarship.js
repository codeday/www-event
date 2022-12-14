import React from 'react';
import { Text, Link } from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../components/Page';

export default function Scholarship() {
  const { t } = useTranslation('Scholarship');
  return (
    <Page darkHeader={false}>
      <Content>
        <Text>{t('details')}</Text>
        <Text>
          <Trans ns="Scholarship" i18nKey="extra-info" components={{ click: <Link href="mailto:team@codeday.org" /> }} />
        </Text>
      </Content>
    </Page>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['Scholarship'])),
    },
  };
}
