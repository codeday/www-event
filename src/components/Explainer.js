import React from 'react';
import {
  Grid, Box, Image, Text,
} from '@codeday/topo/Atom';

const steps = [
  'Come up with ideas.',
  'Find a team.',
  'Start building it! (No experience needed!)',
  'We\'ll help you as you need it.',
  'Join fun activities... with prizes!',
  'Show off what you made.',
];

export default function Explainer({ ...props }) {
  return (
    <Box {...props}>
      <Text textAlign="center" mb={0} fontSize="xl" bold color="current.textLight">Here&apos;s how CodeDay works:</Text>
      <Text textAlign="center" mb={12} fontSize="md" bold color="current.textLight">
        (You don't need to be a coder to have fun. Artists, musicians, writers, and actors are especially welcome!)
      </Text>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} alignItems="top">
        {steps.map((text, i) => (
          <Box key={text}>
            <Image rounded="sm" shadow="md" mb={4} src={`/explainer/${i + 1}.png`} alt="" />
            <Text textAlign="center" fontSize="md" bold mb={0} color="current.textLight">{i + 1}. {text}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
