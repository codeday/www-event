import {
  RadioGroup, Radio, Grid, TextInput, HStack,
} from '@codeday/topo/Atom';
import { useTranslation } from 'react-i18next';

export default function RadioQuestionType({
  questionKey, value, onSubmit, options, other, columns,
}) {
  const { t } = useTranslation('Survey');
  const customValue = options.includes(value) ? '' : value;

  return (
    <RadioGroup value={value} onChange={(e) => onSubmit(e)}>
      <Grid gap={2} templateColumns={{ base: '1fr', lg: `repeat(${columns}, 1fr)` }}>
        {options.map((o) => (
          <Radio key={o} value={o}>{t(`questionAnswers.${questionKey}.${o}`)}</Radio>
        ))}
        {other && (
        <HStack>
          <Radio value={customValue || '_other'} mr={2} />
          <TextInput placeholder={t('other')} defaultValue={customValue} onChange={(e) => onSubmit(e.target.value)} />
        </HStack>
        )}
      </Grid>
    </RadioGroup>
  );
}
