import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import {
  Box, Button, CodeDay, Text,
} from '@codeday/topo/Atom';
import {
  Footer, SiteLogo, Menu, Header, Main,
} from '@codeday/topo/Organism';

const DOMAIN = 'https://event.codeday.org';

const Page = ({
  children, title, darkHeader, slug, region, event,
}) => (
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
      {event.noticeTop && (
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
        pt={event.noticeTop ? 8 : undefined}
      >
        <SiteLogo>
          <a href="https://www.codeday.org/">
            <CodeDay color={darkHeader && 'white'} withText />
          </a>
          {region ? (
            <a href={`/${region.webname}`}>
              <Text
                as="span"
                d="inline"
                letterSpacing="-2px"
                fontFamily="logo"
                position="relative"
                top={1}
                ml={1}
                textDecoration="underline"
                bold
              >
                {event?.name || region.name}
              </Text>
            </a>
          ) : <></>}
        </SiteLogo>
        <Menu>
          <Button as="a" href="https://www.codeday.org/help/codeday" variant="ghost" target="_blank">FAQ</Button>
          <Button as="a" href="https://www.codeday.org/edu/codeday" variant="ghost" target="_blank">Schools</Button>
          <Button as="a" href="https://www.codeday.org/volunteer" variant="ghost" target="_blank">Volunteer</Button>
        </Menu>
      </Header>
      <Main>
        {children}
      </Main>
      <Footer />
    </Box>
  </Box>
);

export default Page;
