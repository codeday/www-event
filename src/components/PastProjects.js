import { create } from 'random-seed';
import { Box, Text } from '@codeday/topo/Atom';
import { useColorMode } from '@codeday/topo/Theme';
import BlobImage from './BlobImage';
import { useSlideshow } from '../slideshow';

export function shuffle(randomSeed, array) {
  const rng = create(randomSeed);
  const arrayCopy = JSON.parse(JSON.stringify(array));

  let currentIndex = arrayCopy.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = rng.intBetween(0, currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
}

export default function PastProjects({ projects: projectsOrig, random, ...props }) {
  const projects = shuffle(random, projectsOrig.filter((p) => p?.media[0]?.image)).slice(0, 10);
  const i = useSlideshow(projects.length, 5000);
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      {...props}
    >
      {projects.map((p, j) => (
        <Box
          key={p.id}
          position={j === 0 ? undefined : 'absolute'}
          top={0}
          right={0}
          bottom={0}
          left={0}
          opacity={i === j ? 1 : 0}
          transition="all 1s ease-in-out"
          as="a"
          href={`https://showcase.codeday.org/project/${p.id}`}
          zIndex={i === j ? 500 : 400}
          target="_blank"
          rel="noopener"
          bg={colorMode === 'light' ? 'white' : 'gray.1100'}
        >
          <Text textAlign="center" color="current.textLight" bold fontSize="lg" mb={-1}>
            We&apos;ll help you make something like...
          </Text>
          <BlobImage
            src={p.media.sort((a, b) => (2 * ((b.type === 'IMAGE') - (a.type === 'IMAGE'))) - 1)[0].image}
            height={64}
            maxWidth={{ base: 'lg', md: 'unset' }}
            margin="0 auto"
          />
          <Text mb={0} textAlign="center" fontSize="lg" bold>{p.name}</Text>
          {p.eventGroup && <Text textAlign="center" color="current.textLight" mb={0}>{p.eventGroup?.title}</Text>}
        </Box>
      ))}
    </Box>
  );
}
