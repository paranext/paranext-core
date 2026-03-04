import rule from './webview-file-naming';
import { ruleTester } from '../test.utils';

ruleTester.run('webview-file-naming', rule, {
  valid: [
    // Correctly named web-view file
    {
      code: `export default function MyView() { return null; }`,
      filename: '/extensions/src/my-extension/web-views/my-view.web-view.tsx',
    },
    // HTML web-view is valid
    {
      code: `const x = 1;`,
      filename: '/extensions/src/my-extension/web-views/my-view.web-view.html',
    },
    // Index file in web-views is allowed
    {
      code: `export { default } from './my-view.web-view';`,
      filename: '/extensions/src/my-extension/web-views/index.ts',
    },
    // Test file in web-views is allowed
    {
      code: `describe('test', () => {});`,
      filename: '/extensions/src/my-extension/web-views/my-view.test.ts',
    },
    // Files outside web-views are not checked
    {
      code: `export const x = 1;`,
      filename: '/extensions/src/my-extension/src/helper.ts',
    },
  ],
  invalid: [
    {
      code: `export default function MyView() { return null; }`,
      filename: '/extensions/src/my-extension/web-views/my-view.tsx',
      errors: [{ messageId: 'invalidWebViewFileName' }],
    },
    {
      code: `const x = 1;`,
      filename: '/extensions/src/my-extension/web-views/bad-name.ts',
      errors: [{ messageId: 'invalidWebViewFileName' }],
    },
  ],
});
