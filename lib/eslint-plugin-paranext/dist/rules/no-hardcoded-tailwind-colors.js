"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/main/.context/standards/Code-Style-Guide.md#${name}`);
/**
 * Allowed theme tokens for Tailwind colors. These are semantic tokens that adapt to light/dark
 * themes.
 */
const ALLOWED_THEME_TOKENS = [
    'background',
    'foreground',
    'muted',
    'muted-foreground',
    'popover',
    'popover-foreground',
    'card',
    'card-foreground',
    'border',
    'input',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'ring',
    'transparent',
    'current',
    'inherit',
];
/**
 * Patterns that indicate hardcoded colors:
 *
 * - Tw-bg-black, tw-bg-white, tw-bg-slate-100, tw-text-red-500, etc.
 * - Tw-*-[color]/[opacity] patterns like tw-bg-black/50
 * - Hex colors, rgb(), hsl() in className
 */
const HARDCODED_COLOR_PATTERNS = [
    // Named colors: tw-bg-black, tw-text-white, tw-border-gray-500
    /tw-(bg|text|border|ring|outline|divide|from|via|to|placeholder|caret|fill|stroke)-(black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?(\/\d+)?/,
    // Opacity modifiers on any color: tw-bg-[color]/50
    /tw-(bg|text|border)-.+\/\d+/,
];
/** Check if a class string contains hardcoded colors */
function findHardcodedColors(classString) {
    const violations = [];
    const classes = classString.split(/\s+/);
    for (const cls of classes) {
        // Skip if it's an allowed theme token
        const isThemeToken = ALLOWED_THEME_TOKENS.some((token) => cls.includes(`-${token}`) ||
            cls === `tw-bg-${token}` ||
            cls === `tw-text-${token}` ||
            cls === `tw-border-${token}`);
        if (isThemeToken)
            continue;
        // Check against hardcoded patterns
        for (const pattern of HARDCODED_COLOR_PATTERNS) {
            if (pattern.test(cls)) {
                violations.push(cls);
                break;
            }
        }
    }
    return violations;
}
/**
 * ESLint rule: paranext/no-hardcoded-tailwind-colors
 *
 * Prevents hardcoded colors in Tailwind classes. Use theme tokens instead.
 *
 * Bad: tw-bg-black, tw-text-white, tw-bg-slate-500/50 Good: tw-bg-background, tw-text-foreground,
 * tw-bg-muted
 *
 * See: .context/standards/Code-Style-Guide.md "Theming Requirements"
 */
exports.default = createRule({
    name: 'no-hardcoded-tailwind-colors',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow hardcoded colors in Tailwind classes; use theme tokens instead',
            recommended: 'error',
        },
        schema: [],
        messages: {
            hardcodedColor: "Hardcoded color '{{className}}' detected. Use theme tokens instead (tw-bg-background, tw-text-foreground, etc.)",
        },
    },
    defaultOptions: [],
    create(context) {
        function checkClassValue(node, value) {
            const violations = findHardcodedColors(value);
            for (const violation of violations) {
                context.report({
                    node,
                    messageId: 'hardcodedColor',
                    data: {
                        className: violation,
                    },
                });
            }
        }
        return {
            // Check JSX className attributes
            JSXAttribute(node) {
                const attrName = node.name.type === 'JSXIdentifier' ? node.name.name : null;
                if (attrName !== 'className' && attrName !== 'class')
                    return;
                if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
                    checkClassValue(node, node.value.value);
                }
                // Check template literals: className={`tw-bg-black ${condition}`}
                if (node.value?.type === 'JSXExpressionContainer' &&
                    node.value.expression.type === 'TemplateLiteral') {
                    for (const quasi of node.value.expression.quasis) {
                        checkClassValue(node, quasi.value.raw);
                    }
                }
            },
            // Check cn() calls: cn('tw-bg-black', condition && 'tw-text-white')
            CallExpression(node) {
                if (node.callee.type === 'Identifier' &&
                    (node.callee.name === 'cn' ||
                        node.callee.name === 'clsx' ||
                        node.callee.name === 'classNames')) {
                    for (const arg of node.arguments) {
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            checkClassValue(arg, arg.value);
                        }
                        if (arg.type === 'TemplateLiteral') {
                            for (const quasi of arg.quasis) {
                                checkClassValue(arg, quasi.value.raw);
                            }
                        }
                    }
                }
            },
        };
    },
});
