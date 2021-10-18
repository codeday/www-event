import React from 'react';
import Page from '../components/Page';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Content from '@codeday/topo/Molecule/Content';

export default function Scholarship() {
  return (
    <Page>
      <Content>
        <CognitoForm formId={101} />
      </Content>
    </Page>
  );
}
