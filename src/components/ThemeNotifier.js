import React from 'react';
import { Box, Text } from '@codeday/topo/Atom';
import { Slides } from '@codeday/topo/Molecule';
import { useTranslation } from 'next-i18next';

export default function ThemeNotifier({ event, ...props }) {
  const { t } = useTranslation();
  const { theme, themeBackgrounds } = event || {};
  if (!themeBackgrounds || themeBackgrounds?.items?.length === 0) return <></>;

  return (
    <Box position="relative" height="300px" {...props}>
      {themeBackgrounds.items.length > 0 && (
        <Slides
          height="300px"
          borderRadius="md"
          position="absolute"
          top={0}
          left={0}
          right={0}
          style={{ filter: 'brightness(50%)' }}
          duration={5}
        >
          {themeBackgrounds.items.map((bg) => (
            <Box
              key={bg.url}
              backgroundImage={`url(${bg.url})`}
              backgroundPosition="50% 50%"
              backgroundSize="cover"
              h="300px"
            />
          ))}
        </Slides>
      )}
      <Box
        position="absolute"
        top={{ base: 4, md: 12 }}
        left={0}
        right={0}
        pl={2}
        pr={2}
        color="white"
      >
        {theme ? (
          <>
            <Text textAlign="center" mt={{ base: 4, md: 0 }} fontSize="2xl" bold>{t('theme.heading')}</Text>
            <Text textAlign="center" fontSize={{ base: '5xl', md: '6xl' }} lineHeight={1} fontFamily="accent" bold>{t('theme.body', { theme })}</Text>
            <Text textAlign="center" fontSize="lg" mt={8} bold>{t('theme.optional')}</Text>
          </>
        ) : (
          <>
            <Text textAlign="center" fontSize={{ base: '5xl', md: '6xl' }} mt={{ base: 0, md: 8 }} lineHeight={1} fontFamily="accent" bold>
              {t('theme.no-theme')}
            </Text>
            <Text textAlign="center" fontSize="2xl" mt={8} bold>{t('theme.guess-cta')}</Text>
          </>
        )}
      </Box>
    </Box>
  );
}
