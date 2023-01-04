import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  Grid, Box, Image, Text,
} from '@codeday/topo/Atom';

export default function Explainer({ ...props }) {
  const { t } = useTranslation();
  return (
    <Box {...props}>
      <Text textAlign="center" mb={0} fontSize="xl" bold color="current.textLight">{t('explainer.heading')}</Text>
      <Text textAlign="center" mb={12} fontSize="md" bold color="current.textLight">{t('explainer.subheading')}</Text>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} alignItems="top">
        {/* I don't really like this hack, but I cant find a better way to do it.
           * as long as the translation doesn't contain <li> it will be fine */}
        {t('explainer.steps', { joinArrays: '<li>' }).split('<li>').map((text, i) => (
          <Box key={text}>
            <Image rounded="sm" shadow="md" mb={4} src={`/explainer/${i + 1}.png`} alt="" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text textAlign="center" fontSize="md" bold mb={0} color="current.textLight">{i + 1}. {text}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
