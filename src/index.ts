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
      compilation.hooks.optimizeChunkAssets.tap('@selenic/webpack-plugin', chunks => {
        chunks.forEach(chunk => {
          const mainResource = chunk.entryModule && chunk.entryModule.resource
          const mainPkg = mainResource && readPkgUp(mainResource)
          const depsPkg: { [key: string]: any } = {}
          chunk
            .getModules()
            .filter(mod => mod.resource !== mainResource)
            .forEach(mod => {
              const pkg = readPkgUp(mod.resource)
              const map = depsPkg[pkg.name] ? new Map(depsPkg[pkg.name]) : new Map()
              map.set(pkg.version, pkg)
              depsPkg[pkg.name] = map
            })
          Object.entries(depsPkg).forEach(([depsName, depsMap]) => {
            depsPkg[depsName] = [...depsMap.values()]
          })
          chunk.files.forEach(filename => {
            compilation.assets[filename] = new ConcatSource(
              createLicenseHeader({
                main: mainPkg,
                deps: depsPkg
              }),
              compilation.assets[filename]
            )
          })
        })
      })
    })
  }
}
