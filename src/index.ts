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
            chunk.modulesIterable.forEach(mod => {
              if (mod.resource !== mainResource) {
                const pkg = readPkgUp(mod.resource)
                const dep = deps[pkg.name]
                deps[pkg.name] = dep
                  ? Array.isArray(dep)
                    ? [...dep, pkg]
                    : [dep, pkg]
                  : pkg
              }
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
