import React from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import { useSlideshow } from '../providers/slideshow';

export default function IndexHeader({ heading, subHeading, images, children, ...props }) {
  const i = useSlideshow(images.length, 5000);
  return (
    <Box position="relative" {...props}>
      <Box
        position="relative"
        zIndex={100}
      >
        <Content>
          <Box
            color="white"
          >
            <Heading
              as="h2"
              fontSize="5xl"
              fontWeight="bold"
              textShadow="0 0 5px rgba(0,0,0,0.7)"
            >
              {heading}
            </Heading>
            <Heading
              as="h3"
              fontSize="3xl"
              fontWeight="bold"
              textShadow="0 0 5px rgba(0,0,0,0.7)"
            >
              { subHeading || null }
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} mt={20} alignItems="center" gap={16}>
              <Heading fontSize="xl" fontWeight="bold" textShadow="0 0 5px rgba(0,0,0,0.7)">
                CodeDay is a worldwide event where student programmers, artists, musicians, actors, and everyone else can
                get together and build apps & games for 24 hours. Students of all skill levels are welcome — we have workshops
                and mentors who can help if you're new!
              </Heading>
              <Heading fontSize="xl" fontWeight="bold" textShadow="0 0 5px rgba(0,0,0,0.7)">
                {children}
              </Heading>
            </Grid>
          </Box>
        </Content>
      </Box>
      <Box
        zIndex={55}
        opacity={0.5}
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="100%"
        bg="#000"
      />
      {images.map((img, idx) => (
        <Box
          zIndex={50}
          key={img.photo.url}
          opacity={i === idx ? 1 : 0}
          transition="all 1s ease-in-out"
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="100%"
          backgroundImage={`url(${img.photo.url})`}
          backgroundSize="cover"
          backgroundPosition="50% 50%"
          backgroundRepeat="no-repeat"
        />
      ))}
    </Box>
  );
}
