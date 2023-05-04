import { Box, Checkbox, Grid } from '@codeday/topo/Atom';
import { useMemo } from 'react';

export default function CheckboxQuestionType({
  value, onSubmit, options, columns,
}) {
  const deserializedValue = useMemo(() => value.split(','), [value]);
  return (
    <Grid gap={2} templateColumns={{ base: '1fr', lg: `repeat(${columns}, 1fr)` }}>
      {options.map((o) => (
        <Box key={o.value}>
          <Checkbox
            isChecked={deserializedValue.includes(o.value)}
            value={o.value}
            onChange={(e) => {
              if (e.target.checked) onSubmit(Array.from(new Set([...deserializedValue, o.value])).filter(Boolean).join(','));
              else onSubmit(deserializedValue.filter((el) => el !== o.value).filter(Boolean).join(','));
            }}
          >
            {o.text}
          </Checkbox>
        </Box>
      ))}
    </Grid>
  );
}
