'use strict';

jest.dontMock('../js/dice3d.js');

describe('dice3d', function() {
    afterEach(function() {
        var table = document.getElementById('dice3d-table');
        Array.prototype.forEach.call(table.children, e => table.removeChild(e));
    });
    
    document.body.appendChild(document.createElement('audio'))
        .id = 'dice3d-sound';

    it('should animate 6 faces dice', function() {
        var dice3d = require('../js/dice3d.js');

        dice3d(6, 1);
        dice3d(6, 2);
        dice3d(6, 3);
        dice3d(6, 4);
        dice3d(6, 5);
        dice3d(6, 6);
    });

    it('should call callback', function() {
        var dice3d = require('../js/dice3d.js');

        var callback = jest.genMockFunction();
        dice3d(6, 1, callback);

        expect(callback).not.toBeCalled();

        jest.runAllTimers();

        var e = new Event('transitionend');
        Array.prototype.forEach.call(document.getElementsByClassName('dice3d-outer'), outer => outer.dispatchEvent(e));

        expect(callback).toBeCalled();
    });
});
