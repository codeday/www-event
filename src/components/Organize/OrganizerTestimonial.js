import {
  Box, Grid, Text, Image,
} from '@codeday/topo/Atom';

export default function OrganizerTestimonial({ post, ...props }) {
  return (
    <Box
      as="a"
      href={`https://www.codeday.org/blog/${post.slug}`}
      target="_blank"
      _hover={{ textDecoration: 'underline' }}
      {...props}
    >
      <Grid templateColumns="auto 1fr" gap={4} alignItems="flex-start">
        <Image maxW={32} src={post.authorAccount?.picture} alt="" rounded="sm" />
        <Box>
          <Text pl={4} mb={4}>{post.previewText}</Text>
          <Box ml={4}>
            <Text fontSize="2xl" fontFamily="'La Belle Aurore', cursive">{post.authorAccount?.name}</Text>
            <Text mt={-2} fontSize="sm">{post.authorAccount?.title}</Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
