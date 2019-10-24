import '../less/roll-a-die.less';
import Errors from './Types';

const dieInDOM = [];
function verifyParams(options) {
  const { numberOfDice, callback, element, delay, values } = options;
  if (!element) throw new Error(Errors.MISSING_ELEMENT);
  if (!(element instanceof HTMLElement)) throw new Error(Errors.INVALID_ELEMENT);

  if (!numberOfDice) throw new Error(Errors.MISSING_NUMBER_OF_DICE);
  if (typeof numberOfDice !== 'number') throw new Error(Errors.NUMBER_OF_DICE_NUMBER);
  if (!Number.isInteger(numberOfDice))
    throw new Error(Errors.NUMBER_OF_DICE_INTEGER);

  if (!callback) throw new Error(Errors.MISSING_CALLBACK);
  if (typeof callback !== 'function') throw new Error(Errors.INVALID_CALLBACK);

  if (delay && typeof delay !== 'number') throw new Error(Errors.INVALID_DELAY_TYPE);

  if (values) {
    if (!Array.isArray(values)) throw new Error(Errors.INVALID_VALUES);
    if (values.length !== numberOfDice) throw new Error(Errors.INVALID_VALUES_LENGTH);
    values.forEach(value => {
      if (typeof value !== 'number') throw new Error(Errors.INVALID_VALUE_NUMBER(value));
      if (!Number.isInteger(value)) throw new Error(Errors.INVALID_VALUE_INTEGER(value));
    });
  }
}

function playSound(outerContainer) {
  const audio = document.createElement('audio');
  outerContainer.appendChild(audio);
  audio.src = require('./nc93322.mp3');
  audio.play();
  audio.onended = () => {
    audio.remove();
  };
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
  if (removeElement) {
    removeElement.remove();
  }
}

const rollADie = function (options) {
  const { numberOfDice, callback, element, noSound, values } = options;
  let delay = options.delay || 3000;
  if (dieInDOM.length) {
    dieInDOM.forEach(die => removeDieFromDOM(die));
    dieInDOM.length = 0; //reset the array
  }
  verifyParams(options);
  const faces = 6;
  const result = [];
  if (!noSound) {
    playSound(element);
  }

  for (let i = 0; i < numberOfDice; i++) {
    const dieFace = values ? values[i] : Math.floor(Math.random() * 6) + 1;
    result.push(dieFace);
    const angle = {
      1: [90, 0],
      2: [0, 90],
      3: [180, 0],
      4: [0, 0],
      5: [0, -90],
      6: [-90, 0],
    }[dieFace];
    const dieId = `${Math.random() * 10}-${dieFace}`;
    dieInDOM.push(dieId);
    const dice = appendDieContainers(dieId, element, angle);
    [
      [{ cx: 16, cy: 16, r: 6, fill: 'red' }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }],
      [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 16, r: 3 }, { cx: 24, cy: 16, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }]
    ].map(getFace).forEach(face => dice.appendChild(face));

    setTimeout(() => removeDieFromDOM(dieId), delay);

    if (result.length === numberOfDice && callback) {
      callback(result);
    }
  }
};

export default rollADie;
