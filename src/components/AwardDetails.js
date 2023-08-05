import { Box, Image, Text } from '@codeday/topo/Atom';

// FIXME: No localization
export default function AwardDetails({ award, ...props }) {
  const variants = award.suggestedModifiers && award.suggestedModifiers.length > 0
    ? award.suggestedModifiers.map((m) => `${award.name}, ${m}`)
    : [award.name];

  return variants.map((name) => (
    <Box key={name} textAlign="center" {...props}>
      <Image display="inline-block" pb={2} src={award.icon.url} alt="" width="100%" maxW="60px" />
      <Text display="block" fontSize="sm">{name}</Text>
    </Box>
  ));
}
