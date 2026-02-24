/**
 * AI-specific ESLint configuration
 *
 * This config extends the base .eslintrc.js and adds paranext plugin rules that enforce patterns
 * from Paranext-Core-Patterns.md.
 *
 * Used on AI branches (ai/main, ai/feature/*) to provide guardrails for AI-generated code.
 *
 * Run: npm run lint:ai-strict Or: npx eslint --config .eslintrc.ai.js <files>
 */
module.exports = {
  extends: ['./.eslintrc.js'],
  plugins: ['paranext'],
  ignorePatterns: ['.erb/**'],
  rules: {
    // === Naming conventions ===

    // Command naming: extensionName.commandName (camelCase)
    // See: Paranext-Core-Patterns.md "Command Naming"
    'paranext/command-naming': 'error',

    // Setting naming: extensionName.settingName (camelCase)
    // See: Paranext-Core-Patterns.md "Naming Conventions Summary"
    'paranext/setting-naming': 'error',

    // DataProvider naming: extensionName.dataName (camelCase)
    // See: Paranext-Core-Patterns.md "Naming Conventions Summary"
    'paranext/dataprovider-naming': 'error',

    // WebView files must end with .web-view.tsx or .web-view.html
    // See: Paranext-Core-Patterns.md "Extension Structure"
    'paranext/webview-file-naming': 'error',

    // Service files must be in *.service.ts in services/ directory
    // See: Paranext-Core-Patterns.md "Extension Structure"
    'paranext/service-file-naming': 'warn',

    // Command registration must include metadata
    // See: Paranext-Core-Patterns.md "Command Registration"
    'paranext/registration-structure': 'warn',

    // === Styling (Tailwind) ===

    // No hardcoded colors - use theme tokens (tw-bg-background, tw-text-foreground)
    // See: Code-Style-Guide.md "Theming Requirements"
    'paranext/no-hardcoded-tailwind-colors': 'error',

    // No shadow classes - shadows not used in Platform.Bible
    // See: Code-Style-Guide.md "Theming Requirements"
    'paranext/no-tailwind-shadows': 'error',

    // === Localization ===

    // aria-label/aria-describedby must use localized strings
    // See: Code-Style-Guide.md "Localization"
    'paranext/require-localized-aria': 'warn',

    // Detect hardcoded strings in JSX that should be localized
    // See: Code-Style-Guide.md "Localization"
    'paranext/no-hardcoded-jsx-strings': 'warn',

    // No comparisons against hardcoded English strings
    // See: Code-Style-Guide.md "Localization"
    'paranext/no-hardcoded-string-comparison': 'error',

    // === Code quality ===

    // Registrations must be added to context.registrations for cleanup
    // See: Entry-Point-Guide.md
    'paranext/registration-cleanup': 'warn',
  },
  overrides: [
    {
      // Extension entry points - strict command naming, registration, and cleanup
      files: ['extensions/src/**/main.ts', 'src/extension-host/**/*.ts'],
      rules: {
        'paranext/command-naming': 'error',
        'paranext/registration-structure': 'error',
        'paranext/registration-cleanup': 'error',
      },
    },
    {
      // WebView files - strict file naming and localization
      files: ['**/*.web-view.tsx'],
      rules: {
        'paranext/webview-file-naming': 'error',
        'paranext/require-localized-strings-array': 'warn',
        'paranext/require-localized-aria': 'error',
        'paranext/no-hardcoded-jsx-strings': 'error',
      },
    },
    {
      // Type declaration files - strict DataProvider and setting naming
      files: ['**/*.d.ts'],
      rules: {
        'paranext/dataprovider-naming': 'error',
        'paranext/setting-naming': 'error',
      },
    },
    {
      // Extension source files - require provenance comments
      files: ['extensions/src/**/*.ts', 'extensions/src/**/*.tsx'],
      excludedFiles: ['**/*.test.ts', '**/*.test.tsx', '**/*.d.ts'],
      rules: {
        'paranext/require-provenance-comment': 'warn',
      },
    },
    {
      // Test files and stories - disable localization rules (hardcoded strings are fine)
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.stories.ts',
        '**/*.stories.tsx',
        '**/testing/**',
      ],
      rules: {
        'paranext/no-hardcoded-jsx-strings': 'off',
        'paranext/require-localized-aria': 'off',
        'paranext/require-localized-strings-array': 'off',
        'paranext/no-hardcoded-string-comparison': 'off',
      },
    },
  ],
};
