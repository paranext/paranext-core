"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/main/.context/standards/Code-Style-Guide.md#${name}`);
/**
 * Patterns that indicate a localized string reference:
 *
 * - LocalizedStrings['key'] or localizedStrings.key
 * - Variable references (not string literals)
 * - UseMemo results
 * - String formatting functions like formatReplacementString
 */
function isLocalizedValue(node) {
    // Variable reference (likely from localizedStrings)
    if (node.type === 'Identifier') {
        return true;
    }
    // Member expression like localizedStrings['key'] or localizedStrings.key
    if (node.type === 'MemberExpression') {
        if (node.object.type === 'Identifier' &&
            node.object.name.toLowerCase().includes('localizedstrings')) {
            return true;
        }
        return true; // Any member expression is likely dynamic
    }
    // Call expression (function call result)
    if (node.type === 'CallExpression') {
        return true;
    }
    // Conditional expression: condition ? a : b
    if (node.type === 'ConditionalExpression') {
        return isLocalizedValue(node.consequent) && isLocalizedValue(node.alternate);
    }
    // Logical expression: a || b, a && b
    if (node.type === 'LogicalExpression') {
        return true; // Could be fallback pattern
    }
    // Template literal with expressions
    if (node.type === 'TemplateLiteral' && node.expressions.length > 0) {
        return true; // Has dynamic parts
    }
    return false;
}
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
exports.default = createRule({
    name: 'require-localized-aria',
    meta: {
        type: 'problem',
        docs: {
            description: 'Require aria-label and aria-describedby to use localized strings',
            recommended: 'warn',
        },
        schema: [],
        messages: {
            hardcodedAria: "aria-{{attrName}} has hardcoded string '{{value}}'. Use localized string reference instead.",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXAttribute(node) {
                const attrName = node.name.type === 'JSXIdentifier' ? node.name.name : null;
                // Only check aria-label and aria-describedby
                if (attrName !== 'aria-label' && attrName !== 'aria-describedby') {
                    return;
                }
                // Check for string literal value: aria-label="Close"
                if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
                    const value = node.value.value;
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
                    if (expr.type === 'TemplateLiteral' &&
                        expr.expressions.length === 0 &&
                        expr.quasis.length === 1 &&
                        expr.quasis[0].value.raw.length > 1) {
                        context.report({
                            node,
                            messageId: 'hardcodedAria',
                            data: {
                                attrName: attrName.replace('aria-', ''),
                                value: expr.quasis[0].value.raw,
                            },
                        });
                        return;
                    }
                    // If it's a localized value reference, it's fine
                    if (isLocalizedValue(expr)) {
                        return;
                    }
                }
            },
        };
    },
});
