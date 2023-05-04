import {
  RadioGroup, Radio, Grid, TextInput,
} from '@codeday/topo/Atom';
import { useMemo } from 'react';

export default function RadioQuestionType({
  value, onSubmit, options, other, columns,
}) {
  const optionValues = useMemo(() => options.map((o) => o.value), [options]);
  const customValue = optionValues.includes(value) ? '' : value;

  return (
    <RadioGroup value={value} onChange={(e) => onSubmit(e)}>
      <Grid gap={2} templateColumns={{ base: '1fr', lg: `repeat(${columns}, 1fr)` }}>
        {options.map((o) => (
          <Radio key={o.value} value={o.value}>{o.text}</Radio>
        ))}
        {other && (
        <Grid templateColumns="1fr minmax(0, 100%)" gap={2}>
          <Radio value={customValue || '_other'} />
          <TextInput defaultValue={customValue} onChange={(e) => onSubmit(e.target.value)} />
        </Grid>
        )}
      </Grid>
    </RadioGroup>
  );
}
