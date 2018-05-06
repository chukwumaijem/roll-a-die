# Roll A Die
[![npm package](https://img.shields.io/npm/v/roll-a-die.svg?style=flat-square)](https://www.npmjs.org/package/roll-a-die)

[![Build Status]
(https://img.shields.io/travis/chukwumaijem/roll-a-die.svg?style=flat-square)](https://travis-ci.org/chukwumaijem/roll-a-die)


Simple 3D dice roll animator by CSS3 Animation.


## With npm (and CommonJS builder)
Install with npm.
```
$ npm install --save roll-a-die
```

Copy `dice3d.css` and `nc93322.mp3` in to your public directory.

Load styles in `<head></head>`.
```
<link rel="stylesheet" href="path/to/roll-a-die.css">
```


Load sound at top of `<body></body>` and set id to `roll-a-die-sound`.
```
<audio id="dice3d-sound" src="path/to/nc93322.mp3"></audio>
```

You can animate dice rolling.
```
const rollDice = require('roll-a-die');

rollDice(6, 2, callback);
```

## Docs
```
function rollDice(faces, pips, callback);
```

* `faces`: Number of faces. `6` only.
* `pips`: Number of pips on the dice top. Pips can be generated with `Math.random()`
* `callback`: Called when animation is finished.

## Thanks
* (Sound Effect)
   * http://commons.nicovideo.jp/material/nc93322

## License
MIT License