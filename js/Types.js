const ErrorTypes = {
  MISSING_ELEMENT: 'HTMLElement to render dice animation not specified.',
  INVALID_ELEMENT: '"element" must be a HTMLElement.',
  MISSING_NUMBER_OF_DICE: 'Number of dice to use not specified.',
  NUMBER_OF_DICE_NUMBER: '"numberOfDice" must be a number.',
  NUMBER_OF_DICE_INTEGER: '"numberOfDice" must be an integer.',
  MISSING_CALLBACK: 'Provide a callback function to recieve dice values.',
  INVALID_CALLBACK: '"callback" must be a function.',
  INVALID_DELAY_TYPE: 'Time is seconds. "delay" must be a number.',
  INVALID_VALUES: 'Values to generate. "values" must be an array of numbers.',
  INVALID_VALUES_LENGTH: 'The length of "values" must be equal to the numberOfDice.',
  INVALID_SOUND_VOLUME: 'Sound volume must be a number between 0 - 1',
  INVALID_VALUE_NUMBER: (value) => `${value} in "values" must be a number.`,
  INVALID_VALUE_INTEGER: (value) => `${value} in "values" must be an integer.`,
};

export default ErrorTypes;
