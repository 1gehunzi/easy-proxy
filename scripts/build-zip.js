#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const extPackageJson = require('../package.json')

const DEST_DIR = path.join(__dirname, '../dist')
const DEST_ZIP_DIR = path.join(__dirname, '../dist-zip')

const extractExtensionData = () => ({
  name: extPackageJson.name,
  version: extPackageJson.version,
})

const makeDestZipDirIfNotExists = () => {
  if (!fs.existsSync(DEST_ZIP_DIR)) {
    fs.mkdirSync(DEST_ZIP_DIR)
  }
}

const buildZip = (src, dist, platform, zipFilename) => {
  console.info(`Building ${zipFilename}...`)
  const fileList = fs.readdirSync(src)

  const fileName = fileList.find(item => item.indexOf(platform) > -1)
  console.log('filename', fileName)

  if (!fileName) {
    return;
  }


  const output = fs.createWriteStream(path.join(dist, zipFilename))
  const archive = archiver('zip')
  archive.pipe(output)
  // archive.directory(src, false)
  archive.append(fs.createReadStream(`${src}/${fileName}`), { name: fileName, mode: 0o766 });
  archive.append(fs.createReadStream(`easy-proxy.config.json`), { name: 'easy-proxy.config.json' })
  archive.finalize()
}

const main = () => {
  const { name, version } = extractExtensionData()
  const platformList = ['linux', 'macos', 'win']
  makeDestZipDirIfNotExists()

  for (let platform of platformList) {
    const zipFilename = `${name}-v${version}-${platform}.zip`
    buildZip(DEST_DIR, DEST_ZIP_DIR, platform, zipFilename)
  }


  
}

main()