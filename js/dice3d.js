'use strict';

var table;
var initialized = false;

var initialize = function (element) {
  if (!element) {
    table = document.createElement('div');
    table.id = 'dice3d-table';
    document.body.appendChild(table);
  } else {
    table = element;
  }
  initialized = true;
};

var played = false;

var dice3d = function (options) {
  const faces = 6;
  const { n, callback, element } = options;
  if (!initialized) initialize(element);
  const result = [];
  for (let i = 0; i < n; i++) {
    var sound = document.getElementById('dice3d-sound');
    const face = Math.floor(Math.random() * 6) + 1;
    result.push(face);

    if (!played || sound.ended) {
      played = true;
      sound.play();
    } else {
      var audio = document.createElement('audio');
      audio.src = sound.src;
      audio.volume = sound.volume;
      setTimeout(function () {
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
    }[face];
    var outer = document.createElement('div');
    outer.className = 'dice3d-outer';
    outer.id = `${i}-${face}`;
    table.appendChild(outer);

    var dice = document.createElement('div');
    dice.className = 'dice3d';
    dice.style.transform = `rotateX(${angle[0]}deg) rotateZ(${angle[1]}deg)`;
    outer.appendChild(dice);

    var getFace = function (pips) {
      const XMLNS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(XMLNS, 'svg');
      svg.setAttribute('class', 'dice3d-face');
      svg.setAttribute('width', 32);
      svg.setAttribute('height', 32);

      pips.map(function (pip) {
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
      // outer.style.opacity = 0;;
      const removeElement = document.getElementById(`${i}-${face}`);
      removeElement.remove();
    }, 3 * 1000);
  }
  if (callback) {
    callback(result);
  }
};

module.exports = dice3d;
