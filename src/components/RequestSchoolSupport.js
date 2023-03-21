import { useColorMode } from '@codeday/topo/Theme';
import { Box, Grid, Heading, Link, List, ListItem, Text, TextInput, Button, Image, Divider } from '@codeday/topo/Atom';
import { useReducer, useState } from 'react';
import { apiFetch, useToasts } from '@codeday/topo/utils';
import UiTrash from '@codeday/topocons/Icon/UiTrash';
import UiAdd from '@codeday/topocons/Icon/UiAdd';
import { RequestSchoolSupportMutation } from './RequestSchoolSupport.gql';
import { Trans, useTranslation } from 'react-i18next';

export default function RequestSchoolSupport({ event }) {
  const { t } = useTranslation('Schools');
  const { colorMode } = useColorMode();
  const { success, error } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNames, updateStudentNames] = useReducer(
    (_prev, [action, item, edit]) => {
      if (action === 'add') return [..._prev, item];
      if (action === 'remove') {
        return _prev.filter((_, i) => i !== item);
      }
      if (action === 'edit') {
        return _prev.map((e, i) => i === item ? edit : e);
      }
      return _prev;
    },
    [''],
  );

  if (isComplete) {
    return (
      <Box
        borderWidth={2}
        borderColor={colorMode === 'light' ? 'red.600' : 'red.900'}
        borderRadius="sm"
        p={0}
      >
        <Box p={{ base: 4, lg: 8 }}>
          <Heading fontSize="xl" mb={4}>{t('assistance.apply.submitted')}</Heading>
          <Text mb={2}>{t('assistance.apply.whats-next')}</Text>
          <List styleType="disc" ml={8} mb={4}>
            <ListItem>{t('assistance.apply.validate')}</ListItem>
            <ListItem>{t('assistance.apply.promo-code')}</ListItem>
            <ListItem>{t('assistance.apply.double-check')}</ListItem>
          </List>
          <Text>
            <Trans
              ns="Schools"
              i18nKey="assistance.apply.questions"
              components={{ click: <Link href="mailto:schools@codeday.org" /> }}
            />
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      borderWidth={2}
      borderColor={colorMode === 'light' ? 'green.600' : 'green.900'}
      borderRadius="sm"
      p={0}
    >
      <Box p={4} bg={colorMode === 'light' ? 'green.600' : 'green.900'} color="white">
        <Heading fontSize="2xl">{t('assistance.heading')}</Heading>
        <Text fontSize="lg">{t('assistance.intro')}</Text>
      </Box>
      <Box p={{ base: 4, lg: 8 }}>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mb={8}>
          <Box>
            <Image
              rounded="sm"
              src="https://f2.codeday.org/d5pti1xheuyu/4fnnCZrwApYQtOlQOg8n1w/aaa5e7c97d38f5505b3dd42de48f1044/team-pic-2.jpg?w=400&h=250&fit=fill"
              alt="Students in front of CodeDay background"
              w="100%"
            />
            <Text>{t('assistance.ticket')}</Text>
          </Box>
          <Box>
            <Image
              rounded="sm"
              src="https://f2.codeday.org/d5pti1xheuyu/4Wr9SADywTU0mIcYWXiXR6/d75952c0dcb8d4569a5174057332bd84/20230315_155532.jpg?w=400&h=250&fit=fill"
              alt="Piles of laptops with the CodeDay logo open on one"
              w="100%"
            />
            <Text>{t('assistance.laptop')}</Text>
          </Box>
          <Box>
            <Image
              rounded="sm"
              src="https://f2.codeday.org/d5pti1xheuyu/2x9W9aeIHlWe6siecflAKn/b28c3c82e3a2f26fcabd7ad612bf2484/dan-gold-kARZuSYMfrA-unsplash.jpg?w=400&h=250&fit=fill"
              alt="View from the back of a rideshare"
              w="100%"
            />
            <Text>{t('assistance.ride')}</Text>
          </Box>
        </Grid>
        <Text>{t('assistance.action')}</Text>
        <Divider mt={8} mb={8} />
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('assistance.apply.name')}</Text>
            <TextInput
              w="100%"
              value={name}
              placeholder={t('assistance.apply.name-placeholder')}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>{t('assistance.apply.school-name')}</Text>
            <TextInput
              w="100%"
              value={schoolName}
              placeholder={t('assistance.apply.school-name-placeholder')}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </Box>
        </Grid>
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="bold" mb={0}>{t('assistance.apply.email')}</Text>
          <TextInput
            w="100%"
            placeholder={t('assistance.apply.email-placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text fontSize="sm" mb={4}>{t('assistance.apply.no-student')}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="bold" mb={0}>{t('assistance.apply.student-names')}</Text>
          {studentNames.map((cn, i) => (
            <Grid templateColumns="minmax(0, 100%) 1fr" gap={2} mb={2} maxW={96}>
              <TextInput
                w="100%"
                value={cn}
                placeholder={t('assistance.apply.student-name-placeholder')}
                onChange={(e) => updateStudentNames(['edit', i, e.target.value])}
              />
              <Button variant="ghost" colorScheme="red" size="md" onClick={() => updateStudentNames(['remove', i])}>
                <Text>
                  <UiTrash />
                </Text>
              </Button>
            </Grid>
          ))}
          <Box>
            <Button variant="outline" size="sm" colorScheme="green" onClick={() => updateStudentNames(['add', ''])}><UiAdd />&nbsp;Student</Button>
          </Box>
        </Box>

        <Box textAlign="center" mt={8}>
          <Button
            size="lg"
            colorScheme="green"
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              try {
                await apiFetch(
                  RequestSchoolSupportMutation,
                  {
                    eventId: event.id,
                    subject: `[School Assistance] ${schoolName}`,
                    replyTo: email,
                    body:
                      `New school assistance request:\n\n`
                      + `------\n`
                      + `School Name: ${schoolName}\n`
                      + `Teacher: ${name} <${email}>\n`
                      + `Students:\n`
                      + studentNames.filter(Boolean).map((s) => `  - ${s}`).join(`\n`),
                  }
                );
                setIsComplete(true);
                success(t('assistance.apply.submitted'));
              } catch (ex) {
                console.error(ex);
                error(t('assistance.apply.error'));
              }
              setIsLoading(false);
            }}
            disabled={!(email && name && schoolName && studentNames.filter(Boolean).length > 0)}
          >
            {t('assistance.apply.submit')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}