import { Trans, useTranslation } from 'next-i18next';
import { useState } from 'react';
import {
  Box,
  Heading,
  TextInput,
  FormLabel,
  Textarea,
  Select,
  Grid,
  Link,
  Text,
  Button,
} from '@codeday/topo/Atom';
import { useColorMode } from '@chakra-ui/react';
import { apiFetch, useToasts } from '@codeday/topo/utils';
import { print } from 'graphql';
import { ApplyForWorkshopMutation } from './ApplyForWorkshop.gql';

export default function ApplyForWorkshop({ event, alwaysOpen, ...props }) {
  const { success, error } = useToasts();
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(!!alwaysOpen);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const isReady = firstName && lastName && email && bio && description;
  const bg = colorMode === 'light' ? 'gray.50' : 'gray.900';

  if (!event) return <></>;
  if (!isOpen) return <Box {...props}><Link color="current.textLight" onClick={() => setIsOpen(true)}>{t('workshop-apply.heading')}</Link></Box>;

  return (
    <Box {...props} bg={bg} mt={8} mb={8} p={4} rounded="sm" borderWidth={1}>
      <Heading as="h4" fontSize="2xl" mb={2}>{t('workshop-apply.heading')}</Heading>
      <Text mb={6}>
        <Trans i18nKey="workshop-apply.body" />
      </Text>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
        <Box w="100%">
          <FormLabel mb={0}>{t('workshop-apply.form.first-name')}</FormLabel>
          <TextInput value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t('workshop-apply.form.first-name')} />
        </Box>
        <Box w="100%">
          <FormLabel mb={0}>{t('workshop-apply.form.last-name')}</FormLabel>
          <TextInput value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t('workshop-apply.form.last-name')} />
        </Box>
      </Grid>
      <Box mb={4}>
        <FormLabel mb={0}>{t('workshop-apply.form.email')}</FormLabel>
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('workshop-apply.form.email')} />
      </Box>
      <Box mb={4}>
        <FormLabel mb={0}>{t('workshop-apply.form.role.label')}</FormLabel>
        <Select onChange={(e) => setBio(e.target.value)}>
          <option />
          <option>{t('workshop-apply.form.role.attendee')}</option>
          <option>{t('workshop-apply.form.role.former-attendee')}</option>
          <option>{t('workshop-apply.form.role.company-representative')}</option>
          <option>{t('workshop-apply.form.role.industry-professional')}</option>
          <option>{t('workshop-apply.form.role.parent')}</option>
          <option>{t('workshop-apply.form.role.other')}</option>
        </Select>
      </Box>
      <Box mb={4}>
        <FormLabel mb={0}>{t('workshop-apply.form.topic.question')}</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('workshop-apply.form.topic.placeholder')} />
      </Box>
      <Button
        isLoading={isLoading}
        isDisabled={!isReady}
        onClick={async () => {
          setIsLoading(true);
          try {
            await apiFetch(print(ApplyForWorkshopMutation), {
              eventId: event.id,
              firstName,
              lastName,
              email,
              bio,
              description,
            });
            setDescription('');
            success(t('workshop-apply.form.confirm-alert'));
          } catch (ex) { error(ex.toString()); }
          setIsLoading(false);
        }}
      >
        {isReady ? t('submit') : t('fill-required')}
      </Button>
    </Box>
  );
}
