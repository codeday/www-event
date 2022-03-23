import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import {
  Box, Button, Heading, Link, Text, Grid,
} from '@codeday/topo/Atom';
import AnnouncementIcon from '@codeday/topocons/Icon/UiInfo';
import { Content, DataCollection, CognitoForm } from '@codeday/topo/Molecule';
import { MailingListSubscribe } from '@codeday/topo/Organism';
import { useColorMode } from '@codeday/topo/Theme';
import { apiFetch } from '@codeday/topo/utils';
import Scroll from 'react-scroll';
import { marked } from 'marked';
import ReactHtmlParser from 'react-html-parser';
import Page from '../../components/Page';
import { IndexStaticPathsQuery, IndexStaticPropsQuery } from './index.gql';
import IndexHeader from '../../components/IndexHeader';
import Explainer from '../../components/Explainer';
import StudentQuotes from '../../components/StudentQuotes';
import EventRestrictions from '../../components/EventRestrictions';
import RegisterForm from '../../components/RegisterForm';
import ThemeNotifier from '../../components/ThemeNotifier';
import Schedule from '../../components/Schedule';
import Sponsors from '../../components/Sponsors';
import Faq from '../../components/Faq';
import EventMailingListSubscribe from '../../components/EventMailingListSubscribe';

export default function EventHome({
  webname, region, images, quotes, event, cmsEvent, globalSponsors, faqs,
}) {
  // Redirect the user to the canonical URL
  const router = useRouter();
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (typeof window === 'undefined' || !region) return;
    if (webname !== region.webname) {
      router.replace(`/${region.webname}`);
    }
  }, [typeof window, webname, region]);

  // Show a 404 if the region doesn't exist
  if (!region) {
    return (
      <Page slug={`/${webname}`}>
        <Content>
          <Heading as="h2" fontSize="5xl" textAlign="center">Sorry, we couldn&apos;t find that CodeDay.</Heading>
        </Content>
      </Page>
    );
  }

  if (!event) {
    return (
      <Page darkHeader slug={`/${webname}`} region={region}>
        <IndexHeader mt={-40} pt={32} pb={16} mb={16} heading={`CodeDay ${region.name}`} images={images} />
        <Content maxWidth="container.xl">
          <Explainer />
          <br />
          <StudentQuotes quotes={quotes} />
          <br />
          <Box textAlign="center">
            <Heading>😢 We don&apos;t have an upcoming CodeDay planned in {region.name} right now.</Heading>
          </Box>
          <Box m={4} textAlign="center">
            <Text>Be notified about the next CodeDay {region.name}:</Text>
            <Box w="md" d="inline-block">
              <MailingListSubscribe emailList="00a7c4d8-aadf-11ec-9258-0241b9615763" fields={{ field_3: webname }} />
              <DataCollection message="pii" />
            </Box>
          </Box>
        </Content>
      </Page>
    );
  }
  return (
    <Page darkHeader slug={`/${region.webname}`} region={region} event={event}>
      <IndexHeader
        mt={-40}
        pt={32}
        pb={16}
        mb={16}
        notice={event.noticeHero}
        heading={`CodeDay ${event?.name || region.name}`}
        subHeading={event.customDisplayDate || `${event.displayDate}, ${event.displayTime}`}
        images={images}
      >
        {event.venue ? (
          <>
            Hosted @ {event.venue.name} <br />
            <Link fontSize="md" href={event.venue.mapLink}>{event.venue.address}</Link>
          </>
        ) : null}
        {event.canRegister ? (
          <>
            <Text mt={8}>
              {event.activeTicketPrice === 0 ? 'Free!' : `Ticket Price: ${event?.region?.currencySymbol || '$'}${event.activeTicketPrice}`}&nbsp;
              {event.canEarlyBirdRegister && event.activeTicketPrice > 0
                ? (
                  <Text mb={4} display="inline-block" color="red.600" fontSize="xs" position="relative" top="-0.2em">
                    (Early Bird Discount!)
                  </Text>
                ) : null}
            </Text>
            <Button colorScheme="green" mr={2} onClick={() => Scroll.scroller.scrollTo('register', { duration: 500, smooth: true, offset: -50 })}>Register Now</Button>
            {event.activeTicketPrice > 0 && (
              <Button variant="outline" as="a" href="/scholarship" hover={{ bg: '#ff686b' }}>Can&apos;t afford?</Button>
            )}
          </>
        ) : null}
      </IndexHeader>
      {event.noticeBox && (
        <Content maxWidth="container.lg" p={12} fontSize="lg" color="red.50" bg="red.900" rounded="md">
          <Grid templateColumns="1fr minmax(0, 100%)" gap={8}>
            <Box><Box fontSize="4xl" mt={-2}><AnnouncementIcon /></Box></Box>
            <Box>{ReactHtmlParser(marked.parse(event.noticeBox))}</Box>
          </Grid>
        </Content>
      )}
      <Content maxWidth="container.xl" mb={12}>
        <Explainer mb={12} />
      </Content>
      <a name="quote" />
      <Content maxWidth="container.xl" mb={12}>
        <StudentQuotes quotes={quotes} />
      </Content>
      <Sponsors globalSponsors={event.customHideSponsors ? [] : globalSponsors} localSponsors={event.sponsors} />
      <a name="theme" />
      <Content maxWidth="container.xl">
        <ThemeNotifier event={cmsEvent} mb={12} />
      </Content>
      {!event.customHideCovid && (
      <>
        <a name="covid" />
        <Box backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'} p={4} mb={12}>
          <Content maxWidth="container.xl">
            <EventRestrictions event={event} />
          </Content>
        </Box>
      </>
      )}
      <a name="register" />
      <Content maxWidth="container.xl" mb={12}>
        <Box id="register" /> {/* used for register button */}
        {event.canRegister ? (
          event.customForm ? (
            <Content borderWidth={1} p={8} maxWidth="container.lg">
              <Heading as="h3" fontSize="4xl" textAlign="center">Register</Heading>
              <CognitoForm formId={event.customForm} />
            </Content>
          ) : <RegisterForm event={event} />
        ) : (
          <EventMailingListSubscribe event={event}>
            <Text bold textAlign="center">CodeDay {event?.name || region.name} is not currently accepting registrations</Text>
            <Text textAlign="center">Enter your email to be notified when registrations go live!</Text>
          </EventMailingListSubscribe>
        )}
      </Content>
      <Content maxWidth="container.xl" mb={12}>
        <Schedule event={event} timezone={region.timezone} mb={12} />
      </Content>
      <Content maxWidth="container.xl" mb={12}>
        <Heading as="h4" fontSize="4xl">FAQs</Heading>
        <Text mb={8}>
          Have more questions? You can{' '}
          <Link href="https://www.codeday.org/help/codeday" target="_blank">read more FAQs here</Link>{' '}
          or email us at <Link href="mailto:team@codeday.org">team@codeday.org</Link>.
        </Text>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={8}>
          {faqs.map((faq) => <Faq key={faq.sys.id} faq={faq} />)}
        </Grid>
        <Box textAlign="center" mt={8}>
          <Button as="a" href="https://www.codeday.org/help/codeday" target="_blank">All FAQs</Button>
        </Box>
      </Content>
      {event.customLegal && (
        <Content maxWidth="container.lg" textAlign="center" fontSize="sm" color="current.textLight" mb={12}>
          <Text>{event.customLegal}</Text>
        </Content>
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  const allRegions = await apiFetch(print(IndexStaticPathsQuery));
  const allWebnames = allRegions?.cms?.regions?.items
    .reduce((accum, r) => [...accum, r.webname, ...(r.aliases || [])], []) || [];

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { webname } }) {
  const result = await apiFetch(print(IndexStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
    cmsEndDate: DateTime.now().minus({ days: 1 }),
  });
  return {
    props: {
      webname,
      region: result?.cms?.regions?.items[0] || null,
      images: result?.cms?.pressPhotos?.items || [],
      event: result?.clear?.findFirstEvent || null,
      quotes: result?.cms?.testimonials?.items || [],
      cmsEvent: result?.cms?.events?.items[0] || null,
      globalSponsors: result?.cms?.globalSponsors.items || null,
      faqs: result?.cms?.faqs?.items || [],
    },
    revalidate: 900,
  };
}
