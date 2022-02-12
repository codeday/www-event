/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Heading,
} from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';
import SponsorLogo from './SponsorLogo';

export default function Sponsors({ globalSponsors, localSponsors }) {
  return (
    <Content paddingBottom={8} textAlign="center">
      <Heading as="h3" color="current.textLight" fontSize="xl" pb={4}>
        With Support From:
      </Heading>
      <Box>
        {[...localSponsors, ...(globalSponsors || [])
          .filter((sponsor) => sponsor.type !== 'minor')]
          .map((sponsor) => (
            <SponsorLogo
              key={sponsors.name}
              d="inline-block"
              maxHeight={40}
              maxWidth={56}
              p={8}
              sponsor={sponsor}
            />
        ))}
      </Box>
      <Box>
        {globalSponsors
          .filter((sponsor) => sponsor.type === 'minor')
          .map((sponsor) => (
            <SponsorLogo
              key={sponsors.name}
              p={4}
              maxHeight={16}
              maxWidth={40}
              d="inline-block"
              sponsor={sponsor}
            />
        ))}
      </Box>
    </Content>
  );
}
