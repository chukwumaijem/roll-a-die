# Roll A Die
[![npm package](https://img.shields.io/npm/v/roll-a-die.svg?style=flat-square)](https://www.npmjs.org/package/roll-a-die)  [![Build Status](https://img.shields.io/travis/chukwumaijem/roll-a-die.svg?style=flat-square)](https://travis-ci.com/chukwumaijem/roll-a-die)

Simple 3D dice roll animator by CSS3 Animation.
## Vanilla JS
Copy dist/roll-a-die.js into your library folder
Load it into your HTML script
```
<script type="text/javascript" src="path/to/roll-a-die.js"></script>
```

Call the method with its options.
```
rollDice({ element, numberDice: 2, callback});
```

## With npm (and CommonJS builder)
Install with npm.
```npm install --save roll-a-die```

Call method
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