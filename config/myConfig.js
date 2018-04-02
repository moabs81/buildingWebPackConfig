'use strict';
const fs = require('fs'),
    path = require('path');

const baseDir = fs.realpathSync(process.cwd());

const buildPath = relativePath => path.resolve(baseDir, relativePath);

module.exports = {
    baseDir: baseDir,
    buildPath: buildPath
};