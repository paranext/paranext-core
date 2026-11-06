const config = {
  compilationOptions: {
    // Stops dts-bundle-generator from trying to inline symlinked packages, which causes issues
    // with the staged dev packages, which npm symlinks into `node_modules` from
    // `dev-packages/staging/`
    followSymlinks: false,
    // Required when there is more than one entry — otherwise dts-bundle-generator errors with
    // "Cannot find tsconfig for multiple files."
    preferredConfigPath: './tsconfig.json',
  },
  entries: [
    {
      filePath: './src/index.ts',
      outFile: './dist/index.d.ts',
      noCheck: false,
    },
    {
      filePath: './src/experimental.ts',
      outFile: './dist/experimental.d.ts',
      noCheck: false,
    },
  ],
};

module.exports = config;
