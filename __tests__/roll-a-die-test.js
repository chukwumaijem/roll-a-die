'use strict';

jest.dontMock('../js/roll-a-die.js');
import rollADie from '../js/roll-a-die';

const element = document.createElement('div');

describe('Roll A Die', function () {
    afterEach(function () {
        Array.prototype.forEach.call(element.children, e => element.removeChild(e));
    });

    it('should animate 6 faces dice', function () {
        const cb = (r) => r;
        rollADie({ element, numberOfDice: 1, callback: cb, noSound: true });
        rollADie({ element, numberOfDice: 2, callback: cb, noSound: true });
        rollADie({ element, numberOfDice: 3, callback: cb, noSound: true });
        rollADie({ element, numberOfDice: 4, callback: cb, noSound: true });
        rollADie({ element, numberOfDice: 5, callback: cb, noSound: true });
        rollADie({ element, numberOfDice: 6, callback: cb, noSound: true });
    });

    it('should call callback', function () {
        let result;
        const cb = (r) => result = r;
        rollADie({ element, numberOfDice: 1, callback: cb, noSound: true });
        expect(result).toHaveLength(1);
    });
});