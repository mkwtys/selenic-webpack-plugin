import { createLicenseHeader } from '@selenic/core'
import fs from 'fs'
import pkgUp from 'pkg-up'
import webpack from 'webpack'
import { ConcatSource } from 'webpack-sources'

function readPkgUp(path: string) {
  const pkg = pkgUp.sync({ cwd: path })
  if (pkg) {
    return JSON.parse(fs.readFileSync(pkg, 'utf8'))
  }
}

export class SelenicWebpackPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('@selenic/webpack-plugin', compilation => {
      compilation.hooks.optimizeChunkAssets.tap(
        '@selenic/webpack-plugin',
        chunks => {
          chunks.forEach(chunk => {
            const mainResource = chunk.entryModule && chunk.entryModule.resource
            const deps: { [key: string]: any } = {}
            chunk
              .getModules()
              .filter(mod => mod.resource !== mainResource)
              .forEach(mod => {
                const pkg = readPkgUp(mod.resource)
                const map = deps[pkg.name] ? deps[pkg.name] : new Map()
                map.set(pkg.version, pkg)
                deps[pkg.name] = map
              })
            Object.entries(deps).forEach(entry => {
              deps[entry[0]] = [...entry[1].values()]
            })
            chunk.files.forEach(filename => {
              compilation.assets[filename] = new ConcatSource(
                createLicenseHeader({
                  main: mainResource && readPkgUp(mainResource),
                  deps
                }),
                compilation.assets[filename]
              )
            })
          })
        }
      )
    })
  }
}
