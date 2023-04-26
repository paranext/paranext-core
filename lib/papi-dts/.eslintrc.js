module.exports = {
  rules: {
    // Allow console because command-line tools are fine to use the console
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['papi.d.ts'],
      rules: {
        // Turn off formatting rules that tsc and prettier don't fix for us on this auto-generated
        // type definitions file
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'max-classes-per-file': 'off',
        'import/newline-after-import': 'off',
        'vars-on-top': 'off',
        'no-var': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
