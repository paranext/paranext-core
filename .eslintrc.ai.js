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
  rules: {
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
  },
  overrides: [
    {
      // Extension entry points - strict command naming and registration
      files: ['extensions/src/**/main.ts', 'src/extension-host/**/*.ts'],
      rules: {
        'paranext/command-naming': 'error',
        'paranext/registration-structure': 'error',
      },
    },
    {
      // WebView files - strict file naming
      files: ['**/web-views/**/*.tsx', '**/web-views/**/*.html'],
      rules: {
        'paranext/webview-file-naming': 'error',
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
  ],
};
