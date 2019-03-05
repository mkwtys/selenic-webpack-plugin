import assert from 'assert'
import extractComments from 'extract-comments'
import MemoryFS from 'memory-fs'
import path from 'path'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
import { SelenicWebpackPlugin } from '../'

describe('Plugin', () => {
  it('need apply method', () => {
    assert(typeof new SelenicWebpackPlugin().apply === 'function')
  })

  describe('fixtures', () => {
    function fixtureTest(fixtureName: string) {
      const webpackConfig = {
        mode: 'production' as 'production',
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
          new SelenicWebpackPlugin()
        ],
        optimization: {
          minimize: false
        }
      }

      it(`minimal config: ${fixtureName}`, done => {
        const compiler = webpack(webpackConfig)
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

      it(`splitChunks: ${fixtureName}`, done => {
        const compiler = webpack({
          ...webpackConfig,
          optimization: {
            ...webpackConfig.optimization,
            splitChunks: {
              cacheGroups: {
                lib: {
                  test: /node_modules/,
                  name: 'lib',
                  chunks: 'initial',
                  enforce: true
                }
              }
            }
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
    fixtureTest('multi-versions')
  })
})
