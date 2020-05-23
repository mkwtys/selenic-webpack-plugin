import assert from 'assert'
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
          index: path.resolve(__dirname, `fixtures/${fixtureName}/src`),
        },
        output: {
          path: path.resolve(__dirname, `fixtures/${fixtureName}/dist`),
          filename: '[name].js',
        },
        plugins: [
          new TerserWebpackPlugin({
            terserOptions: {
              compress: {
                dead_code: true,
                unused: true,
                warnings: true,
              },
              output: {
                comments: false,
              },
              sourceMap: false,
            },
          }),
          new SelenicWebpackPlugin(),
        ],
        optimization: {
          minimize: false,
        },
      }

      function compile(config) {
        return new Promise<{
          licenseHeader?: string
          chunkLicenseHeader?: string
        }>((resolve, reject) => {
          const compiler = webpack(config)
          compiler.outputFileSystem = new MemoryFS()
          compiler.run((err, stats) => {
            if (err) {
              reject()
            }
            const compiled = stats.compilation.assets['index.js'] ? stats.compilation.assets['index.js'].source() : ''
            const comments = compiled.match(/\/\*([\S\s]*?)\*\//gm)
            const licenseHeader = comments && comments[0] ? comments[0] : ''
            const chunk = stats.compilation.assets['lib.js'] ? stats.compilation.assets['lib.js'].source() : ''
            const chunkComments = chunk.match(/\/\*([\S\s]*?)\*\//gm)
            const chunkLicenseHeader = chunkComments && chunkComments[0] ? chunkComments[0] : ''
            resolve({ licenseHeader, chunkLicenseHeader })
          })
        })
      }

      it(`minimal config: ${fixtureName}`, async () => {
        const { licenseHeader } = await compile(webpackConfig)
        expect(licenseHeader).toMatchSnapshot()
      })

      it(`splitChunks: ${fixtureName}`, async () => {
        const { licenseHeader, chunkLicenseHeader } = await compile({
          ...webpackConfig,
          optimization: {
            ...webpackConfig.optimization,
            splitChunks: {
              cacheGroups: {
                lib: {
                  test: /node_modules/,
                  name: 'lib',
                  chunks: 'initial',
                  enforce: true,
                },
              },
            },
          },
        })
        expect(licenseHeader).toMatchSnapshot()
        expect(chunkLicenseHeader).toMatchSnapshot()
      })
    }

    fixtureTest('deps')
    fixtureTest('minimal')
    fixtureTest('multi-versions')
    fixtureTest('private')
    fixtureTest('homepage')
  })
})
