import assert from 'assert'
import extractComments from 'extract-comments'
import MemoryFS from 'memory-fs'
import path from 'path'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
import Plugin from '../'

describe('Plugin', () => {
  it('need apply method', () => {
    assert(typeof new Plugin().apply === 'function')
  })

  function fixtureTest(fixtureName: string) {
    it(`fixtures: ${fixtureName}`, done => {
      const compiler = webpack({
        mode: 'production',
        entry: {
          index: path.resolve(__dirname, `fixtures/${fixtureName}/src`)
        },
        output: {
          path: path.resolve(__dirname, `fixtures/${fixtureName}/dist`),
          filename: '[name].js'
        },
        plugins: [
          new TerserWebpackPlugin({
            terserOptions: {
              compress: {
                dead_code: true,
                unused: true,
                warnings: true
              },
              output: {
                comments: false
              },
              sourceMap: false
            }
          }),
          new Plugin()
        ],
        optimization: {
          minimize: false
        }
      })
      compiler.outputFileSystem = new MemoryFS()
      compiler.run((err, stats) => {
        const compiled = stats.compilation.assets['index.js']
          ? stats.compilation.assets['index.js'].source()
          : ''
        const comments = extractComments(compiled)
        const licenseHeader = comments.length ? `${comments[0].raw}` : ''
        expect(licenseHeader).toMatchSnapshot()
        done()
      })
    })
  }

  fixtureTest('minimal')
  fixtureTest('private')
  fixtureTest('deps')
})
