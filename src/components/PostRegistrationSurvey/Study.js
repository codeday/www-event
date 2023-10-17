import Likert from './QuestionTypes/Likert';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/[^\w]+/g, '');
}

const likertStatements = [];

const Study = likertStatements.map((s) => ({
  type: Likert,
  i18nKey: 'likert',
  study: true,
  key: `study.${camelize(s)}`,
  props: {
    statement: s,
  },
}));

export default Study;
