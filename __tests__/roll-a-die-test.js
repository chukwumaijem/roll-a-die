'use strict';

jest.dontMock('../js/roll-a-die.js');
const element = document.createElement('div');

describe('Roll A Die', function () {
    afterEach(function () {
        Array.prototype.forEach.call(element.children, e => element.removeChild(e));
    });

    it('should animate 6 faces dice', function () {
        const rollADie = require('../js/roll-a-die.js');
        const cb = (r) => r;

        rollADie({ element, numberDice: 1, callback: cb, noSound: true });
        rollADie({ element, numberDice: 2, callback: cb, noSound: true });
        rollADie({ element, numberDice: 3, callback: cb, noSound: true });
        rollADie({ element, numberDice: 4, callback: cb, noSound: true });
        rollADie({ element, numberDice: 5, callback: cb, noSound: true });
        rollADie({ element, numberDice: 6, callback: cb, noSound: true });
    });

    it('should call callback', function () {
        const rollADie = require('../js/roll-a-die.js');

        const cb = (r) => result = r;
        let result;
        rollADie({ element, numberDice: 1, callback: cb, noSound: true });
        // expect(cb).toBeCalled();
        expect(result).toHaveLength(1);
    });
});