import { useState } from 'react';
import {
  Box,
  Heading,
  TextInput,
  FormLabel,
  Textarea,
  Select,
  Grid,
  Link,
  Text,
  Button,
} from '@codeday/topo/Atom';
import { useColorMode } from '@chakra-ui/react';
import { apiFetch, useToasts } from '@codeday/topo/utils';
import { print } from 'graphql';
import { ApplyForWorkshopMutation } from './ApplyForWorkshop.gql';

export default function ApplyForWorkshop({ event, alwaysOpen, ...props }) {
  const { success, error } = useToasts();
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(!!alwaysOpen);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isReady = firstName && lastName && email && bio && description;
  const bg = colorMode === 'light' ? 'gray.50' : 'gray.900';

  if (!event) return <></>;
  if (!isOpen) return <Box {...props}><Link color="current.textLight" onClick={() => setIsOpen(true)}>Want to host a workshop?</Link></Box>;

  return (
    <Box {...props} bg={bg} mt={8} mb={8} p={4} rounded="sm" borderWidth={1}>
      <Heading as="h4" fontSize="2xl" mb={2}>Want to host a workshop?</Heading>
      <Text mb={6}>
        Your workshop can be about technology, art, music, or anything else that interests you.
        {' '}<strong>Students are encouraged to submit. (You don't have to be an expert!)</strong>
      </Text>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
        <Box w="100%">
          <FormLabel mb={0}>First Name</FormLabel>
          <TextInput value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        </Box>
        <Box w="100%">
          <FormLabel mb={0}>Last Name</FormLabel>
          <TextInput value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        </Box>
      </Grid>
      <Box mb={4}>
        <FormLabel mb={0}>Email</FormLabel>
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </Box>
      <Box mb={4}>
        <FormLabel mb={0}>I am a...</FormLabel>
        <Select onChange={(e) => setBio(e.target.value)}>
          <option />
          <option>student attending CodeDay</option>
          <option>former CodeDay student</option>
          <option>company representative</option>
          <option>other industry professional</option>
          <option>parent of a CodeDay student</option>
          <option>other</option>
        </Select>
      </Box>
      <Box mb={4}>
        <FormLabel mb={0}>What do you want your workshop to be about?</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief Description" />
      </Box>
      <Button
        isLoading={isLoading}
        isDisabled={!isReady}
        onClick={async () => {
          setIsLoading(true);
          try {
            await apiFetch(print(ApplyForWorkshopMutation), {
              eventId: event.id,
              firstName,
              lastName,
              email,
              bio,
              description,
            });
            setDescription('');
            success(`Submitted! We'll get back to you by email as soon as we can.`);
          } catch (ex) { error(ex.toString()); console.error(ex); }
          setIsLoading(false);
        }}
      >
        {isReady ? 'Submit' : '(fill all required fields)'}
      </Button>
    </Box>
  );
}
