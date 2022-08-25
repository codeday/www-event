import {
  Box, Grid, Image, Text,
} from '@codeday/topo/Atom';

export default function PastPhotos({
  photos: photosOrig, featuredPhotos: featuredOrig, ...props
}) {
  // We want to show featured photos first, then all photos, up to a max of 3 large + 24 small. Showcase doesn't
  // allow us to ask for non-featured photos, so we first need to get _more_ photos and then remove any which are
  // also in the featured list. Then we remove any which are mysteriously missing a URL. (Not sure how this is
  // possible but it was happening.)
  const featuredIds = featuredOrig.map((p) => p.id);
  const dedupPhotosOrig = photosOrig.filter((p) => !featuredIds.includes(p.id));
  const allPhotos = [...featuredOrig, ...dedupPhotosOrig].filter((p) => p?.urlMedium);

  // Featured photos come up first in the list, so we'll pick those first
  const featuredPhotos = allPhotos.slice(0, 3);
  const photos = allPhotos.slice(3, 27);

  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }}
      gap={8}
      {...props}
    >
      {featuredPhotos.map((p, i) => (
        <Box
          as="a"
          href={p.url}
          role="group"
          position="relative"
          key={p.id}
          gridColumn={{ base: 'span 1', md: 'span 2' }}
          d={{ base: i >= 2 ? 'none' : 'block', lg: 'block' }}
        >
          <Image src={p.urlMedium} alt="" w="100%" h={{ base: 32, md: 64 }} objectFit="cover" />
          {p.thanks && (
            <Text
              pl={1}
              pr={1}
              color="white"
              fontSize="xs"
              opacity={0}
              transition="all 0.1s ease-in-out"
              _groupHover={{ opacity: 1 }}
              backgroundColor="rgba(0,0,0,0.6)"
              position="absolute"
              bottom={0}
            >
              Photo: {p.thanks}
            </Text>
          )}
        </Box>
      ))}
      {photos.map((p) => (
        <Box as="a" href={p.url} key={p.id} role="group" position="relative">
          <Image src={p.urlMedium} alt="" w="100%" h={32} objectFit="cover" />
          {p.thanks && (
            <Text
              pl={1}
              pr={1}
              color="white"
              fontSize="xs"
              opacity={0}
              transition="all 0.1s ease-in-out"
              _groupHover={{ opacity: 1 }}
              backgroundColor="rgba(0,0,0,0.6)"
              position="absolute"
              bottom={0}
            >
              Photo: {p.thanks}
            </Text>
          )}
        </Box>
      ))}
    </Grid>
  );
}
