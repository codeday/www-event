import { Box } from '@codeday/topo/Atom';

export default function Highlight({ children, ...props }) {
  return <Box as="span" d="inline" color="red.600" {...props}>{children}</Box>;
}
