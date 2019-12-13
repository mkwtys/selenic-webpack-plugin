[![Actions Status](https://github.com/mkwtys/selenic/workflows/Node%20CI/badge.svg)](https://github.com/mkwtys/selenic-webpack-plugin/actions?query=workflow%3A%22Node+CI%22)
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
 *   version: 0.9.0
 *   license: MIT
 *   author: mkwtys <mkwtys@gmail.com>
 *   homepage: https://github.com/mkwtys/selenic
 *
 * base64-js:
 *   version: 1.3.1
 *   license: MIT
 *   author: T. Jameson Little <t.jameson.little@gmail.com>
 *   homepage: https://github.com/beatgammit/base64-js
 *
 * buffer:
 *   version: 4.9.1
 *   license: MIT
 *   author: Feross Aboukhadijeh <feross@feross.org>
 *   contributors: Romain Beauxis <toots@rastageeks.org>, James Halliday <mail@substack.net>
 *   homepage: https://github.com/feross/buffer
 *
 * find-up:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/find-up
 *
 * ieee754:
 *   version: 1.1.13
 *   license: BSD-3-Clause
 *   author: Feross Aboukhadijeh <feross@feross.org>
 *   contributors: Romain Beauxis <toots@rastageeks.org>
 *   homepage: https://github.com/feross/ieee754
 *
 * isarray:
 *   version: 1.0.0
 *   license: MIT
 *   author: Julian Gruber <mail@juliangruber.com>
 *   homepage: https://github.com/juliangruber/isarray
 *
 * locate-path:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/locate-path
 *
 * p-limit:
 *   version: 2.2.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/p-limit
 *
 * p-locate:
 *   version: 3.0.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/p-locate
 *
 * p-try:
 *   version: 2.2.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/p-try
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
 *   homepage: https://github.com/sindresorhus/path-exists
 *
 * pkg-up:
 *   version: 3.1.0
 *   license: MIT
 *   author: Sindre Sorhus <sindresorhus@gmail.com>
 *   homepage: https://github.com/sindresorhus/pkg-up
 *
 * process:
 *   version: 0.11.10
 *   license: MIT
 *   author: Roman Shtylman <shtylman@gmail.com>
 *   homepage: https://github.com/shtylman/node-process
 *
 * punycode:
 *   version: 1.4.1
 *   license: MIT
 *   author: Mathias Bynens
 *   contributors: Mathias Bynens, John-David Dalton
 *   homepage: https://mths.be/punycode
 *
 * querystring-es3:
 *   version: 0.2.1
 *   license: MIT
 *   author: Irakli Gozalishvili <rfobic@gmail.com>
 *   homepage: https://github.com/mike-spainhower/querystring
 *
 * semver:
 *   version: 6.3.0
 *   license: ISC
 *   homepage: https://github.com/npm/node-semver
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
 * url:
 *   version: 0.11.0
 *   license: MIT
 *   homepage: https://github.com/defunctzombie/node-url
 *
 * webpack:
 *   version: 4.41.2
 *   license: MIT
 *   author: Tobias Koppers @sokra
 *   homepage: https://github.com/webpack/webpack
 *
 * webpack-sources:
 *   version: 1.4.3
 *   license: MIT
 *   author: Tobias Koppers @sokra
 *   homepage: https://github.com/webpack/webpack-sources
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
