import { DefaultSeo } from 'next-seo';
import Box from '@codeday/topo/Atom/Box';
import Text from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import Footer from '@codeday/topo/Organism/Footer';
import { CodeDay } from '@codeday/topo/Atom/Logo';

// TODO: Set production domain
const DOMAIN = 'https://event.codeday.org';

export default ({ children, title, darkHeader, slug, region }) => (
  <>
    <DefaultSeo
      title={[title, region?.name, `CodeDay`].filter((s) => s).join(' ~ ')}
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
      <Header darkBackground={darkHeader} gradAmount={darkHeader && 'lg'} underscore position="relative" zIndex={1000}>
        <SiteLogo>
          <a href="https://www.codeday.org/">
            <CodeDay withText />
          </a>
          {region ? (
            <a href={`/${region.webname}`}>
              <Text
                as="span"
                d="inline"
                letterSpacing="-2px"
                fontFamily="heading"
                position="relative"
                top={1}
                ml={1}
                textDecoration="underline"
                bold
              >
                {region.name}
              </Text>
            </a>
          ) : <></>}
        </SiteLogo>
        <Menu>
          <Button as="a" href="https://virtual.codeday.org" variantColor="green">Virtual CodeDay</Button>
        </Menu>
      </Header>
      {children}
      <Footer />
    </Box>
  </>
);
