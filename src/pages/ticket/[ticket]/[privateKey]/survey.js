import { Content } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../../../../components/Page';
import { RetrieveSurveyResponses } from './survey.gql';
import PostRegistrationSurvey from '../../../../components/PostRegistrationSurvey';

export default function SurveyPage({ ticket }) {
  return (
    <Page>
      <Content>
        <PostRegistrationSurvey
          ticket={ticket}
          inlineWithMultipleTickets={false}
        />
      </Content>
    </Page>
  );
}

export async function getServerSideProps({ locale, params: { ticket, privateKey } }) {
  const result = await apiFetch(RetrieveSurveyResponses, { ticket, privateKey });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US', ['Survey', 'common'])),
      random: Math.random(),
      ticket: result.clear.retrieveTicketInfo,
      locale,
    },
  };
}
