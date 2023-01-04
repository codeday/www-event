import { useColorMode } from '@codeday/topo/Theme';
import {
  Box, Grid, List, ListItem, Heading, Text,
} from '@codeday/topo/Atom';
import { useTranslation } from 'next-i18next';
import AwardDetails from './AwardDetails';

export default function Awards({ awards, ...props }) {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const bg = colorMode === 'light' ? 'gray.100' : 'gray.900';
  return (
    <Box
      bg={bg}
      borderRadius="sm"
      p={6}
      {...props}
    >
      <Heading as="h4" fontSize="2xl" mb={4}>{t('awards.heading')}</Heading>
      <Grid
        templateColumns={{ base: '1fr', md: '4fr 5fr' }}
        gap={8}
      >
        <Box>
          <Heading as="h5" fontSize="xl" mb={4} fontWeight={400}>{t('awards.criteria.heading')}</Heading>
          <List styleType="disc" pl={4}>
            <ListItem mb={4}>
              <Text fontWeight="bold" fontSize="lg">{t('awards.criteria.difficulty.heading')}</Text>
              <Text>{t('awards.criteria.difficulty.body')}</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold" fontSize="lg">{t('awards.criteria.creativity.heading')}</Text>
              <Text>{t('awards.criteria.creativity.body')}</Text>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} rowGap={{ base: 4, lg: 8 }}>
            {awards.map((award) => <AwardDetails key={award.id} award={award} />)}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
