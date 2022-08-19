import { Grid } from '@codeday/topo/Atom';
import { shuffle } from '../PastProjects';
import OrganizerTestimonial from './OrganizerTestimonial';

export default function OrganizerTestimonials({ query, random, ...props }) {
  return (
    <Grid
      templateColumns={{ base: '1fr' }}
      gap={12}
      {...props}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=La+Belle+Aurore&display=swap" rel="stylesheet" />
      {shuffle(random, query.blog.posts.nodes).filter(Boolean).slice(0, 2).map((post) => (
        <OrganizerTestimonial key={post.id} post={post} />
      ))}
    </Grid>
  );
}
