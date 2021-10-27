/* eslint-disable react/prop-types */
import React from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Image from '@codeday/topo/Atom/Image';
import { Link, Heading } from '@codeday/topo/Atom/Text';

export default function Sponsors({ globalSponsors }) {
  if (!globalSponsors) return <></>;

  return (
    <Content paddingBottom={8} textAlign="center">
      <Heading as="h3" color="current.textLight" fontSize="2xl" pb={4}>
        With support from...
      </Heading>
      <Box mb={8}>
        {globalSponsors
          .filter((sponsor) => sponsor.type === 'major')
          .map((sponsor, i) => (
            <Link key={sponsor.name} href={sponsor.link}>
              <Image
                d="inline-block"
                src={sponsor.logo.url}
                pr={i + 1 === globalSponsors.length ? 0 : 8}
              />
            </Link>
          ))}
      </Box>
      <Box>
        {globalSponsors
          .filter((sponsor) => sponsor.type === 'minor')
          .map((sponsor, i) => (
            <Link key={sponsor.name} to={sponsor.link}>
              <Image
                d="inline-block"
                src={sponsor.logo.small}
                pr={i + 1 === globalSponsors.length ? 0 : 8}
              />
            </Link>
          ))}
      </Box>
    </Content>
  );
}
