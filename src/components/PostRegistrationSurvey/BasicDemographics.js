import Checkboxes from './QuestionTypes/Checkboxes';
import Radio from './QuestionTypes/Radio';

const BasicDemographics = [
  {
    title: (name) => `Does ${name} have dietary restrictions or food allergies?`,
    key: 'dietary',
    type: Radio,
    props: {
      columns: 3,
      options: [
        { value: 'none', text: 'None' },
        { value: 'vegetarian', text: 'Vegetarian' },
      ],
      other: true,
    },
  },
  {
    title: (name) => `What are ${name}'s interests?`,
    key: 'interests',
    type: Checkboxes,
    props: {
      columns: 3,
      options: [
        { value: 'art', text: 'Art/Design' },
        { value: 'music', text: 'Music' },
        { value: 'acting', text: 'Acting' },
        { value: 'computers', text: 'Computers' },
        { value: 'business', text: 'Business/Marketing' },
        { value: 'literature', text: 'Literature' },
      ],
    },
  },
  {
    title: (name) => `How much experience does ${name} have coding? (It's ok if the answer is none!)`,
    key: 'experience',
    type: Radio,
    props: {
      columns: 1,
      options: [
        { value: 'none', text: 'None at all.' },
        { value: 'intro', text: 'I\'ve only taken an intro class.' },
        { value: 'advanced', text: 'I\'ve taken an advanced class (AP, college class, etc).' },
        { value: 'projects', text: 'I\ve coded my own projects before.' },
      ],
    },
  },
  {
    title: (name) => `What pronouns does ${name} use?`,
    key: 'pronouns',
    type: Radio,
    props: {
      columns: 4,
      options: [
        { value: 'she/her', text: 'she/her' },
        { value: 'he/him', text: 'he/him' },
        { value: 'they/them', text: 'they/them' },
      ],
      other: true,
    },
  },
  {
    title: (name) => `What does ${name} consider themself? (This is just for statistics.)`,
    key: 'ethnicity',
    type: Checkboxes,
    props: {
      columns: 3,
      options: [
        { value: 'latine', text: 'Latino/a/e/x' },
        { value: 'black', text: 'Black' },
        { value: 'white', text: 'White' },
        { value: 'asian', text: 'Asian/Indian/Pacific Islander' },
        { value: 'nativeAmerican', text: 'Native American/First Nations/Indigenous Peoples' },
        { value: 'complicated', text: 'It\'s complicated' },
      ],
    },
  },
];

export default BasicDemographics;
