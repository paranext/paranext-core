import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => '');

/**
 * ESLint rule: paranext/require-localized-aria
 *
 * Ensures aria-label and aria-describedby props use localized string references, not hardcoded
 * English strings.
 *
 * Bad: aria-label="Close dialog" Good: aria-label={localizedStrings['%general_close%']}
 *
 * See: .context/standards/Code-Style-Guide.md "Localization"
 */
export default createRule({
  name: 'require-localized-aria',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require aria-label and aria-describedby to use localized strings',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      hardcodedAria:
        "aria-{{attrName}} has hardcoded string '{{value}}'. Use localized string reference instead.",
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      JSXAttribute(node: TSESTree.JSXAttribute) {
        const attrName = node.name.type === 'JSXIdentifier' ? node.name.name : null;

        // Only check aria-label and aria-describedby
        if (attrName !== 'aria-label' && attrName !== 'aria-describedby') {
          return;
        }

        // Check for string literal value: aria-label="Close"
        if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
          const { value } = node.value;
          // Allow empty strings and very short strings (single chars)
          if (value.length > 1) {
            context.report({
              node,
              messageId: 'hardcodedAria',
              data: {
                attrName: attrName.replace('aria-', ''),
                value,
              },
            });
          }
          return;
        }

        // Check JSX expression container: aria-label={"Close"}
        if (node.value?.type === 'JSXExpressionContainer') {
          const expr = node.value.expression;

          // Skip empty expressions
          if (expr.type === 'JSXEmptyExpression') {
            return;
          }

          // Hardcoded string in expression: aria-label={"Close"}
          if (expr.type === 'Literal' && typeof expr.value === 'string' && expr.value.length > 1) {
            context.report({
              node,
              messageId: 'hardcodedAria',
              data: {
                attrName: attrName.replace('aria-', ''),
                value: expr.value,
              },
            });
            return;
          }

          // Template literal with no expressions: aria-label={`Close`}
          if (
            expr.type === 'TemplateLiteral' &&
            expr.expressions.length === 0 &&
            expr.quasis.length === 1 &&
            expr.quasis[0].value.raw.length > 1
          ) {
            context.report({
              node,
              messageId: 'hardcodedAria',
              data: {
                attrName: attrName.replace('aria-', ''),
                value: expr.quasis[0].value.raw,
              },
            });
          }

          // If it's a localized value reference, it's fine - no action needed
        }
      },
    };
  },
});
