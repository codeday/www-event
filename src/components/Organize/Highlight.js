import { Box } from '@codeday/topo/Atom';

export default function Highlight({ children, ...props }) {
  return <Box as="span" display="inline" color="red.600" {...props}>{children}</Box>;
}
