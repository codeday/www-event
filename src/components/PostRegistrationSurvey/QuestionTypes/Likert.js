/* eslint-disable i18next/no-literal-string */
import {
  Box, Text, Button, Grid,
} from '@codeday/topo/Atom';
import { useTranslation } from 'react-i18next';

const LIKERT_OPTIONS = ['stronglyDisagree', 'disagree', 'agree', 'stronglyAgree'];

export default function Likert({
  value, onSubmit, statement, ...props
}) {
  const { t } = useTranslation('Survey');
  return (
    <Box {...props}>
      <Text mb={2} borderLeftWidth={2} pl={4} ml={4} fontStyle="italic" fontWeight="bold">&ldquo;{statement}&rdquo;</Text>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(4, 1fr)' }} gap={2}>
        {LIKERT_OPTIONS.map((o) => (
          <Button
            key={o}
            size="xs"
            variant={value === o ? 'solid' : 'outline'}
            onClick={() => onSubmit(o)}
          >
            {t(`questionAnswers.likert.${o}`)}
          </Button>
        ))}
      </Grid>
    </Box>
  );
}
