import { useState } from 'react';
import {
  TextInput,
  RadioGroup,
  Radio,
  Box,
  Text,
} from '@codeday/topo/Atom';
import { useTranslation } from 'next-i18next';
import { normalizePhone } from '../../utils';

export default function PhoneBox({ onChange, region, ...props }) {
  const [isValid, setIsValid] = useState(false);
  const [entered, setEntered] = useState('');
  const [normalized, setNormalized] = useState('');
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const { t } = useTranslation();
  return (
    <Box>
      <TextInput
        value={entered || ''}
        borderColor={(entered && !isValid) ? 'red.800' : undefined}
        onChange={(e) => {
          const { phoneNumber, isValid: _isValid } = normalizePhone(e.target.value, region);
          setEntered(e.target.value);
          setNormalized(phoneNumber);
          setIsValid(_isValid);
          onChange(phoneNumber, !e.target.value || _isValid, isWhatsApp);
        }}
        {...props}
      />
      {entered && (
        <Text fontSize="xs" color={!isValid ? 'red.700' : undefined}>
          {!isValid
            ? t('phone-invalid', { countryName: region.countryNameShortAdjective || 'US' })
            : (entered && t('phone-valid', { number: normalized }))}
        </Text>
      )}
      {(region.messagingServices || ['sms']).includes('whatsApp') && (
        <RadioGroup
          defaultValue="phone"
          mt={1}
          onChange={(e) => {
            setIsWhatsApp(e === 'whatsApp');
            onChange(normalized, isValid, e === 'whatsApp');
          }}
        >
          <Radio value="phone" mr={4}>{t('sms')}</Radio>
          <Radio value="whatsApp">{t('whatsapp')}</Radio>
        </RadioGroup>
      )}
    </Box>
  );
}
