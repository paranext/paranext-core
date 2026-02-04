import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/main/.context/standards/Code-Style-Guide.md#${name}`,
);

/**
 * Minimum length for a string to be flagged as potentially hardcoded English. Short strings like
 * ".", "-", etc. are typically punctuation, not translatable text.
 */
const MIN_STRING_LENGTH = 4;

/** Strings that are allowed in comparisons (technical identifiers, not user-facing). */
const ALLOWED_COMPARISON_STRINGS = new Set([
  // Boolean-like strings
  'true',
  'false',
  'yes',
  'no',
  'on',
  'off',
  // Technical identifiers
  'utf-8',
  'utf8',
  'ascii',
  'json',
  'xml',
  'html',
  'text',
  'blob',
  'null',
  'undefined',
  // HTTP methods
  'get',
  'post',
  'put',
  'delete',
  'patch',
  // Common technical values
  'success',
  'error',
  'warning',
  'info',
  'debug',
]);

/** Check if a string looks like a technical identifier rather than user-facing text. */
function isTechnicalString(str: string): boolean {
  const lower = str.toLowerCase();

  // Explicitly allowed
  if (ALLOWED_COMPARISON_STRINGS.has(lower)) return true;

  // File extensions
  if (/^\.[a-z0-9]+$/.test(str)) return true;

  // MIME types
  if (/^[a-z]+\/[a-z0-9.+-]+$/.test(str)) return true;

  // URL protocols
  if (/^https?:\/\//.test(str)) return true;

  // Localization key patterns like %key%
  if (/^%[\w_]+%$/.test(str)) return true;

  // camelCase or PascalCase identifiers
  if (/^[a-z][a-zA-Z0-9]*$/.test(str) || /^[A-Z][a-zA-Z0-9]*$/.test(str)) {
    // But not if it looks like a sentence (has multiple uppercase)
    const upperCount = (str.match(/[A-Z]/g) || []).length;
    if (upperCount <= 2) return true;
  }

  // snake_case or SCREAMING_SNAKE_CASE
  if (/^[a-z_]+$/.test(str) || /^[A-Z_]+$/.test(str)) return true;

  // kebab-case
  if (/^[a-z]+(-[a-z]+)*$/.test(str)) return true;

  return false;
}

/**
 * ESLint rule: paranext/no-hardcoded-string-comparison
 *
 * Detects comparisons against hardcoded English strings, which should typically use localized
 * string references instead.
 *
 * Bad: if (status === "Success") { ... } Bad: if (message === "File not found") { ... }
 *
 * Good: if (status === STATUS.SUCCESS) { ... } Good: if (message ===
 * localizedStrings['%error_not_found%']) { ... }
 *
 * Allows technical strings like 'utf-8', 'json', file extensions, etc.
 *
 * See: .context/standards/Code-Style-Guide.md "Localization"
 */
export default createRule({
  name: 'no-hardcoded-string-comparison',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow comparisons against hardcoded English strings that should be localized',
      recommended: 'error',
    },
    schema: [],
    messages: {
      hardcodedComparison:
        "Comparison against hardcoded string '{{value}}'. Use constants or localized strings instead.",
    },
  },
  defaultOptions: [],

  create(context) {
    function checkLiteral(node: TSESTree.Node, operator: string) {
      // Only check equality operators
      if (operator !== '===' && operator !== '!==' && operator !== '==' && operator !== '!=') {
        return;
      }

      // Check if it's a string literal
      if (node.type === 'Literal' && typeof node.value === 'string') {
        const value = node.value;

        // Skip short strings
        if (value.length < MIN_STRING_LENGTH) return;

        // Skip technical strings
        if (isTechnicalString(value)) return;

        context.report({
          node,
          messageId: 'hardcodedComparison',
          data: {
            value: value.substring(0, 30) + (value.length > 30 ? '...' : ''),
          },
        });
      }

      // Check template literals with no expressions
      if (
        node.type === 'TemplateLiteral' &&
        node.expressions.length === 0 &&
        node.quasis.length === 1
      ) {
        const value = node.quasis[0].value.raw;

        // Skip short strings
        if (value.length < MIN_STRING_LENGTH) return;

        // Skip technical strings
        if (isTechnicalString(value)) return;

        context.report({
          node,
          messageId: 'hardcodedComparison',
          data: {
            value: value.substring(0, 30) + (value.length > 30 ? '...' : ''),
          },
        });
      }
    }

    return {
      BinaryExpression(node: TSESTree.BinaryExpression) {
        checkLiteral(node.left, node.operator);
        checkLiteral(node.right, node.operator);
      },
    };
  },
});
