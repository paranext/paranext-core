const config = {
  compilationOptions: {
    // Stops dts-bundle-generator from trying to inline symlinked packages, which causes issues
    // when using yalc links to local dev packages
    followSymlinks: false,
  },
  entries: [
    {
      filePath: './src/index.ts',
      outFile: './dist/index.d.ts',
      noCheck: false,
      libraries: {
        inlinedLibraries: ['class-variance-authority'],
      },
      output: {
        exportReferencedTypes: false,
      },
    },
  ],
};

module.exports = config;
