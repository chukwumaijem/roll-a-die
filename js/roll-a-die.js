'use strict';

function verifyParams(options) {
  const { numberDice, callback, element } = options;
  if (!element) throw new Error('Element to render dice animation not specified.');
  if (!numberDice) throw new Error('Number of dice to use not specified.');
  if (!callback) throw new Error('Provide a callback function to recieve dice values.');
}

function playSound(outerContainer) {
  let played;
  const audio = document.createElement('audio');
  outerContainer.appendChild(audio);
  audio.src = '../dist/nc93322.mp3';
  played = true;
  audio.play();
}

function getFace(pips) {
  const XMLNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(XMLNS, 'svg');
  svg.setAttribute('class', 'dice-face');
  svg.setAttribute('width', 32);
  svg.setAttribute('height', 32);

  pips.map(function (pip) {
    const circle = document.createElementNS(XMLNS, 'circle');
    Object.keys(pip).forEach(key => circle.setAttribute(key, pip[key]));
    return circle;
  }).forEach(circle => svg.appendChild(circle));

  return svg;
};

function appendDieContainers(dieId, element, angle) {
  const outer = document.createElement('div');
  outer.className = 'dice-outer';
  outer.id = dieId;
  element.appendChild(outer);

  const dice = document.createElement('div');
  dice.className = 'dice';
  dice.style.transform = `rotateX(${angle[0]}deg) rotateZ(${angle[1]}deg)`;
  outer.appendChild(dice);
  return dice;
}

function removeDieFromDOM(dieId) {
  const removeElement = document.getElementById(dieId);
  removeElement.remove();
}

const rollADie = function (options) {
  const { numberDice, callback, element, noSound } = options;
  verifyParams(options);
  const faces = 6;
  const result = [];
  if (!noSound) {
    playSound(element);
  }

  for (let i = 0; i < numberDice; i++) {
    const dieFace = Math.floor(Math.random() * 6) + 1;
    result.push(dieFace);
    const angle = {
      1: [90, 0],
      2: [0, 90],
      3: [180, 0],
      4: [0, 0],
      5: [0, -90],
      6: [-90, 0],
    }[dieFace];
    const dieId = `${i}-${dieFace}`;
    const dice = appendDieContainers(dieId, element, angle);
    [
      [{ cx: 16, cy: 16, r: 6, fill: 'red' }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 16, r: 3 }, { cx: 24, cy: 16, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }]
    ].map(getFace).forEach(face => dice.appendChild(face));
    //Todo: Remove existing dice elements before appending new ones. In cases where user calls rollDice in quick succesion
    setTimeout(() => removeDieFromDOM(dieId), 3000);
  }
  if (callback) {
    callback(result);
  }
};

module.exports = rollADie;
