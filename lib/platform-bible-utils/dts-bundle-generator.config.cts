const config = {
  compilationOptions: {
    // Stops dts-bundle-generator from trying to inline symlinked packages, which causes issues
    // when using yalc links to local dev packages
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
      filePath: './src/internal.ts',
      outFile: './dist/internal.d.ts',
      noCheck: false,
    },
  ],
};

module.exports = config;
