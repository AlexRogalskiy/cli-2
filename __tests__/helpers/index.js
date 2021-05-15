const readdirp = require('readdirp');
const path = require('path');
const _ = require('lodash');
const fsp = require('fs/promises');

const readDirP = async (dirPath) => {
  const filesInfo = await readdirp.promise(dirPath, {
    alwaysStat: true,
  });

  const filesData = filesInfo.map((fileInfo) => ({
    path: fileInfo.path.split(path.sep).join('/'),
    name: fileInfo.basename,
    size: BigInt(fileInfo.stats.size),
  }));

  return _.sortBy(filesData, 'path');
};

const getFixturePath = (filePath) => (
  path.join(__dirname, '..', '..', '__fixtures__', filePath)
);

const readFile = (filePath) => fsp.readFile(filePath, 'utf-8');

module.exports = {
  readDirP,
  getFixturePath,
  readFile,
};
