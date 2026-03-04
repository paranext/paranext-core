import rule from './require-provenance-comment';
import { ruleTester } from '../test.utils';

ruleTester.run('require-provenance-comment', rule, {
  valid: [
    // Non-extensions file is not checked
    {
      code: `export function helper() {}`,
      filename: '/src/shared/utils/helper.ts',
    },
    // Test file is skipped
    {
      code: `export function testHelper() {}`,
      filename: '/extensions/src/my-ext/src/main.test.ts',
    },
    // Type declaration file is skipped
    {
      code: `export function foo(): void;`,
      filename: '/extensions/src/my-ext/src/types/foo.d.ts',
    },
    // Non-exported function is not checked
    {
      code: `function internalHelper() {}`,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // Exported function with PORTED FROM comment between export and function
    {
      code: `export /* PORTED FROM PT9: Something.cs */ function activate() {}`,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // NEW IN PT10 variant
    {
      code: `export /* NEW IN PT10 */ function activate() {}`,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // Line comment before export keyword
    {
      code: `
        // PORTED FROM PT9: Paratext/Something.cs
        export function activate() {}
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // JSDoc comment before export keyword
    {
      code: `
        /** PORTED FROM PT9: Paratext/Something.cs */
        export function activate() {}
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // Multi-line JSDoc with provenance
    {
      code: `
        /**
         * Activates the extension.
         * PORTED FROM PT9: Paratext/Something.cs
         */
        export function activate() {}
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // Comment before default export
    {
      code: `
        // NEW IN PT10: Platform-specific implementation
        export default function activate() {}
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
  ],
  invalid: [
    // Exported function without provenance comment
    {
      code: `export function activate() {}`,
      filename: '/extensions/src/my-ext/src/main.ts',
      errors: [{ messageId: 'missingProvenance' }],
    },
    // Default export without provenance
    {
      code: `export default function activate() {}`,
      filename: '/extensions/src/my-ext/src/main.ts',
      errors: [{ messageId: 'missingProvenance' }],
    },
  ],
});
