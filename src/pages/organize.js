import {
  Box, Grid, Button, Heading, Text, List, ListItem, Image,
} from '@codeday/topo/Atom';
import { CognitoForm, Content, GithubAuthors } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import { useColorMode } from '@chakra-ui/react';
import { OrganizePageQuery } from './organize.gql';
import OrganizerTestimonials from '../components/Organize/OrganizerTestimonials';
import PullQuote from '../components/Organize/PullQuote';
import Highlight from '../components/Organize/Highlight';
import Page from '../components/Page';
import PastProjects from '../components/PastProjects';

export default function Organize({ query, random }) {
  const { colorMode } = useColorMode();
  const bgLight = colorMode === 'dark' ? 'gray.800' : 'gray.100';

  const clearfix = { __css: { clear: 'both' } };

  return (
    <Page title="Organize" darkHeader={false}>
      <Content mb={6} mt={-12}>
        <GithubAuthors repository="www-event" path="src/pages/organize.js" />
      </Content>
      <Content mb={12}>
        <Text p={4} bgColor={bgLight} fontSize="lg" rounded="sm">
          <Text fontWeight="bold" d="inline">CODEDAY PERKS THIS SEASON: </Text>
          Support your community with $2,000+ in free laptops to give away to low-income students, and free Uber rides
          for attendees from low-income areas.
        </Text>
      </Content>

      <Content fontSize="lg">
        <Heading textAlign="center" mb={6}>
          Teach your community to code <Highlight>without feeling like school.</Highlight>
        </Heading>
        <PullQuote testimonial={query.cms.quoteNothingLikeSchool} float="right" />
        <Text mb={4}>
          When you organize a CodeDay, you'll help hundreds of students in your community learn to code.
          Despite being an educational event, all it takes is one look around to see something you rarely see in a
          classroom: every single student is smiling, engaged, and excited to be learning.
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
        <Button size="lg" w="100%" colorScheme="green" as="a" href="#form">Sign up to organize!</Button>
        <Text color="current.textLight" mt={2}>No experience needed! You'll have our support every step of the way.</Text>
      </Content>

      <Box {...clearfix} />
      <Content mt={24} fontSize="lg">
        <Heading textAlign="center" mb={6}>
          Spotlight <Highlight>creativity</Highlight> to reach people who would never usually go to a coding event.
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
          There are lots of great classes, clubs, hackathons, and other events for people who know want to code. Only
          CodeDay is focused on people who don't like coding, don't want to learn, and don't go to coding events.
        </Text>
        <Text mb={2}>
          As an organizer, you'll draw on our 10+ years of experience to run an event which attracts students
          who are only interested in art, music, voice acting, writing, and other creative pursuits. And then you'll
          show them how fun and creative coding really is!
        </Text>
        <Text>
          Each time you organize a CodeDay event, you'll help create dozens or even hundreds of totally new programmers
          &mdash; people who would never have learned to code if not for you.
        </Text>
      </Content>

      <Box {...clearfix} />
      <Content mt={24} p={6} rounded="sm" textAlign="center" maxW="container.lg" bgColor={bgLight}>
        <Heading fontSize="3xl">Why organize CodeDay?</Heading>
        <Text mb={6} fontSize="sm">(Click to read more.)</Text>
        <OrganizerTestimonials query={query} random={random} />
      </Content>

      <Box {...clearfix} />
      <Content mt={24} fontSize="lg">
        <Heading textAlign="center" mb={6}>
          An <Highlight>intersectional event</Highlight> which brings people together no matter their background.
        </Heading>
        <PullQuote testimonial={query.cms.quoteCreative} float="right" />
        <Text mb={2}>
          68% of CodeDay attendees are from a group traditionally underrepresented in tech. This isn't by accident,
          we've perfected the most effective model for promoting and supporting diverse students! As an organizer,
          you'll get:
        </Text>
        <List mb={4} ml={4} styleType="disc">
          <ListItem>Guide + weekly coaching based on 10+ years of experiments.</ListItem>
          <ListItem>Laptops to give to low-income students. TO KEEP!</ListItem>
          <ListItem>Free Uber rides for low-income students to/from CodeDay.</ListItem>
        </List>
        <Text>
          Many events provide these opportunities by limiting participants to a certain group, but CodeDay takes a
          different approach; we prefer to foster positive relationships between attendees no matter their background,
          grounded in a shared excitement for the creative things we can build with technology.
        </Text>
      </Content>

      <Box {...clearfix} />
      <Content mt={24} mb={24} maxW="container.lg">
        <Box borderColor="red.600" borderWidth={3} rounded="sm">
          <Box color="white" bg="red.600" p={2} pl={4} pr={4}>
            <Heading fontSize="2xl">Organize a CodeDay</Heading><a name="form" />
            <Text>(This isn't a final commitment, it's ok if you change your mind.)</Text>
            <Text>Requirements: In at least high school and able to commit 3-5hr/wk. No experience needed, we'll help you.</Text>
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

export async function getStaticProps() {
  const query = await apiFetch(OrganizePageQuery);
  return {
    props: {
      query,
      random: Math.random(),
    },
    revalidate: 500,
  };
}
