'use strict';

var table;
var initialized = false;

var initialize = function() {
    table = document.createElement('div');
    table.id = 'dice3d-table';
    document.body.appendChild(table);

    initialized = true;
};

var played = false;

var dice3d = function(faces, n, callback) {
    if (!initialized) initialize();

    if (faces == 6) {
        var sound = document.getElementById('dice3d-sound');

        if (!played || sound.ended) {
            played = true;
            sound.play();
        } else {
            var audio = document.createElement('audio');
            audio.src = sound.src;
            audio.volume = sound.volume;
            setTimeout(function() {
                audio.play();
            }, Math.random() * 500);
        }

        var angle = {
            1: [90, 0],
            2: [0, 90],
            3: [180, 0],
            4: [0, 0],
            5: [0, -90],
            6: [-90, 0],
        }[n];
        var outer = document.createElement('div');
        outer.className = 'dice3d-outer';
        table.appendChild(outer);

        var dice = document.createElement('div');
        dice.className = 'dice3d';
        dice.style.transform = `rotateX(${angle[0]}deg) rotateZ(${angle[1]}deg)`;
        outer.appendChild(dice);

        var getFace = function(pips) {
            const XMLNS = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(XMLNS, 'svg');
            svg.setAttribute('class', 'dice3d-face');
            svg.setAttribute('width', 32);
            svg.setAttribute('height', 32);

            pips.map(function(pip) {
                var circle = document.createElementNS(XMLNS, 'circle');
                Object.keys(pip).forEach(key => circle.setAttribute(key, pip[key]));
                return circle;
            }).forEach(circle => svg.appendChild(circle));

            return svg;
        };

        [
            [{ cx: 16, cy: 16, r: 6, fill: 'red' }],
            [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }],
            [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }],
            [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
            [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
            [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 16, r: 3 }, { cx: 24, cy: 16, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
        ].map(getFace).forEach(face => dice.appendChild(face));


        setTimeout(function () {
            outer.addEventListener('transitionend', function(e) {
                table.removeChild(this);
                if (callback) {
                    callback();
                }
            });
            outer.style.opacity = 0;;
        }, 3 * 1000);
    } else {
        console.error('Unsupported number of faces: ' + faces);
    }
};

module.exports = dice3d;
