import 'core-js/modules/es7.object.entries'
import { createLicenseHeader } from '@selenic/core'
import fs from 'fs'
import pkgUp from 'pkg-up'
import webpack from 'webpack'
import { ConcatSource } from 'webpack-sources'

function readPkgUp(path: string) {
  return JSON.parse(fs.readFileSync(pkgUp.sync(path), 'utf8'))
}

export class SelenicWebpackPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('@selenic/webpack-plugin', compilation => {
      compilation.hooks.optimizeChunkAssets.tapAsync(
        '@selenic/webpack-plugin',
        (chunks, callback) => {
          chunks.forEach(chunk => {
            const mainResource = chunk.entryModule && chunk.entryModule.resource
            const deps: { [key: string]: any } = {}
            chunk.modulesIterable.forEach(mod => {
              if (mod.resource !== mainResource) {
                const pkg = readPkgUp(mod.resource)
                const map = deps[pkg.name] ? deps[pkg.name] : new Map()
                map.set(pkg.version, pkg)
                deps[pkg.name] = map
              }
            })
            Object.entries(deps).forEach(entry => {
              deps[entry[0]] = [...entry[1].values()]
            })
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
