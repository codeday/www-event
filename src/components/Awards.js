import AwardDetails from "./AwardDetails";
import { useColorMode } from '@codeday/topo/Theme';
import { Box, Grid, List, ListItem, Heading, Text } from '@codeday/topo/Atom';

const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
function getNumberWord(number) {
  if (number >= numberWords.length) return number;
  return numberWords[number];
}

export default function Awards({ awards, ...props }) {
  const { colorMode } = useColorMode();
  const bg = colorMode === 'light' ? 'gray.50' : 'gray.900';
  return (
    <Grid
      bg={bg}
      borderRadius="sm"
      p={6}
      templateColumns={{ base: '1fr', md: '4fr 5fr' }}
      gap={8}
      {...props}
    >
      <Box>
        <Heading as="h4" fontSize="2xl" mb={4}>
          Win an award, even if you're new!
        </Heading>
        <Heading as="h5" fontSize="xl" mb={4} fontWeight={400}>Our judging criteria:</Heading>
        <List styleType="disc" pl={4}>
          <ListItem mb={4}>
            <Text fontWeight="bold" fontSize="lg">Difficulty (for you)</Text>
            <Text>
              CodeDay isn't about showing off. Push yourself to try something new!
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" fontSize="lg">Creativity</Text>
            <Text>
              Work with other attendees to build a fun project with original art, design, music,
              voice acting, or story.
            </Text>
          </ListItem>
        </List>
      </Box>
      <Box>
        <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
          {awards.map((award) => <AwardDetails key={award.id} award={award} />)}
        </Grid>
      </Box>
    </Grid>
  );
}
