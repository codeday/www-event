import {
  Grid, Box, Image, Heading, Text,
} from '@codeday/topo/Atom';
import { Trans, useTranslation } from 'next-i18next';
import { useSlideshow } from '../providers/slideshow';

const SIZE = 40;

function Highlight({ children }) {
  return <Text as="span" bold color="red.700">{children}</Text>;
}

export default function StudentQuotes({ quotes, ...props }) {
  const i = useSlideshow(quotes.length, 6000);
  const { t } = useTranslation();
  if (quotes.length === 0) return <></>;

  return (
    <Box {...props}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} alignItems="center" gap={16}>
        <Box textAlign="center">
          <Heading as="h3" fontSize="2xl" pb={4}>
            <Trans i18nKey="studentQuotes.heading" components={{ highlight: <Highlight /> }} />
          </Heading>
        </Box>
        <Box position="relative" height={SIZE} ml={-4}>
          {quotes.map((quote, j) => (
            <Grid
              key={j}
              position="absolute"
              top={0}
              templateColumns="1px 100%"
              alignItems="center"
              opacity={i === j ? 1 : 0}
              transition="all 0.5s ease-in-out"
            >
              <Box borderRightWidth={2} borderRightColor="red.600" height={SIZE} />
              <Box pl={8}>
                <Text textStyle="italic">{quote.quote}</Text>
                <Text mb={0} bold>
                  {quote.image && (
                    <Image src={quote.image.url} d="inline-block" mr={4} alt="" rounded="full" height={8} />
                  )}
                  {t('studentQuotes.quote', {
                    name: quote.firstName ? `${quote.firstName} ${quote.lastName || ''}` : t('studentQuotes.anonymous'),
                    experienceLevel: quote.experience?.toLowerCase() || 'beginner',
                  })}
                </Text>
              </Box>
            </Grid>
          ))}
        </Box>
      </Grid>
    </Box>
  );
}
