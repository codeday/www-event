import { create } from 'random-seed';
import { Box, Grid, Image, Text } from '@codeday/topo/Atom';
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

export default function PastPhotos({
  photos: photosOrig, random, ...props
}) {
  const photos = shuffle(random, photosOrig);

  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)'}}
      gap={8}
      {...props}
    >
      {photos.filter((p) => p?.urlMedium).map((p) => (
        <Box key={p.id}>
          <Image src={p.urlMedium} alt="" w="100%" h={32} objectFit="cover" />
          {p.thanks && <Text mt={-5} pl={1} color="white" fontSize="xs">Photo: {p.thanks}</Text>}
        </Box>
      ))}
    </Grid>
  );
}
