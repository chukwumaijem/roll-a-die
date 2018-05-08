# Roll A Die
[![npm package](https://img.shields.io/npm/v/roll-a-die.svg?style=flat-square)](https://www.npmjs.org/package/roll-a-die)  [![Build Status](https://img.shields.io/travis/chukwumaijem/roll-a-die.svg?style=flat-square)](https://travis-ci.com/chukwumaijem/roll-a-die)

Simple 3D dice roll animator by CSS3 Animation.
## With bower
install

$ bower install roll-a-die
Load styles in <head></head>
```
<link rel="stylesheet" href="bower_components/roll-a-die/dist/roll-a-die.css">
```
Load script at end of <body></body>.
```
<script type="text/javascript" src="bower_components/roll-a-die/dist/roll-a-die.js"></script>
```

You can animate dice rolling by globaly defined function rollADie().

rollDice({ element, numberDice: 2, callback});

## With npm (and CommonJS builder)
Install with npm.
```npm install --save roll-a-die```

Copy `roll-a-die.css` into your public directory.

Load styles in `<head></head>`.
```<link rel="stylesheet" href="path/to/roll-a-die.css">```

You can animate dice rolling.
```
const rollDice = require('roll-a-die');
rollDice({ element, numberDice: 2, callback});
rollDice({ element, numberDice: 2, callback, noSound: true});
```

## Definitions

* `element`: The element to render die animation on.
* `numberDice`: The number of dice to use.`
* `callback`: Called when animation is finished. Returns an array of the values from throw.
* `noSound`: Roll the die without sound.

## Thanks
* (Sound Effect)
   * http://commons.nicovideo.jp/material/nc93322

## License
MIT License