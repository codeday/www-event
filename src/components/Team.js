import {
  Box,
  Text,
  Grid,
  Heading,
  Image,
} from '@codeday/topo/Atom';

export default function Team({ team, ...props }) {
  const teamWithHeadings = Object.entries(team)
    .map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value])
    .filter(([, value]) => !!value && value.length > 0);

  if (teamWithHeadings.length === 0) return <></>;

  return (
    <Box {...props}>
      <Grid
        maxWidth={teamWithHeadings.length > 2 ? 'container.xl' : 'container.sm'}
        margin="auto"
        templateColumns={{ base: '1fr', md: `repeat(${teamWithHeadings.length}, 1fr)` }}
        gap={8}
      >
        {teamWithHeadings.map(([title, entries]) => (
          <Box key={title}>
            <Heading as="h4" fontSize="3xl" fontWeight="bold" mb={4}>{title}</Heading>
            <Grid templateColumns={{ base: '1fr', md: (teamWithHeadings.length === 1 ? 'repeat(2, 1fr)' : '1fr') }} gap={4}>
              {entries.map((e) => (
                <Grid key={e.avatarUrl} templateColumns="max-content 1fr" gap={4}>
                  <Image src={e.account?.picture || e.avatarUrl} alt="" rounded="sm" h={12} w={12} />
                  <Box>
                    <Text>{e.account?.name || `${e.firstName} ${e.lastName}`}</Text>
                    {e.account?.pronouns && <Text fontSize="sm">{e.account.pronouns}</Text>}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
