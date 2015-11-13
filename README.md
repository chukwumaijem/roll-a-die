# dice3d [![Build Status](https://travis-ci.org/ukatama/dice3d.svg)](https://travis-ci.org/ukatama/dice3d)

Simple 3D dice roll animator by CSS3 Animation.

## With bower
install
```
$ bower install dice3d
```

Load styles in `<head></head>`
```
<link rel="stylesheet" href="bower_components/dice3d/dice3d.css">
```

Load sound at top of `<body></body>`.
```
<audio src="bower_components/dice3d/nc93322.mp3"></audio>
```

Load script at end of `<body></body>`.
```
<script type="text/javascript" src="bower_components/dice3d/dice3d.js"></script>
```

You can animate dice rolling by globaly defined function `dice3d()`.
```
dice3d(6, 1, callback);
```

## With npm (and CommonJS builder)
Install with npm.
```
$ npm install --save dice3d
```

Copy `dice3d.css` and `nc93322.mp3` in to your public directory.

Load styles in `<head></head>`.
```
<link rel="stylesheet" href="path/to/dice3d.css">
```

Load sound at top of `<body></body>`.
```
<audio src="path/to/nc93322.mp3"></audio>
```

You can animate dice rolling.
```
var dice3d = require('dice3d');

dice3d(6, 2, callback);
```

## Docs
```
function dice3d(faces, pips, callback);
```

* `faces`: Number of faces. `6` only.
* `pips`: Number of pips on the dice top.
* `callback`: Called when animation is finished.

## Thanks
* `[サイコロ] 1D6 [SE]` (Sound Effect)
   * http://commons.nicovideo.jp/material/nc93322

## License
MIT License

## Bug, Issue, Pull Request
[Open issue](https://github.com/ukatama/dice3d/issues) in English or Japanese.

## Example
`dice.html`

![Press a button](https://raw.github.com/ukatama/cssdice/master/img/ss01.png)
![Dice rolling](https://raw.github.com/ukatama/cssdice/master/img/ss02.png)
![Result](https://raw.github.com/ukatama/cssdice/master/img/ss03.png)
