const config = {
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
