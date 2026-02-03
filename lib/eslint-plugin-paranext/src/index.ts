/**
 * ESLint Plugin for paranext-core TypeScript patterns.
 *
 * This plugin enforces naming conventions and structural patterns documented in
 * .context/standards/Paranext-Core-Patterns.md
 *
 * Rules:
 *
 * - Paranext/command-naming: Enforce command naming convention
 * - Paranext/setting-naming: Enforce setting naming convention
 * - Paranext/dataprovider-naming: Enforce DataProvider naming convention
 * - Paranext/webview-file-naming: Enforce WebView file naming
 * - Paranext/service-file-naming: Enforce service file naming
 * - Paranext/registration-structure: Enforce command registration metadata
 */

import commandNaming from './rules/command-naming';
import settingNaming from './rules/setting-naming';
import dataproviderNaming from './rules/dataprovider-naming';
import webviewFileNaming from './rules/webview-file-naming';
import serviceFileNaming from './rules/service-file-naming';
import registrationStructure from './rules/registration-structure';

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
      },
    },
  },
};

export = plugin;
