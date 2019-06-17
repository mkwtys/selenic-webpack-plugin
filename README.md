[![Build Status](https://travis-ci.com/mkwtys/selenic-webpack-plugin.svg?branch=master)](https://travis-ci.com/mkwtys/selenic-webpack-plugin)
[![codecov](https://codecov.io/gh/mkwtys/selenic-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/selenic-webpack-plugin)
[![npm version](https://badge.fury.io/js/%40selenic%2Fwebpack-plugin.svg)](https://badge.fury.io/js/%40selenic%2Fwebpack-plugin)

# @selenic/webpack-plugin

`@selenic/webpack-plugin` is add license header to your bundle as follows.

```js
/**
 * @license
 *
 * @selenic/webpack-plugin:
 *   version: 0.6.0
 *   license: MIT
 *   author: mkwtys <mkwtys@gmail.com>
 *
 * @selenic/core:
 *   version: 0.7.0
 *   license: MIT
 *   author: mkwtys <mkwtys@gmail.com>
 *   homepage: https://github.com/mkwtys/selenic
 *
 * find-up:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/find-up#readme
 *
 * locate-path:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/locate-path#readme
 *
 * p-limit:
 *   version: 2.2.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/p-limit#readme
 *
 * p-locate:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/p-locate#readme
 *
 * p-try:
 *   version: 2.2.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/p-try#readme
 *
 * path-browserify:
 *   version: 0.0.1
 *   license: MIT
 *   author: James Halliday <mail@substack.net>
 *   homepage: https://github.com/substack/path-browserify
 *
 * path-exists:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/path-exists#readme
 *
 * pkg-up:
 *   version: 3.1.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/pkg-up#readme
 *
 * process:
 *   version: 0.11.10
 *   license: MIT
 *   author: Roman Shtylman <shtylman@gmail.com>
 *   homepage: https://github.com/shtylman/node-process#readme
 *
 * semver:
 *   version: 6.1.1
 *   license: ISC
 *   homepage: https://github.com/npm/node-semver#readme
 *
 * source-list-map:
 *   version: 2.0.1
 *   license: MIT
 *   author: Tobias Koppers @sokra
 *   homepage: https://github.com/webpack/source-list-map
 *
 * source-map:
 *   version: 0.6.1
 *   license: BSD-3-Clause
 *   author: Nick Fitzgerald <nfitzgerald@mozilla.com>
 *   contributors: Tobias Koppers <tobias.koppers@googlemail.com>, Duncan Beevers <duncan@dweebd.com>, Stephen Crane <scrane@mozilla.com>, Ryan Seddon <seddon.ryan@gmail.com>, Miles Elam <miles.elam@deem.com>, Mihai Bazon <mihai.bazon@gmail.com>, Michael Ficarra <github.public.email@michael.ficarra.me>, Todd Wolfson <todd@twolfson.com>, Alexander Solovyov <alexander@solovyov.net>, Felix Gnass <fgnass@gmail.com>, Conrad Irwin <conrad.irwin@gmail.com>, usrbincc <usrbincc@yahoo.com>, David Glasser <glasser@davidglasser.net>, Chase Douglas <chase@newrelic.com>, Evan Wallace <evan.exe@gmail.com>, Heather Arthur <fayearthur@gmail.com>, Hugh Kennedy <hughskennedy@gmail.com>, David Glasser <glasser@davidglasser.net>, Simon Lydell <simon.lydell@gmail.com>, Jmeas Smith <jellyes2@gmail.com>, Michael Z Goddard <mzgoddard@gmail.com>, azu <azu@users.noreply.github.com>, John Gozde <john@gozde.ca>, Adam Kirkton <akirkton@truefitinnovation.com>, Chris Montgomery <christopher.montgomery@dowjones.com>, J. Ryan Stinnett <jryans@gmail.com>, Jack Herrington <jherrington@walmartlabs.com>, Chris Truter <jeffpalentine@gmail.com>, Daniel Espeset <daniel@danielespeset.com>, Jamie Wong <jamie.lf.wong@gmail.com>, Eddy Bruël <ejpbruel@mozilla.com>, Hawken Rives <hawkrives@gmail.com>, Gilad Peleg <giladp007@gmail.com>, djchie <djchie.dev@gmail.com>, Gary Ye <garysye@gmail.com>, Nicolas Lalevée <nicolas.lalevee@hibnet.org>
 *   homepage: https://github.com/mozilla/source-map
 *
 * webpack-sources:
 *   version: 1.3.0
 *   license: MIT
 *   author: Tobias Koppers @sokra
 *   homepage: https://github.com/webpack/webpack-sources#readme
 *
 */
...
```

## Install

```sh
npm install --save-dev @selenic/webpack-plugin
```

## Usage

To use `@selenic/webpack-plugin`, you need to set the `optimize.minimize` option to `false`. If you want to minify, use the minify plugin.

webpack.config.js:

```js
import { SelenicWebpackPlugin } from '@selenic/webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'

...
plugins: [
  new TerserWebpackPlugin(options),
  new SelenicWebpackPlugin()
],
optimization: {
  minimize: false
}
...
```

## License

MIT © [mkwtys](https://github.com/mkwtys)
