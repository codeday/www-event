import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Select, Spinner } from '@codeday/topo/Atom';
import { setCookie } from 'cookies-next';

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
                  // Chakra bug forces me to do this :( (firefox only bug)
                  style={{ backgroundColor: 'inherit', color: 'black' }}
                >
                  {new Intl.DisplayNames([l], { type: 'language' }).of(l)}
                </option>
              ))}
            </Select>
          )
}
    </Box>
  );
}
