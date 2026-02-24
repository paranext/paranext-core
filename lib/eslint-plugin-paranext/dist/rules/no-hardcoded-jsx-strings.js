"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Code-Style-Guide.md#${name}`);
/**
 * Minimum length for a string to be considered "content" that should be localized. Strings of 3
 * chars or less are typically punctuation, icons, or formatting.
 */
const MIN_CONTENT_LENGTH = 4;
/** Strings that are allowed without localization (formatting, technical values). */
const ALLOWED_STRINGS = new Set([
    // Punctuation and formatting
    ':',
    '-',
    '|',
    '/',
    '•',
    '→',
    '←',
    '↓',
    '↑',
    '...',
    // Common technical values
    'px',
    'em',
    'rem',
    '%',
    // Empty/whitespace
    '',
    ' ',
]);
/** Check if a string looks like technical content (not user-facing text). */
function isTechnicalString(str) {
    // CSS values, numbers, etc.
    if (/^[\d.]+(%|px|em|rem|vh|vw|ch)?$/.test(str))
        return true;
    // Single special characters
    if (str.length === 1)
        return true;
    // All caps with underscores (likely constants/keys)
    if (/^[A-Z_]+$/.test(str))
        return true;
    // Localization keys like %key% or %key_name%
    if (/^%[\w_]+%$/.test(str))
        return true;
    return false;
}
/**
 * ESLint rule: paranext/no-hardcoded-jsx-strings
 *
 * Detects hardcoded English strings in JSX that should be localized. Ignores strings <= 3
 * characters and technical values.
 *
 * Bad: <Button>Submit</Button> Good: <Button>{localizedStrings['%general_submit%']}</Button>
 *
 * See: .context/standards/Code-Style-Guide.md "Localization"
 */
exports.default = createRule({
    name: 'no-hardcoded-jsx-strings',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Detect hardcoded strings in JSX that should be localized',
            recommended: 'warn',
        },
        schema: [],
        messages: {
            hardcodedString: "Hardcoded string '{{value}}' should be localized. Use localizedStrings['%key%'] instead.",
        },
    },
    defaultOptions: [],
    create(context) {
        function shouldReport(value) {
            const trimmed = value.trim();
            // Too short to be meaningful content
            if (trimmed.length < MIN_CONTENT_LENGTH)
                return false;
            // Explicitly allowed
            if (ALLOWED_STRINGS.has(trimmed))
                return false;
            // Technical/non-user-facing
            if (isTechnicalString(trimmed))
                return false;
            return true;
        }
        return {
            // JSX text content: <div>Hello World</div>
            JSXText(node) {
                const value = node.value;
                // Skip whitespace-only
                if (!value.trim())
                    return;
                if (shouldReport(value)) {
                    context.report({
                        node,
                        messageId: 'hardcodedString',
                        data: {
                            value: value.trim().substring(0, 30) + (value.trim().length > 30 ? '...' : ''),
                        },
                    });
                }
            },
            // JSX expression with string literal: <div>{"Hello"}</div>
            JSXExpressionContainer(node) {
                const expr = node.expression;
                // String literal in JSX expression
                if (expr.type === 'Literal' && typeof expr.value === 'string') {
                    if (shouldReport(expr.value)) {
                        context.report({
                            node,
                            messageId: 'hardcodedString',
                            data: {
                                value: expr.value.substring(0, 30) + (expr.value.length > 30 ? '...' : ''),
                            },
                        });
                    }
                }
                // Template literal with no expressions: {`Hello`}
                if (expr.type === 'TemplateLiteral' &&
                    expr.expressions.length === 0 &&
                    expr.quasis.length === 1) {
                    const value = expr.quasis[0].value.raw;
                    if (shouldReport(value)) {
                        context.report({
                            node,
                            messageId: 'hardcodedString',
                            data: {
                                value: value.substring(0, 30) + (value.length > 30 ? '...' : ''),
                            },
                        });
                    }
                }
            },
            // String props that typically contain user-facing text
            JSXAttribute(node) {
                const attrName = node.name.type === 'JSXIdentifier' ? node.name.name : null;
                // Common user-facing text props
                const userFacingProps = ['title', 'placeholder', 'alt', 'label'];
                if (!attrName || !userFacingProps.includes(attrName))
                    return;
                // String literal: title="Hello"
                if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
                    if (shouldReport(node.value.value)) {
                        context.report({
                            node,
                            messageId: 'hardcodedString',
                            data: {
                                value: node.value.value.substring(0, 30) + (node.value.value.length > 30 ? '...' : ''),
                            },
                        });
                    }
                }
                // Expression with string: title={"Hello"}
                if (node.value?.type === 'JSXExpressionContainer') {
                    const expr = node.value.expression;
                    if (expr.type === 'Literal' && typeof expr.value === 'string') {
                        if (shouldReport(expr.value)) {
                            context.report({
                                node,
                                messageId: 'hardcodedString',
                                data: {
                                    value: expr.value.substring(0, 30) + (expr.value.length > 30 ? '...' : ''),
                                },
                            });
                        }
                    }
                }
            },
        };
    },
});
