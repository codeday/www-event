import { useState } from 'react';
import { TextInput } from '@codeday/topo/Atom';
import { normalizePhone } from '../../utils';

export default function PhoneBox({ onChange, region, ...props }) {
  const [isValid, setIsValid] = useState(false);
  const [entered, setEntered] = useState('');

  return (
    <TextInput
      value={entered || ''}
      borderColor={(entered && !isValid) ? 'red.800' : undefined}
      onChange={(e) => {
        const { phoneNumber, isValid: _isValid } = normalizePhone(e.target.value, region);
        setEntered(e.target.value);
        setIsValid(_isValid);
        onChange(phoneNumber, !e.target.value || _isValid);
      }}
      {...props}
    />
  );
}
