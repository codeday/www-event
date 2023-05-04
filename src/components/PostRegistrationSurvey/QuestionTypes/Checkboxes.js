import { Box, Checkbox, Grid } from '@codeday/topo/Atom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function CheckboxQuestionType({
  questionKey, value, onSubmit, options, columns,
}) {
  const { t } = useTranslation('Survey');
  const deserializedValue = useMemo(() => value.split(','), [value]);
  return (
    <Grid gap={2} templateColumns={{ base: '1fr', lg: `repeat(${columns}, 1fr)` }}>
      {options.map((o) => (
        <Box key={o}>
          <Checkbox
            isChecked={deserializedValue.includes(o)}
            value={o}
            onChange={(e) => {
              if (e.target.checked) onSubmit(Array.from(new Set([...deserializedValue, o])).filter(Boolean).join(','));
              else onSubmit(deserializedValue.filter((el) => el !== o).filter(Boolean).join(','));
            }}
          >
            {t(`questionAnswers.${questionKey}.${o}`)}
          </Checkbox>
        </Box>
      ))}
    </Grid>
  );
}
