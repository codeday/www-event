import Likert from './QuestionTypes/Likert';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/[^\w]+/g, '');
}

const likertStatements = [
  'I am comfortable with learning computing concepts.',
  'I have little self-confidence when it comes to computing courses.',
  'I can learn to understand computing concepts.',
  'I can achieve good grades (C or better) in computing courses.',
  'I am confident that I can solve problems by using computer applications.',
  'I doubt that I can solve problems by using computer applications.',
  'I am not comfortable with learning computing concepts.',
  'I would not take additional computer science courses if I were given the opportunity.',
  'I think computer science is boring.',
  'I hope that my future career will require the use of computer science concepts.',
  'The challenge of solving problems using computer science does not appeal to me.',
  'I like to use computer science to solve problems.',
  'I do not like using computer science to solve problems.',
  'I hope that I can find a career that does not require the use of computer science concepts.',
  'I think computer science is interesting.',
  'I would voluntarily take additional computer science courses if I were given the opportunity.',
  'I doubt that a woman could excel in computing courses.',
  'Men are more capable than women at solving computing problems.',
  'Computing is an appropriate subject for both men and women to study.',
  'It is not appropriate for women to study computing.',
  'Men are more likely to excel in careers that involve computing than women are.',
  'Women produce the same quality work in computing as men.',
  'Men and women are equally capable of solving computing problems.',
  'Men and women can both excel in computing courses.',
  'Women and men can both excel in careers that involve computing.',
  'A student who performs well in computer science will probably not have a life outside of computers.',
  'A student who performs well in computer science is likely to have a life outside of computers.',
  'Students who are skilled at computer science are less popular than other students.',
  'I am active in organizations or social groups that include mostly members of my own ethnic group.',
  'I feel a strong attachment towards my own ethnic group.',
  'I was encouraged to pursue a computer science degree.',
  'Developing computing skills will not play a role in helping me achieve my career goals.',
  'Knowledge of computing will allow me to secure a good job.',
  'Developing computing skills will be important to my career goals.',
  'Knowledge of computing skills will not help me secure a good job.',
  'I expect that learning to use computing skills will help me achieve my career goals.',
];

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
