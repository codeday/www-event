import {
  Box, Grid, Text, Image,
} from '@codeday/topo/Atom';

export default function OrganizerTestimonial({ post, ...props }) {
  return (
    <Box
      as="a"
      href={`https://blog.codeday.org/${post.slug}`}
      target="_blank"
      _hover={{ textDecoration: 'underline' }}
      {...props}
    >
      <Grid templateColumns="auto 1fr" gap={4} alignItems="flex-start">
          <Image maxW={32} src={post.author.picture} alt="" rounded="sm" />
        <Box>
          <Text
            pl={4}
            mb={4}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <Box ml={4}>
            <Text fontSize="2xl" fontFamily="'La Belle Aurore', cursive">{post.author.name}</Text>
            <Text mt={-2} fontSize="sm">{post.author.title}</Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
