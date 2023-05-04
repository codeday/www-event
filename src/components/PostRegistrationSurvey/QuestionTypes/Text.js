import { TextInput } from '@codeday/topo/Atom';

export default function TextQuestionType({ value, onSubmit }) {
  return (
    <TextInput
      value={value}
      onChange={(e) => onSubmit(e.target.value)}
    />
  );
}
