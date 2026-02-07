import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Code-Style-Guide.md#${name}`,
);

/**
 * ESLint rule: paranext/require-localized-strings-array
 *
 * Ensures web-view files define a LOCALIZED_STRINGS array for collecting all localization keys used
 * in the component.
 *
 * This rule only applies to files ending in .web-view.tsx
 *
 * Pattern expected: const LOCALIZED_STRINGS: LocalizeKey[] = [ '%key1%', '%key2%', ];
 *
 * See: .context/standards/Code-Style-Guide.md "Localization"
 */
export default createRule({
  name: 'require-localized-strings-array',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require LOCALIZED_STRINGS array in web-view files',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      missingLocalizedStrings:
        'Web-view files should define a LOCALIZED_STRINGS array to collect localization keys. Add: const LOCALIZED_STRINGS: LocalizeKey[] = [...]',
    },
  },
  defaultOptions: [],

  create(context) {
    const filename = context.getFilename();

    // Only check .web-view.tsx files
    if (!filename.endsWith('.web-view.tsx')) {
      return {};
    }

    let hasLocalizedStringsArray = false;
    let hasUseLocalizedStrings = false;

    return {
      // Check for LOCALIZED_STRINGS variable declaration
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.id.type === 'Identifier') {
          const name = node.id.name;
          // Match LOCALIZED_STRINGS or variants like EDITOR_LOCALIZED_STRINGS
          if (name === 'LOCALIZED_STRINGS' || name.endsWith('_LOCALIZED_STRINGS')) {
            hasLocalizedStringsArray = true;
          }
        }
      },

      // Check for useLocalizedStrings hook call
      CallExpression(node: TSESTree.CallExpression) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'useLocalizedStrings') {
          hasUseLocalizedStrings = true;
        }
      },

      // At end of file, check if we need LOCALIZED_STRINGS
      'Program:exit'(node: TSESTree.Program) {
        // If the file uses useLocalizedStrings but doesn't have a LOCALIZED_STRINGS array
        if (hasUseLocalizedStrings && !hasLocalizedStringsArray) {
          context.report({
            node,
            messageId: 'missingLocalizedStrings',
          });
        }
      },
    };
  },
});
