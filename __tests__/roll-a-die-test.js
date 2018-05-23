'use strict';

jest.dontMock('../js/roll-a-die.js');
import rollADie from '../js/roll-a-die';

const element = document.createElement('div');

describe('Roll A Die', function () {
  afterEach(function () {
    Array.prototype.forEach.call(element.children, e => element.removeChild(e));
  });

  it('should roll a die successfully.', function () {
    const cb = (r) => r;
    rollADie({ element, numberOfDice: 1, callback: cb, noSound: true });
    rollADie({ element, numberOfDice: 2, callback: cb, noSound: true });
  });

  it('should call callback.', function () {
    let result;
    const cb = (r) => result = r;
    rollADie({ element, numberOfDice: 1, callback: cb, noSound: true });
    expect(result).toHaveLength(1);
  });

  it('should use given values.', function () {
    let result;
    const cb = (r) => result = r;
    rollADie({
      element,
      numberOfDice: 2,
      callback: cb,
      noSound: true,
      values: [4, 6],
    });
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(4);
    expect(result[1]).toBe(6);
  });
});

describe('Verify Params', () => {
  afterEach(function () {
    Array.prototype.forEach.call(element.children, e => element.removeChild(e));
  });
  const cb = (r) => result = r;
  const defaultOption = {
    element,
    numberOfDice: 2,
    callback: cb,
    noSound: true,
    values: [4, 6],
  };
  test('should throw on missing element.', () => {
    const options = Object.assign({}, defaultOption, { element: null });
    expect(() => rollADie(options))
      .toThrow('Element to render dice animation not specified.');
  });
  test('should throw on invalid element type.', () => {
    const options = Object.assign({}, defaultOption, { element: 'Hello World!' });
    expect(() => rollADie(options)).toThrow('"element" must be a HTMLElement');
  });
})