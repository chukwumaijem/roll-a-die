# Roll A Die

[![npm package](https://img.shields.io/npm/v/roll-a-die.svg?style=flat-square)](https://www.npmjs.org/package/roll-a-die) ![](https://github.com/chukwumaijem/roll-a-die/workflows/NPM%20Test/badge.svg) ![](https://github.com/chukwumaijem/roll-a-die/workflows/NPM%20Publish/badge.svg)

Simple 3D dice roll animator by CSS3 Animation.

[Demo](https://codepen.io/chukwuma-ezumezu/pen/qYKOGW)

## Vanilla JS

Copy dist/roll-a-die.js into your library folder
Load it into your HTML script

```
<script type="text/javascript" src="path/to/roll-a-die.js"></script>
```

You can use the [UNPKG](https://unpkg.com) link `https://unpkg.com/roll-a-die@1.3.0/dist/roll-a-die.js`. Remember to update the package number to the most recent.

Call the method with its options.

```
rollADie({ element, numberOfDice: 2, callback});
```

## With npm (and CommonJS builder)

Install with npm.

```
npm install --save roll-a-die
```

Install with yarn.

```
yarn add roll-a-die
```

import the library

ES5

```
const rollADie = require('roll-a-die');
```

ES6

```
import rollADie from 'roll-a-die';
```

Call the method

```
rollADie({ element, numberOfDice: 2, callback });
rollADie({ element, numberOfDice: 2, callback, soundVolume: 1 });
rollADie({ element, numberOfDice: 2, callback, delay: 1000 });
rollADie({ element, numberOfDice: 2, callback, values: [3, 4] });
```

## Parameter Definitions

- `element`: The element to render die animation on. Type: HTMLElement
- `numberOfDice`: The number of dice to use.` Type: number
- `callback`: Called when animation is finished. Returns an array of the values from throw. Type: Function
- `soundVolume`: Set volume of audio between 0 and 1. (Optional) Defaults to 1. Type: number
- `delay`: Time in milliseconds to delay before removing animations (Optional). Type: number
- `values`: Values to show on die face. When provided, it overrides library genrated values. (Optional). Type: Array of numbers

## Thanks

- (Sound Effect)
  - http://commons.nicovideo.jp/material/nc93322

## License

MIT License
