import rule from './require-localized-strings-array';
import { ruleTester } from '../test.utils';

ruleTester.run('require-localized-strings-array', rule, {
  valid: [
    // Web-view with both LOCALIZED_STRINGS and useLocalizedStrings
    {
      code: `
        const LOCALIZED_STRINGS: LocalizeKey[] = ['%key1%', '%key2%'];
        function MyView() {
          const strings = useLocalizedStrings(LOCALIZED_STRINGS);
          return null;
        }
      `,
      filename: '/extensions/src/my-ext/web-views/my-view.web-view.tsx',
    },
    // Web-view without useLocalizedStrings (no LOCALIZED_STRINGS needed)
    {
      code: `
        function MyView() {
          return <div>static</div>;
        }
      `,
      filename: '/extensions/src/my-ext/web-views/my-view.web-view.tsx',
    },
    // Non web-view file is not checked
    {
      code: `
        function helper() {
          useLocalizedStrings([]);
        }
      `,
      filename: '/src/renderer/components/helper.ts',
    },
    // Custom prefix variant
    {
      code: `
        const EDITOR_LOCALIZED_STRINGS: LocalizeKey[] = ['%key1%'];
        function MyView() {
          const strings = useLocalizedStrings(EDITOR_LOCALIZED_STRINGS);
          return null;
        }
      `,
      filename: '/extensions/src/my-ext/web-views/editor.web-view.tsx',
    },
  ],
  invalid: [
    // Web-view with useLocalizedStrings but no LOCALIZED_STRINGS
    {
      code: `
        function MyView() {
          const strings = useLocalizedStrings(['%key1%', '%key2%']);
          return null;
        }
      `,
      filename: '/extensions/src/my-ext/web-views/my-view.web-view.tsx',
      errors: [{ messageId: 'missingLocalizedStrings' }],
    },
  ],
});
