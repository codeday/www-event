import {
  Box,
  Text,
  Grid,
  Heading,
  Image,
} from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { useTranslation } from 'next-i18next';
import { indexOfMax } from '../../utils';
import { shuffle } from './PastProjects';

export default function Team({
  random, team, globalTeam, ...props
}) {
  const { t } = useTranslation('common');
  const { staff, judges, mentors } = Object.fromEntries(
    Object.entries(team || {})
      .map(([key, items]) => [
        key,
        items.filter(Boolean).map((i) => ({
          name: i.account?.name || `${i.firstName} ${i.lastName}`,
          picture: i.account?.picture || i.avatarUrl,
          pronoun: i.account?.pronoun,
        })),
      ]),
  );

  const columns = [
    { w: 1, title: 'Global Staff', items: [...globalTeam.employees, ...globalTeam.otherTeam] },
    { w: 1, title: 'Event Staff', items: staff },
    { w: 1, title: 'Judges', items: judges },
    { w: 1, title: 'Mentors', items: mentors },
  ]
    .filter((c) => c.items && c.items.length > 0)
    .slice(0, 3);

  if (columns.length === 0) return <></>;
  if (columns.length < 3) {
    columns[indexOfMax(columns.map((c) => c.items.length))].w = 2;
  }

  return (
    <Content maxWidth={columns.length > 1 ? 'container.xl' : 'container.sm'} {...props}>
      <Heading as="h3" fontSize="4xl" fontWeight="bold" mb={4}>{t('team-heading')}</Heading>
      <Grid
        margin="auto"
        templateColumns={{ base: '1fr', md: `repeat(${columns.length}, 1fr)`, lg: columns.map((c) => `${c.w}fr`).join(' ') }}
        gap={8}
      >
        {columns.map(({ title, items, w }) => (
          <Box key={title}>
            <Heading as="h4" fontSize="xl" fontWeight="bold" mb={4}>{title}</Heading>
            <Grid templateColumns={{ base: '1fr', lg: `repeat(${w}, 1fr)` }} gap={2}>
              {shuffle(random, items).map((e) => (
                <Grid key={e?.picture} templateColumns="max-content 1fr" gap={2}>
                  <Image src={e?.picture} alt="" rounded="sm" h={10} w={10} />
                  <Box>
                    <Text>{e?.name}</Text>
                    {e?.pronoun && <Text fontSize="sm" color="current.textLight">{e.pronoun}</Text>}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Grid>
    </Content>
  );
}
