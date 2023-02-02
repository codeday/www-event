import {
  Box, Grid, Button, Heading, Text, List, ListItem, Image, Link,
} from '@codeday/topo/Atom';
import { CognitoForm, Content, GithubAuthors } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import { useColorMode } from '@chakra-ui/react';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { OrganizePageQuery } from './organize.gql';
import OrganizerTestimonials from '../components/Organize/OrganizerTestimonials';
import PullQuote from '../components/Organize/PullQuote';
import Highlight from '../components/Organize/Highlight';
import Page from '../components/Page';
import PastProjects from '../components/PastProjects';

export default function Organize({ query, random }) {
  const { colorMode } = useColorMode();
  const { t } = useTranslation('Organize');
  const bgLight = colorMode === 'dark' ? 'gray.800' : 'gray.100';
  const clearfix = { __css: { clear: 'both' } };

  return (
    <Page title="Organize" darkHeader={false}>
      <Content mb={4} mt={-12}>
        <GithubAuthors repository="www-event" path="src/pages/organize.js" />
      </Content>
      <Content mb={12}>
        <Text p={4} bgColor={bgLight} fontSize="lg" rounded="sm">
          <Text fontWeight="bold" d="inline">{t('perks.heading')}</Text>&nbsp;
          {t('perks.body')}
        </Text>
      </Content>

      <Content fontSize="lg">
        <Heading textAlign="center" mb={6}>
          <Trans ns="Organize" i18nKey="community.heading" components={{ highlight: <Highlight /> }} />
        </Heading>
        <PullQuote testimonial={query.cms.quoteNothingLikeSchool} float="right" />
        <Text mb={4}>
          {t('community.why')}
        </Text>
        <Grid templateColumns="1fr 1fr" gap={2}>
          <Image
            src="https://f2.codeday.org/d5pti1xheuyu/06nNUk3Q3g9LEPPBuqAdD/99730a501a418c97384133244a0fee47/Planning.jpg?w=300&h=175&fit=fill"
            alt=""
          />
          <Image
            src="https://f2.codeday.org/d5pti1xheuyu/3TpV6gLmellwyOwgZYNqya/f7cb0e71c841dd79a44564e7ee4d3973/DSCF0166.JPG?w=300&h=175&fit=fill"
            alt=""
          />
        </Grid>
      </Content>

      <Content mt={24} maxW="container.sm" textAlign="center">
        <Button size="lg" w="100%" colorScheme="green" as="a" href="#form">{t('form.submit-button')}</Button>
        <Text color="current.textLight" mt={2}>{t('form.no-experience-required')}</Text>
      </Content>

      <Box {...clearfix} />
      <Content mt={24} fontSize="lg">
        <Heading textAlign="center" mb={6}>
          <Trans ns="Organize" i18nKey="creativity.heading" components={{ highlight: <Highlight /> }} />
        </Heading>
        <Box
          float={{ base: 'none', lg: 'left' }}
          w={{ base: '100%', md: 80 }}
          pr={{ base: 0, lg: 8 }}
          pb={{ base: 8, lg: null }}
        >
          <PastProjects projects={query.showcase.projects} random={random} />
        </Box>
        <Text mb={2}>
          {t('creativity.why.1')}
        </Text>
        <Text mb={2}>
          {t('creativity.why.2')}
        </Text>
        <Text>
          {t('creativity.why.3')}
        </Text>
      </Content>

      <Box {...clearfix} />
      <Content mt={24} p={6} rounded="sm" textAlign="center" maxW="container.md" bgColor={bgLight}>
        <Heading fontSize="3xl">{t('why-organize')}</Heading>
        <Text mb={6} fontSize="sm">
          <Trans ns="Organize" i18nKey="read-testimonials" components={{ click: <Link href="https://blog.codeday.org/tag/codeday-organizer-testimonial" /> }} />
        </Text>
        <OrganizerTestimonials query={query} random={random} />
      </Content>

      <Box {...clearfix} />
      <Content mt={24} fontSize="lg">
        <Heading textAlign="center" mb={6}>
          <Trans ns="Organize" i18nKey="intersectional.heading" components={{ highlight: <Highlight /> }} />
        </Heading>
        <PullQuote testimonial={query.cms.quoteCreative} float="right" />
        <Text mb={2}>
          {t('intersectional.why.1')}
        </Text>
        <List mb={4} ml={4} styleType="disc">
          {/* I don't really like this hack, but I cant find a better way to do it.
           * as long as the translation doesn't contain <li> it will be fine */}
          {t('intersectional.why.2', { returnObjects: true, joinArrays: '<li>' }).split('<li>').map((item, idx) => <ListItem key={idx}>{item}</ListItem>)}
        </List>
        <Text>
          {t('intersectional.why.3')}
        </Text>
      </Content>

      <Box {...clearfix} />
      <Content mt={24} mb={24} maxW="container.lg">
        <Box borderColor="red.600" borderWidth={3} rounded="sm">
          <Box color="white" bg="red.600" p={2} pl={4} pr={4}>
            <Heading fontSize="2xl">{t('form.header')}</Heading><a name="form" />
            <Text>{t('form.requirements')}</Text>
          </Box>
          <Box p={4}>
            <CognitoForm
              formId={98}
              prefill={{
                Backgrounds: ['other'],
                Roles: ['general volunteer'],
                Programs: ['codeday'],
                Referrer: 'organize',
              }}
              showFallback={false}
            />
          </Box>
        </Box>
      </Content>
    </Page>
  );
}

export async function getStaticProps({ locale }) {
  const query = await apiFetch(OrganizePageQuery, { locale: locale && locale !== '_default' ? locale : 'en-US' });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US', ['Organize', 'common'])),
      query,
      random: Math.random(),
    },
    revalidate: 500,
  };
}
