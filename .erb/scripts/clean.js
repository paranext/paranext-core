import { rimrafSync } from 'rimraf';
import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
  webpackPaths.extensionsDistPath,
];

foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) rimrafSync(folder, { glob: true });
});
