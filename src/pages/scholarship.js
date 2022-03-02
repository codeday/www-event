import React from 'react';
import { CognitoForm, Content } from '@codeday/topo/Molecule';
import { useAnalytics } from '@codeday/topo/utils';
import Page from '../components/Page';

export default function Scholarship() {
  const analytics = useAnalytics();
  analytics.goal('MRELY0XP', 0)
  return (
    <Page darkHeader={false}>
      <Content>
        <CognitoForm formId={101} onSubmit={() => {analytics.goal('W0DRQBHA', 0)}} />
      </Content>
    </Page>
  );
}
