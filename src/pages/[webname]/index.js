import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import {
  Box, Button, Heading, Link, Text, Grid, Image,
} from '@codeday/topo/Atom';
import AnnouncementIcon from '@codeday/topocons/Icon/UiInfo';
import { Content } from '@codeday/topo/Molecule';
import { useColorMode } from '@codeday/topo/Theme';
import { apiFetch } from '@codeday/topo/utils';
import Scroll from 'react-scroll';
import { marked } from 'marked';
import Head from 'next/head';
import ReactHtmlParser from 'react-html-parser';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../../components/Page';
import { IndexStaticPathsQuery, IndexStaticPropsQuery } from './index.gql';
import IndexHeader from '../../components/IndexHeader';
import Explainer from '../../components/Explainer';
import StudentQuotes from '../../components/StudentQuotes';
import ThemeNotifier from '../../components/ThemeNotifier';
import Schedule from '../../components/Schedule';
import Sponsors from '../../components/Sponsors';
import Faq from '../../components/Faq';
import Awards from '../../components/Awards';
import Team from '../../components/Team';
import PastProjects from '../../components/PastProjects';
import PastPhotos from '../../components/PastPhotos';
import RegisterBox from '../../components/RegisterBox';

export default function EventHome({
  webname, region, images, quotes, event, globalSponsors, globalTeam, faqs, awards, projects, random,
}) {
  // Redirect the user to the canonical URL
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { t } = useTranslation('EventHome');
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
          <Heading as="h2" fontSize="5xl" textAlign="center">{t('common:error.message.no-event')}</Heading>
        </Content>
      </Page>
    );
  }

  return (
    <Page darkHeader slug={`/${region.webname}`} region={region} event={event}>
      <Head>
        <link
          rel="alternate"
          type="application/json+oembed"
          href={`http://event.codeday.org/api/oembed?url=${encodeURIComponent(`https://event.codeday.org/${webname}`)}&format=json`}
          title="CodeDay oEmbed Profile"
        />
      </Head>
      {event ? (
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
              <Box display="flex" justifyContent="center" flexDirection="column">
                {event.venue && event.venueCobrandSponsor ? event.sponsors.filter((sponsor) => (sponsor.id === event.venueCobrandSponsor)).map((s) => (
                  <Image maxH="5em" maxW="5em" display="flex" alignSelf="center" alt={event.venue.name} isDark key={s.id} src={s.logo ? s.darkLogo?.url : s.darkLogoImageUri} />
                )) : null}
                {t('hosted-at', { venue: event.venue.name })}<br />
              </Box>
              <Link fontSize="md" href={event.venue.mapLink}>{event.venue.addressInline}</Link>
            </>
          ) : null}
          {event.canRegister ? (
            <>
              <Text mt={8}>
                {event.activeTicketPrice === 0 ? t('free') : t('ticket-price', { price: event.activeTicketPrice, currency: event.region?.currency || 'USD' })}
                {event.canEarlyBirdRegister && event.activeTicketPrice > 0
                  ? (
                    <Text mb={4} display="block" color="red.600" fontSize="xs" position="relative" top="-0.2em">
                      {t('early-bird')}
                    </Text>
                  ) : null}
              </Text>
              <Button colorScheme="green" mr={2} onClick={() => Scroll.scroller.scrollTo('register', { duration: 500, smooth: true, offset: -50 })}>{t('register-now')}</Button>
              {event.activeTicketPrice > 0 && (
                <Button variant="outline" as="a" href="/scholarship" hover={{ bg: '#ff686b' }}>{t('scholarship-button')}</Button>
              )}
            </>
          ) : null}
        </IndexHeader>
      ) : (
        <IndexHeader mt={-40} pt={32} pb={16} mb={16} heading={`CodeDay ${region.name}`} images={images} />
      )}
      {event?.noticeBox && (
        <Content maxWidth="container.lg" p={12} fontSize="lg" color="red.50" bg="red.900" rounded="md">
          <Grid templateColumns="1fr minmax(0, 100%)" gap={8}>
            <Box><Box fontSize="4xl" mt={-2}><AnnouncementIcon /></Box></Box>
            <Box>{ReactHtmlParser(marked.parse(event.noticeBox))}</Box>
          </Grid>
        </Content>
      )}
      <Content maxWidth="container.xl" mb={24}>
        <Explainer />
      </Content>
      <Content maxW="container.xl" mb={24}>
        <Grid templateColumns={{ base: '1fr', lg: '4fr 7fr' }} gap={6} alignItems="center">
          <Box pr={8} pb={{ base: 8, lg: null }}>
            <PastProjects projects={projects} random={random} title={t('past-projects-header')} />
          </Box>
          <Awards awards={awards} />
        </Grid>
      </Content>
      <a name="theme" />
      <Content maxWidth="container.xl">
        <ThemeNotifier event={event} mb={16} />
      </Content>
      <a name="register" />
      <Content maxWidth="container.xl" mb={16}>
        <Box id="register" /> {/* used for register button */}
        <Box
          borderWidth={2}
          borderColor={colorMode === 'light' ? 'red.600' : 'red.900'}
          borderRadius="sm"
          p={0}
        >
          <Box p={4} bg={colorMode === 'light' ? 'red.600' : 'red.900'} color="white">
            <Heading fontSize="2xl">{t('register-header')}</Heading>
            <Text fontWeight="bold">{t('register-subheader')}</Text>
          </Box>
          <Box p={{ base: 4, lg: 8 }}>
            <RegisterBox event={event} region={region} webname={webname} />
          </Box>
        </Box>
      </Content>
      <Sponsors
        globalSponsors={event?.customHideSponsors ? [] : globalSponsors}
        localSponsors={event?.sponsors || []}
        large={event?.customHideSponsors}
      />
      {event && (
        <Content maxWidth="container.xl" mb={16}>
          <Schedule event={event} timezone={region.timezone} mb={12} />
        </Content>
      )}
      <a name="quote" />
      <Content maxWidth="container.xl" mb={16}>
        <StudentQuotes quotes={quotes} />
      </Content>

      <Content maxWidth="container.xl" mb={12}>
        <Heading as="h4" fontSize="4xl">{t('faq.title')}</Heading>
        <Trans ns="EventHome" i18nKey="faq.body">
          <Text mb={8}>
            Have more questions? You can{' '}
            <Link href="https://www.codeday.org/help/codeday" target="_blank">read more FAQs here</Link>{' '}
            or email us at <Link href="mailto:team@codeday.org">team@codeday.org</Link>.
          </Text>
        </Trans>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={8}>
          {faqs.map((faq) => <Faq key={faq.sys.id} faq={faq} />)}
        </Grid>
        <Box textAlign="center" mt={8}>
          <Button as="a" href="https://www.codeday.org/help/codeday" target="_blank">{t('faq.button')}</Button>
        </Box>
      </Content>

      {region.pastPhotos?.length > 0 && (
        <Content maxWidth="container.xl" mb={16}>
          <Heading as="h4" fontSize="4xl" mb={6}>{t('photos-header', { region: event?.name || region.name })}</Heading>
          <PastPhotos photos={region.pastPhotos} featuredPhotos={region.featuredPhotos} random={random} />
          <Box textAlign="center" mt={8}>
            <Button
              as="a"
              href={`https://showcase.codeday.org/projects/all/region=${region.webname}`}
              target="_blank"
            >
              {t('photos-button')}
            </Button>
          </Box>
        </Content>
      )}

      {event && <Team mb={16} team={event?.team} globalTeam={globalTeam} random={random} />}

      {(event?.customLegal || webname === 'seattle') && (
        <Content maxWidth="container.lg" textAlign="center" fontSize="sm" color="current.textLight" mb={12}>
            {event?.customLegal && <Text>{event.customLegal}</Text>}
            {webname === 'seattle' && (
              <Text>
                <Trans ns="EventHome" i18nKey="stevens-amendment" components={{ click: <Link href="https://esd.wa.gov/usdol" /> }} />
              </Text>
            )}
        </Content>
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  const allWebnamesQuery = await apiFetch(print(IndexStaticPathsQuery), { endDate: DateTime.now().minus({ days: 1 }) });
  const allWebnames = allWebnamesQuery?.clear?.events.map((e) => e.contentfulWebname).filter(Boolean);

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ locale, params: { webname } }) {
  const result = await apiFetch(print(IndexStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
    cmsEndDate: DateTime.now().minus({ days: 1 }),
    locale: locale && locale !== '_default' ? locale : 'en-US',
  });
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US', ['EventHome', 'Register', 'Scholarship', 'Survey', 'common'])),
      webname,
      region: result?.cms?.regions?.items[0] || null,
      images: result?.cms?.pressPhotos?.items || [],
      event: result?.clear?.findFirstEvent || null,
      quotes: result?.cms?.testimonials?.items || [],
      globalSponsors: result?.cms?.globalSponsors.items || null,
      faqs: result?.cms?.faqs?.items || [],
      awards: result?.cms?.awards?.items || [],
      projects: result?.showcase?.projects || [],
      globalTeam: result?.globalTeam,
      random: Math.random(),
      locale,
      localizationConfig: result?.cms?.regions?.items[0]?.localizationConfig?.sys?.id || null,
    },
    revalidate: 60,
  };
}
