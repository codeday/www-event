import {
  Text, Box, Button, Divider,
} from '@codeday/topo/Atom';
import { CognitoForm, DataCollection } from '@codeday/topo/Molecule';
import { MailingListSubscribe } from '@codeday/topo/Organism';
import { useTranslation } from 'next-i18next';
import { DateTime } from 'luxon';
import EventRestrictions from './EventRestrictions';
import EventMailingListSubscribe from './EventMailingListSubscribe';
import RegisterForm from './RegisterForm';

export default function RegisterBox({ event, region, webname }) {
  const { t } = useTranslation('EventHome');
  let form = <></>;
  if (event?.customForm) form = <CognitoForm formId={event.customForm} />;
  else if (event?.customRegistrationExternalUrl) {
    form = (
      <Box textAlign="center" p={4}>
        <Text>
          {event.customRegistrationExternalName ? t('registration-by', { name: event.customRegistrationExternalName }) : t('registration-third-party')}
        </Text>
        <Button as="a" href={event.customRegistrationExternalUrl} target="_blank">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {event.customRegistrationExternalName ? t('register-at', { name: event.customRegistrationExternalName }) : t('register-here')} &raquo;
        </Button>
      </Box>
    );
  } else if (event?.canRegister) form = <RegisterForm event={event} />;
  else if (event?.registrationCutoff && DateTime.fromISO(event.registrationCutoff).diffNow() < 0) {
    form = (
      <Box textAlign="center" mt={4}>
        <Text bold textAlign="center">{t('registration-too-late', { region: event?.name || region.name })}</Text>
        <Text color="current.textLight">{t('registration-too-late-cta', { region: event?.name || region.name })}</Text>
        <Box mt={4} w="md" display="inline-block">
          <MailingListSubscribe
            mb={4}
            emailList="00a7c4d8-aadf-11ec-9258-0241b9615763"
            fields={{ field_3: webname }}
            colorScheme="gray"
          />
          <DataCollection message="pii" />
        </Box>
      </Box>

    );
  } else if (event) {
    form = (
      <EventMailingListSubscribe event={event}>
        <Text bold textAlign="center">{t('registrations-closed', { region: event?.name || region.name })}</Text>
        <Text mb={4} textAlign="center">{t('registrations-closed-cta')}</Text>
      </EventMailingListSubscribe>
    );
  } else {
    form = (
      <>
        <Box textAlign="center" mt={4}>
          <Text mb={1} fontSize="lg" bold>{t('no-event-header', { region: event?.name || region.name })}</Text>
          <Text mb={8}>{t('no-event-subheader', { region: event?.name || region.name })}</Text>
          <Button as="a" href="/organize" colorScheme="green">{t('organize-button')}</Button>
          <Text mt={1} color="current.textLight">{t('organize-experience')}</Text>
          <Divider mt={8} mb={8} />
          <Text color="current.textLight">{t('no-event-subscribe', { region: event?.name || region.name })}</Text>
          <Box mt={4} w="md" display="inline-block">
            <MailingListSubscribe
              mb={4}
              emailList="00a7c4d8-aadf-11ec-9258-0241b9615763"
              fields={{ field_3: webname }}
              colorScheme="gray"
            />
            <DataCollection message="pii" />
          </Box>
        </Box>
      </>
    );
  }
  return (
    <>
      {form}
      {event && (
      <EventRestrictions
        restrictions={[...(event?.cmsEventRestrictions || []), ...(event?.region?.localizationConfig?.requiredEventRestrictions?.items || [])]}
      />
      )}
    </>
  );
}
