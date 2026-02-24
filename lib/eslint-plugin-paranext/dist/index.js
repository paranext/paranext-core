"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const command_naming_1 = __importDefault(require("./rules/command-naming"));
const setting_naming_1 = __importDefault(require("./rules/setting-naming"));
const dataprovider_naming_1 = __importDefault(require("./rules/dataprovider-naming"));
const webview_file_naming_1 = __importDefault(require("./rules/webview-file-naming"));
const service_file_naming_1 = __importDefault(require("./rules/service-file-naming"));
const registration_structure_1 = __importDefault(require("./rules/registration-structure"));
const no_hardcoded_tailwind_colors_1 = __importDefault(require("./rules/no-hardcoded-tailwind-colors"));
const no_tailwind_shadows_1 = __importDefault(require("./rules/no-tailwind-shadows"));
const require_localized_aria_1 = __importDefault(require("./rules/require-localized-aria"));
const no_hardcoded_jsx_strings_1 = __importDefault(require("./rules/no-hardcoded-jsx-strings"));
const require_localized_strings_array_1 = __importDefault(require("./rules/require-localized-strings-array"));
const require_provenance_comment_1 = __importDefault(require("./rules/require-provenance-comment"));
const no_hardcoded_string_comparison_1 = __importDefault(require("./rules/no-hardcoded-string-comparison"));
const registration_cleanup_1 = __importDefault(require("./rules/registration-cleanup"));
const plugin = {
    meta: {
        name: 'eslint-plugin-paranext',
        version: '0.1.0',
    },
    rules: {
        'command-naming': command_naming_1.default,
        'setting-naming': setting_naming_1.default,
        'dataprovider-naming': dataprovider_naming_1.default,
        'webview-file-naming': webview_file_naming_1.default,
        'service-file-naming': service_file_naming_1.default,
        'registration-structure': registration_structure_1.default,
        'no-hardcoded-tailwind-colors': no_hardcoded_tailwind_colors_1.default,
        'no-tailwind-shadows': no_tailwind_shadows_1.default,
        'require-localized-aria': require_localized_aria_1.default,
        'no-hardcoded-jsx-strings': no_hardcoded_jsx_strings_1.default,
        'require-localized-strings-array': require_localized_strings_array_1.default,
        'require-provenance-comment': require_provenance_comment_1.default,
        'no-hardcoded-string-comparison': no_hardcoded_string_comparison_1.default,
        'registration-cleanup': registration_cleanup_1.default,
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
module.exports = plugin;
