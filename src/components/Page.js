import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import {
  Box, Button, CodeDay, Text,
} from '@codeday/topo/Atom';
import {
  Footer, SiteLogo, Menu, Header, Main,
} from '@codeday/topo/Organism';
import { useTranslation } from 'next-i18next';
import LanguagePicker from './LanguagePicker';

const DOMAIN = 'https://event.codeday.org';

const Page = ({
  children, title, darkHeader, slug, region, event,
}) => {
  const { t } = useTranslation();
  return (
    <Box overflow="hidden">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DefaultSeo
        title={[title, `CodeDay ${event?.name || region?.name || ''}`].filter((s) => s).join(' ~ ')}
        description="CodeDay is a 24-hour event where students get together to build apps and games and have a lot of fun."
        canonical={`${DOMAIN}${slug}`}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'CodeDay',
          url: `${DOMAIN}${slug}`,
        }}
        twitter={{
          handle: '@codeday',
          site: '@codeday',
          cardType: 'summary_large_image',
        }}
      />
      <Box position="relative">
        {event?.noticeTop && (
          <Box
            textAlign="center"
            fontWeight="bold"
            bg="red.900"
            color="red.50"
            w="100%"
            pb={2}
            pt={2}
            zIndex={10000}
            pos="absolute"
          >
            {event.noticeTop}
          </Box>
        )}
        <Header
          darkBackground={darkHeader}
          gradAmount={darkHeader && 'lg'}
          color={darkHeader && 'white'}
          underscore
          position="relative"
          zIndex={1000}
          pt={event?.noticeTop ? 8 : undefined}
        >
          <SiteLogo>
            <a href="https://www.codeday.org/">
              <CodeDay color={darkHeader && 'white'} withText />
            </a>
            {region ? (
              <a href={`/${region.webname}`}>
                <Text
                  as="span"
                  display="inline"
                  letterSpacing="-2px"
                  fontFamily="logo"
                  position="relative"
                  top={1}
                  ml={1}
                  textDecoration="underline"
                  {...(
                    (event?.name || region.name).length >= 20
                      ? { fontSize: '2xl' }
                      : {}
                  )}
                  bold
                >
                  {event?.name || region.name}
                </Text>
              </a>
            ) : <></>}
          </SiteLogo>
          <Menu>
            <Button as="a" href="https://www.codeday.org/help/codeday" variant="ghost" target="_blank">{t('menu.faq')}</Button>
            <Button as="a" href="https://www.codeday.org/volunteer" variant="ghost" target="_blank">{t('menu.volunteer')}</Button>
            <Button as="a" href="/organize" variant="ghost" target="_blank">{t('menu.organize')}</Button>
            <Button as="a" href="/upcoming" variant="ghost" target="_blank">{t('menu.upcoming')}</Button>
            <Button as="a" variant="ghost" _hover={{ bg: 'none' }} colorScheme="transparent"><LanguagePicker /></Button>
          </Menu>
        </Header>
        <Main>
          {children}
        </Main>
        <Footer mt={12} repository="www-event" />
      </Box>
    </Box>
  );
};

export default Page;
