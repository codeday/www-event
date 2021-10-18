import React from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';

function Highlight({ children }) {
  return <Text as="span" bold color="brand.700">{children}</Text>;
}

export default function CovidDetails({ ...props }) {
  return (
    <Box {...props}>
      <Heading>
        COVID-19 Safety Precautions
      </Heading>
      <Text>
        CodeDay is adhering to <Highlight>the same or greater safety measures</Highlight> as most schools to keep
        all of our attendees, staff, and volunteers safe.&nbsp;
        <Link href="https://virtual.codeday.org">Virtual CodeDay</Link>
        &nbsp;
        is available for students uncomfortable attending an in-person event, or unwilling to meet our safety criteria.
      </Text>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} alignItems="center" gap={16}>
        <Box bg="gray.50" rounded={10} p={4} h="100%">
          <Image src="twemoji/mask.svg" width={150} alt="Face Mask" display="block" ml="auto" mr="auto" mb={5} />
          <Text bold>
            Face masks are <Highlight>required at all times</Highlight> during CodeDay.
          </Text>
          <Text>
            CodeDay will be providing medically effective, high flow rate N95 masks to all participants.
            <br />
            <Highlight>You are required to wear the masks CodeDay provides, not one brought from home</Highlight>
          </Text>
        </Box>
        <Box bg="gray.50" rounded={10} p={4} h="100%">
          <Image src="twemoji/vaccine.svg" width={150} alt="Vaccine" display="block" ml="auto" mr="auto" mb={5} />
          <Text bold>
            A full COVID-19 vaccination is <Highlight>required</Highlight> to attend in-person CodeDay
          </Text>
          <Text>
            CodeDay requires a full dose of an
            &nbsp;
            {/* eslint-disable-next-line max-len */}
            <Link href="https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-vaccines">
              FDA-approved COVID-19 vaccine
            </Link>
            &nbsp;to attend our events. <br />
            To find a vaccination site near you, visit <Link href="https://vaccines.gov">vaccines.gov</Link>.
            <br />
            <Highlight>CodeDay requires documented proof of vaccination</Highlight>
          </Text>
        </Box>
        <Box bg="gray.50" rounded={10} p={4} h="100%">
          <Image src="twemoji/sick.svg" width={150} alt="Sick" display="block" ml="auto" mr="auto" mb={5} />
          <Text bold>Attendees showing symptoms of COVID-19 can not attend CodeDay.</Text>
          <Text>
            All attendees must complete a COVID-19 symptom questionnaire and temperature check to check-in to CodeDay.
            <br />
            Students running a fever or who are exhibiting other symptoms of COVID-19 will not be able to attend,
            however still have the option to participate virtually.
          </Text>
        </Box>
      </Grid>
    </Box>
  );
}
