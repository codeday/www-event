import { HStack } from '@chakra-ui/react';
import {
  Box, TextInput, Radio, RadioGroup, Heading, Text,
} from '@codeday/topo/Atom';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function YesNo({
  value, onSubmit, collect, collectIf, collectValidate, props,
}) {
  const { t } = useTranslation('Survey');
  const [showCollectForm, setShowCollectForm] = useState(collectIf && value && !['yes', 'no'].includes(value));
  const validationError = useMemo(() => {
    if (!collectValidate || !showCollectForm) return null;
    return collectValidate(value);
  }, [collectValidate, value, showCollectForm]);

  return (
    <Box {...props}>
      <HStack>
        <RadioGroup
          value={showCollectForm ? collectIf : value}
          onChange={(e) => {
            if (collect) {
              setShowCollectForm(collectIf === e);
              if (collectIf !== e) onSubmit(e);
            } else onSubmit(e);
          }}
        >
          <Radio mr={4} value="yes">{t('questionAnswers.yesNo.yes')}</Radio>
          <Radio value="no">{t('questionAnswers.yesNo.no')}</Radio>
        </RadioGroup>
      </HStack>
      {showCollectForm && (
        <>
          <Heading fontSize="md" mt={8}>{collect}</Heading>
          <TextInput value={value === (collectIf === 'yes' ? 'no' : 'yes') ? '' : value} onChange={(e) => onSubmit(e.target.value)} />
          {validationError && (
          <Text fontSize="sm" fontWeight="bold" color="red.600">{validationError}</Text>
          )}
        </>
      )}
    </Box>
  );
}
