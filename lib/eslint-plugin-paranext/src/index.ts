/**
 * ESLint Plugin for paranext-core TypeScript patterns.
 *
 * This plugin enforces naming conventions, structural patterns, localization, and code quality
 * rules documented in .context/standards/
 *
 * Rules:
 *
 * Naming conventions:
 *
 * - Paranext/command-naming: Enforce command naming convention
 * - Paranext/setting-naming: Enforce setting naming convention
 * - Paranext/dataprovider-naming: Enforce DataProvider naming convention
 * - Paranext/webview-file-naming: Enforce WebView file naming
 * - Paranext/service-file-naming: Enforce service file naming
 * - Paranext/registration-structure: Enforce command registration metadata
 *
 * Styling:
 *
 * - Paranext/no-hardcoded-tailwind-colors: Disallow hardcoded colors; use theme tokens
 * - Paranext/no-tailwind-shadows: Disallow shadow classes in Tailwind
 *
 * Localization:
 *
 * - Paranext/require-localized-aria: Require localized strings for aria-label/describedby
 * - Paranext/no-hardcoded-jsx-strings: Detect hardcoded strings in JSX
 * - Paranext/require-localized-strings-array: Require LOCALIZED_STRINGS in web-views
 * - Paranext/no-hardcoded-string-comparison: Disallow comparisons against hardcoded strings
 *
 * Code quality:
 *
 * - Paranext/require-provenance-comment: Require PORTED FROM PT9 / NEW IN PT10 comments
 * - Paranext/registration-cleanup: Ensure registrations added to context.registrations
 */

import commandNaming from './rules/command-naming';
import settingNaming from './rules/setting-naming';
import dataproviderNaming from './rules/dataprovider-naming';
import webviewFileNaming from './rules/webview-file-naming';
import serviceFileNaming from './rules/service-file-naming';
import registrationStructure from './rules/registration-structure';
import noHardcodedTailwindColors from './rules/no-hardcoded-tailwind-colors';
import noTailwindShadows from './rules/no-tailwind-shadows';
import requireLocalizedAria from './rules/require-localized-aria';
import noHardcodedJsxStrings from './rules/no-hardcoded-jsx-strings';
import requireLocalizedStringsArray from './rules/require-localized-strings-array';
import requireProvenanceComment from './rules/require-provenance-comment';
import noHardcodedStringComparison from './rules/no-hardcoded-string-comparison';
import registrationCleanup from './rules/registration-cleanup';

const plugin = {
  meta: {
    name: 'eslint-plugin-paranext',
    version: '0.1.0',
  },
  rules: {
    'command-naming': commandNaming,
    'setting-naming': settingNaming,
    'dataprovider-naming': dataproviderNaming,
    'webview-file-naming': webviewFileNaming,
    'service-file-naming': serviceFileNaming,
    'registration-structure': registrationStructure,
    'no-hardcoded-tailwind-colors': noHardcodedTailwindColors,
    'no-tailwind-shadows': noTailwindShadows,
    'require-localized-aria': requireLocalizedAria,
    'no-hardcoded-jsx-strings': noHardcodedJsxStrings,
    'require-localized-strings-array': requireLocalizedStringsArray,
    'require-provenance-comment': requireProvenanceComment,
    'no-hardcoded-string-comparison': noHardcodedStringComparison,
    'registration-cleanup': registrationCleanup,
  },
  configs: {
    recommended: {
      plugins: ['paranext'],
      rules: {
        'paranext/command-naming': 'error',
        'paranext/setting-naming': 'error',
        'paranext/dataprovider-naming': 'error',
        'paranext/webview-file-naming': 'error',
        'paranext/service-file-naming': 'warn',
        'paranext/registration-structure': 'warn',
        'paranext/no-hardcoded-tailwind-colors': 'error',
        'paranext/no-tailwind-shadows': 'error',
        'paranext/require-localized-aria': 'warn',
        'paranext/no-hardcoded-jsx-strings': 'warn',
        'paranext/require-localized-strings-array': 'warn',
        'paranext/require-provenance-comment': 'warn',
        'paranext/no-hardcoded-string-comparison': 'error',
        'paranext/registration-cleanup': 'warn',
      },
    },
    strict: {
      plugins: ['paranext'],
      rules: {
        'paranext/command-naming': 'error',
        'paranext/setting-naming': 'error',
        'paranext/dataprovider-naming': 'error',
        'paranext/webview-file-naming': 'error',
        'paranext/service-file-naming': 'error',
        'paranext/registration-structure': 'error',
        'paranext/no-hardcoded-tailwind-colors': 'error',
        'paranext/no-tailwind-shadows': 'error',
        'paranext/require-localized-aria': 'error',
        'paranext/no-hardcoded-jsx-strings': 'error',
        'paranext/require-localized-strings-array': 'error',
        'paranext/require-provenance-comment': 'error',
        'paranext/no-hardcoded-string-comparison': 'error',
        'paranext/registration-cleanup': 'error',
      },
    },
  },
};

export = plugin;
