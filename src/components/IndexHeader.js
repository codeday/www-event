import React from 'react';
import {
  Grid, Box, Heading, Text,
} from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { useTranslation } from 'next-i18next';
import { useSlideshow } from '../providers/slideshow';

export default function IndexHeader({
  notice, heading, subHeading, images, children, ...props
}) {
  const i = useSlideshow(images.length, 5000);
  const { t } = useTranslation('EventHome');
  return (
    <Box position="relative" {...props}>  
      <Box
        position="relative"
        zIndex={100}
        textAlign={{base: 'center', md: 'left'}}
      >
        <Content>
          <Box
            color="white"
            mt={12}
          >
            {notice && (
              <Text
                color="red.50"
                bg="red.900"
                p={2}
                mb={2}
                d="inline-block"
                rounded="md"
                fontWeight="bold"
              >
                {notice}
              </Text>
            )}
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
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} mt={12} alignItems="center" gap={16}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={4} textShadow="0 0 5px rgba(0,0,0,0.7)">{t('hero.short')}</Text>
                <Text fontSize="lg" fontWeight="bold" textShadow="0 0 5px rgba(0,0,0,0.7)" mb={0}>{t('hero.long')}</Text>
                <br />
                <Text fontSize="xl" fontWeight="bold" textDecoration="underline" textShadow="0 0 5px rgba(0,0,0,0.7)" mb={0}>{t('hero.no-experience-required')}</Text>
              </Box>
              <Box fontSize="xl" fontWeight="bold" textShadow="0 0 5px rgba(0,0,0,0.7)">
                {children}
              </Box>
            </Grid>
          </Box>
        </Content>
      </Box>
      <Box
        zIndex={55}
        opacity={0.6}
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
