import { Box, Text } from '@codeday/topo/Atom';

export default function PullQuote({ testimonial, float, ...props }) {
  if (!testimonial) return <></>;

  const floatProps = float === 'left'
    ? {
      mr: { base: 'none', lg: 4 },
      pr: { base: 'none', lg: 4 },
      borderRightWidth: { base: 0, lg: 2 },
      ml: { base: 4, lg: 'none' },
      pl: { base: 4, lg: 'none' },
      borderLeftWidth: { base: 2, lg: 0 },
      textAlign: { base: 'left', lg: 'right' },
    } : { ml: 4, pl: 4, borderLeftWidth: 2 };

  const title = testimonial.title
    || [testimonial.program.name, testimonial.type].filter(Boolean).join(' ')
    || 'Participant';

  return (
    <Box
      color="current.textLight"
      borderColor="current.textLight"
      maxW={{ base: 'none', lg: 80 }}
      float={{ base: 'none', lg: float }}
      mb={{ base: 8, lg: 'none' }}
      {...floatProps}
      {...props}
    >
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Text fontSize="xl" fontStyle="italic">&ldquo;{testimonial.quote}&rdquo;</Text>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Text mt={2}>&mdash;&thinsp;{testimonial.firstName} {testimonial.lastName}, {title}</Text>
    </Box>
  );
}
