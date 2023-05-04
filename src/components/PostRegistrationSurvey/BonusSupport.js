import YesNo from './QuestionTypes/YesNo';

export const Laptop = {
  key: 'laptop',
  type: YesNo,
};

export const Uber = {
  key: 'uber',
  type: YesNo,
  props: {
    collect: 'Provide your full phone number (with area code) AND full address (including city, state, and postal code)',
    collectIf: 'yes',
    collectValidate: (text) => (text.length < 30 ? 'Please provide your phone number AND address.' : null),
  },
};
