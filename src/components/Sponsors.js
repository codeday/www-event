/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Heading,
} from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import { useTranslation } from 'next-i18next';
import SponsorLogo from './SponsorLogo';

export default function Sponsors({ globalSponsors, localSponsors, large }) {
  const { t } = useTranslation();
  return (
    <Content paddingBottom={8} textAlign="center">
      <Heading as="h3" color="current.textLight" fontSize="xl" pb={2}>{t('sponsors.heading')}</Heading>
      <Box>
        {[...localSponsors, ...(globalSponsors || [])
          .filter((sponsor) => sponsor.type !== 'minor')]
          .map((sponsor) => (
            <SponsorLogo
              key={sponsor.name}
              p={4}
              maxHeight={large ? 48 : 24}
              maxWidth={large ? 56 : 40}
              display="inline-block"
              sponsor={sponsor}
            />
          ))}
        {globalSponsors
          .filter((sponsor) => sponsor.type === 'minor')
          .map((sponsor) => (
            <SponsorLogo
              key={sponsor.name}
              p={4}
              maxHeight={16}
              maxWidth={40}
              display="inline-block"
              sponsor={sponsor}
            />
          ))}
      </Box>
    </Content>
  );
}
