/* eslint-disable react/prop-types */
import React from 'react';
import {
  Image, Link,
} from '@codeday/topo/Atom';
import { useColorMode } from '@codeday/topo/Theme';

function getColorBackground(logoImage, darkLogoImage, colorMode) {
  if (colorMode === 'light') return logoImage ? undefined : 'black';
  return darkLogoImage ? undefined : 'white';
}

export default function SponsorLogo({ sponsor, ...props }) {
  const { colorMode } = useColorMode();

  const logoImage = sponsor.logo ? sponsor.logo?.url : sponsor.logoImageUri;
  const darkLogoImage = sponsor.logo ? sponsor.darkLogo?.url : sponsor.darkLogoImageUri;
  const link = sponsor.link
    ? `${sponsor.link}?utm_source=codeday&utm_medium=webpage&utm_campaign=codeday_sponsor_${(new Date()).getFullYear()}`
    : undefined;

  if (!logoImage && !darkLogoImage) return <></>;

  return (
    <Link key={sponsor.name} href={link} target="_blank">
      <Image
        bg={getColorBackground(logoImage, darkLogoImage, colorMode)}
        src={colorMode === 'light' ? logoImage : (darkLogoImage || logoImage)}
        alt={sponsor.name}
        {...props}
      />
    </Link>
  );
}
