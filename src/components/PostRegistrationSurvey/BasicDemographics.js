import Checkboxes from './QuestionTypes/Checkboxes';
import Radio from './QuestionTypes/Radio';

const BasicDemographics = [
  {
    key: 'dietary',
    type: Radio,
    props: {
      columns: 3,
      options: ['none', 'vegetarian'],
      other: true,
    },
  },
  {
    key: 'interests',
    type: Checkboxes,
    props: {
      columns: 3,
      options: ['art', 'music', 'acting', 'computers', 'business', 'literature'],
    },
  },
  {
    key: 'experience',
    type: Radio,
    props: {
      columns: 1,
      options: ['none', 'intro', 'advanced', 'projects'],
    },
  },
  {
    key: 'pronouns',
    type: Radio,
    props: {
      columns: 4,
      options: ['she/her', 'he/him', 'they/them'],
      other: true,
    },
  },
  {
    key: 'ethnicity',
    type: Checkboxes,
    props: {
      columns: 3,
      options: ['latine', 'black', 'white', 'asian', 'nativeAmerican', 'complicated'],
    },
  },
];

export default BasicDemographics;
