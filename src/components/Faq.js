import { useState } from 'react';
import { Box, Heading } from '@codeday/topo/Atom';
import ContentfulRichText from './ContentfulRichText';

export default function Faq({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box borderWidth={1} gridColumn={{ base: 'span 1', lg: isOpen ? 'span 3' : undefined }}>
      <Heading
        as="h4"
        fontSize="lg"
        onClick={() => setIsOpen(!isOpen)}
        cursor="pointer"
        p={4}
      >
        {faq.title}
      </Heading>
      {isOpen && (
        <Box p={4}>
          <ContentfulRichText
            json={faq.answer.json}
            h1Size="xl"
          />
        </Box>
      )}
    </Box>
  );
}
