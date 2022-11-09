import React from 'react';
import { CognitoForm, Content, GithubAuthors } from '@codeday/topo/Molecule';
import { useAnalytics } from '@codeday/topo/utils';
import Page from '../components/Page';
import { Text, Link } from '@codeday/topo/Atom';

export default function Scholarship() {
  return (
    <Page darkHeader={false}>
      <Content>
        <Text>
          You can request a scholarship directly from the page of any event which is accepting registrations.
          Just click &ldquo;Can't afford it?&rdquo; above the payment box.
        </Text>
        <Text>
          Need a laptop or help with transportation? <Link href="mailto:team@codeday.org">Contact us!</Link>
        </Text>
      </Content>
    </Page>
  );
}
