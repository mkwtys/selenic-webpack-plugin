import { createLicenseHeader } from '@selenic/core'
import fs from 'fs'
import pkgUp from 'pkg-up'
import webpack from 'webpack'
import { ConcatSource } from 'webpack-sources'

function readPkgUp(path: string) {
  return JSON.parse(fs.readFileSync(pkgUp.sync(path), 'utf8'))
}

export default class SelenicWebpackPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('@selenic/webpack-plugin', compilation => {
      compilation.hooks.optimizeChunkAssets.tapAsync(
        '@selenic/webpack-plugin',
        (chunks, callback) => {
          chunks.forEach(chunk => {
            const mainResource = chunk.entryModule.resource
            const deps: { [key: string]: any } = {}
            const depsMap = new Map()
            chunk.modulesIterable.forEach(mod => {
              if (mod.resource !== mainResource) {
                const pkg = readPkgUp(mod.resource)
                depsMap.set(`${pkg.name}@${pkg.version}`, pkg)
              }
            })
            depsMap.forEach((v, k) => (deps[k] = v))
            chunk.files.forEach(filename => {
              compilation.assets[filename] = new ConcatSource(
                createLicenseHeader({
                  main: readPkgUp(mainResource),
                  deps
                }),
                compilation.assets[filename]
              )
            })
          })

          callback()
        }
      )
    })
  }
}
