import React from 'react';
import {
  Grid, Box, Button, Image, Heading, Text, Link,
} from '@codeday/topo/Atom';
import { useColorMode } from '@codeday/topo/Theme';
import ReactHtmlParser from 'react-html-parser';
import { marked } from "marked";

function Highlight({ children }) {
    return <Text as="span" bold color="brand.700">{children}</Text>;
}

function transform(node) {
    if(node.type === "tag" && node.name === "strong") {
        return <Highlight>{node.children[0].data}</Highlight>
    }
    if(node.type === "tag" && node.name === "a" && node.attribs.href) {
        if(node.children[0].data.startsWith('btn ')) {
            return <Button as="a" href={node.attribs.href}>{node.children[0].data.slice(3)}</Button>
        }
        return <Link to={node.attribs.href}>{node.children[0].data}</Link>
    }
}


const DEFAULT_RESTRICTIONS = [
  {
    iconUri: 'twemoji/mask.svg',
    title: `We'll provide you with a high-flow N95 mask which you must wear at all times.`,
    details: `To minimize transmission risks, we're not allowing regular cloth masks.`,
  },
  {
    iconUri: 'twemoji/vaccine.svg',
    title: `Documentation of a full COVID-19 vaccination is required to attend in-person.`,
    details: `[btn Get Vaccinated](https://vaccines.gov)`,
  },
  {
    iconUri: 'twemoji/sick.svg',
    title: `We're checking for symptoms of COVID-19 at check-in.`,
    details: `If you are running a fever or have other symptoms of COVID-19, you'll need to participate virtually for safety.`,
  },
]

export default function EventRestrictions({ event, ...props }) {
  const { colorMode } = useColorMode();
  const bg = colorMode === 'light' ? 'gray.50' : 'black';
  const restrictions = event.eventRestrictions || DEFAULT_RESTRICTIONS;
  if (restrictions.length === 0) return <></>;

  return (
    <Box {...props}>
      <Heading>
        Special Event Restrictions
      </Heading>
      <Text mb={6}>
        We have special procedures for this event to keep everyone safe.
      </Text>
      <Grid templateColumns={{ base: '1fr', md: `repeat(${Math.max(restrictions.length, 3)}, 1fr)` }} alignItems="center" gap={16}>
        {restrictions.map((restriction) => (
          <Box key={restriction.iconUri} bg={bg} rounded="md" p={4} h="100%">
            <Image src={restriction.iconUri} width={24} alt="" display="block" ml="auto" mr="auto" mb={5} />
            <Text mb={2} fontWeight="bold">
              {ReactHtmlParser(marked.parse(restriction.title || ''), {transform})}
            </Text>
            <Text>
              {ReactHtmlParser(marked.parse(restriction.details || ''), {transform})}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
