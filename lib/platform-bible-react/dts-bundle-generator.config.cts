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
      libraries: {
        inlinedLibraries: ['class-variance-authority'],
      },
      output: {
        exportReferencedTypes: false,
      },
    },
    {
      filePath: './src/experimental.ts',
      outFile: './dist/experimental.d.ts',
      noCheck: false,
      libraries: {
        // `clsx` is inlined here (unlike the index entry) because the experimental entry surfaces
        // cva-typed components (e.g. ProjectSelector/LinkedScrRefButton) without also exporting a
        // symbol that references `clsx`'s `ClassValue` directly. Without inlining clsx, the bundler
        // emits a dangling `CLSX.ClassValue` reference and the generated-bundle check fails.
        inlinedLibraries: ['class-variance-authority', 'clsx'],
      },
      output: {
        exportReferencedTypes: false,
      },
    },
  ],
};

module.exports = config;
