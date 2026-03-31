const config = {
  compilationOptions: {
    // Stops dts-bundle-generator from trying to inline symlinked packages, which causes issues
    // when using yalc links to local dev packages
    followSymlinks: false,
    // dts-bundle-generator uses TypeScript 6.x internally, which requires different settings
    // than the TypeScript 5.x used by tsc (e.g., ignoreDeprecations for baseUrl)
    preferredConfigPath: './tsconfig.dts.json',
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
