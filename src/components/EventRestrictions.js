import React from 'react';
import {
  Grid, Box, Button, Image, Text, Link,
} from '@codeday/topo/Atom';
import { useColorMode } from '@codeday/topo/Theme';
import ReactHtmlParser from 'react-html-parser';
import { marked } from 'marked';

function Highlight({ children }) {
  return <Text as="span" bold color="brand.700">{children}</Text>;
}

function transform(node) {
  if (node.type === 'tag' && node.name === 'strong') {
    return <Highlight>{node.children[0].data}</Highlight>;
  }
  if (node.type === 'tag' && node.name === 'a' && node.attribs.href) {
    if (node.children[0].data.startsWith('btn ')) {
      return <Button as="a" href={node.attribs.href}>{node.children[0].data.slice(3)}</Button>;
    }
    return <Link to={node.attribs.href}>{node.children[0].data}</Link>;
  }
}

const DEFAULT_RESTRICTIONS = [];

// FIXME: Support internationalization
export default function EventRestrictions({ event, ...props }) {
  const { colorMode } = useColorMode();
  const restrictions = event.eventRestrictions || DEFAULT_RESTRICTIONS;
  if (restrictions.length === 0) return <></>;

  return (
    <Box borderTopWidth={2} pt={6} mt={6} borderColor={colorMode === 'light' ? 'red.600' : 'red.900'} {...props}>
      <Grid
        templateColumns={{ base: '1fr', md: `repeat(${Math.max(restrictions.length, 3)}, 1fr)` }}
        alignItems="center"
        gap={8}
      >
        {restrictions.map((restriction) => (
          <Box key={restriction.iconUri} h="100%">
            <Grid templateColumns="minmax(0, max-content) 1fr" gap={4}>
              <Image src={restriction.iconUri} width={12} alt="" />
              <Box>
                <Box fontWeight="bold" mb={2}>
                  {ReactHtmlParser(marked.parse(restriction.title || ''), { transform })}
                </Box>
                <Box>
                  {ReactHtmlParser(marked.parse(restriction.details || ''), { transform })}
                </Box>
              </Box>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
