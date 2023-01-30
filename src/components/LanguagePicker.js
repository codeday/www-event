import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Select, Spinner } from '@codeday/topo/Atom';
import { setCookie } from 'cookies-next';

function getFlagEmoji(countryCode) {
  if (!countryCode) return;
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function LanguagePicker() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box d="inline-block">
      {
        isLoading ? <Spinner />
          : (
            <Select onChange={async (e) => {
              setIsLoading(true);
              setCookie('NEXT_LOCALE', e.target.value);
              await router.replace(router.asPath, undefined, { locale: e.target.value });
              setIsLoading(false);
            }}
            >
              {router.locales.filter((a) => a !== '_default').map((l) => (
                <option
                  key={l}
                  selected={l === router.locale}
                  value={l}
                  title={new Intl.DisplayNames([l], { type: 'language' }).of(l)}
                  // Chakra bug forces me to do this :( (firefox only bug)
                  style={{ backgroundColor: 'inherit', color: 'black' }}
                >
                  {getFlagEmoji(new Intl.Locale(l).region) || new Intl.DisplayNames([l], { type: 'language' }).of(l)}
                </option>
              ))}
            </Select>
          )
}
    </Box>
  );
}
