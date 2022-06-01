import { useState } from 'react';
import {
  TextInput,
  RadioGroup,
  Radio,
  Box,
  Text,
} from '@codeday/topo/Atom';
import { normalizePhone } from '../../utils';

export default function PhoneBox({ onChange, region, ...props }) {
  const [isValid, setIsValid] = useState(false);
  const [entered, setEntered] = useState('');
  const [normalized, setNormalized] = useState('');
  const [isWhatsApp, setIsWhatsApp] = useState(false);

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
            ? `Not a valid ${region.countryNameShortAdjective || 'US'} mobile phone number.`
            : (entered && `Your full international number: ${normalized}`)}
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
          <Radio value="phone" mr={4}>SMS</Radio>
          <Radio value="whatsApp">WhatsApp</Radio>
        </RadioGroup>
      )}
    </Box>
  );
}
