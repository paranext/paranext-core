import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md#${name}`,
);

/**
 * ESLint rule: paranext/webview-file-naming
 *
 * Enforces that WebView files end with .web-view.tsx or .web-view.html
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Extension Structure"
 */
export default createRule({
  name: 'webview-file-naming',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce WebView file naming convention: *.web-view.tsx or *.web-view.html',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalidWebViewFileName:
        "WebView file '{{filename}}' should end with '.web-view.tsx' or '.web-view.html'",
    },
  },
  defaultOptions: [],

  create(context) {
    const filename = context.getFilename();
    const basename = path.basename(filename);

    // Only check files in web-views directories
    if (!filename.includes('/web-views/') && !filename.includes('\\web-views\\')) {
      return {};
    }

    // Skip index files and test files
    if (
      basename.startsWith('index.') ||
      basename.includes('.test.') ||
      basename.includes('.spec.')
    ) {
      return {};
    }

    // Check if the file follows the naming convention
    const isValidWebViewName =
      basename.endsWith('.web-view.tsx') ||
      basename.endsWith('.web-view.html') ||
      basename.endsWith('.web-view.scss') ||
      basename.endsWith('.web-view.css');

    if (!isValidWebViewName) {
      return {
        Program(node: TSESTree.Program) {
          context.report({
            node,
            messageId: 'invalidWebViewFileName',
            data: {
              filename: basename,
            },
          });
        },
      };
    }

    return {};
  },
});
