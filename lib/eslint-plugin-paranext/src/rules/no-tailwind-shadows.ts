import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Code-Style-Guide.md#${name}`,
);

/** Pattern to detect shadow classes: tw-shadow, tw-shadow-sm, tw-shadow-lg, etc. */
const SHADOW_PATTERN = /tw-shadow(-[a-z]+)?/;

/** Check if a class string contains shadow classes */
function findShadowClasses(classString: string): string[] {
  const violations: string[] = [];
  const classes = classString.split(/\s+/);

  for (const cls of classes) {
    if (SHADOW_PATTERN.test(cls)) {
      violations.push(cls);
    }
  }

  return violations;
}

/**
 * ESLint rule: paranext/no-tailwind-shadows
 *
 * Prevents shadow classes in Tailwind. Shadows are not used in Platform.Bible.
 *
 * Bad: tw-shadow, tw-shadow-sm, tw-shadow-lg, tw-shadow-md
 *
 * See: .context/standards/Code-Style-Guide.md "Theming Requirements" See:
 * .claude/agents/references/component-builder-patterns.md "PROHIBITED Styling Patterns"
 */
export default createRule({
  name: 'no-tailwind-shadows',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow shadow classes in Tailwind; shadows are not used in Platform.Bible',
      recommended: 'error',
    },
    schema: [],
    messages: {
      shadowClass:
        "Shadow class '{{className}}' is not allowed. Shadows are not used in Platform.Bible UI",
    },
  },
  defaultOptions: [],

  create(context) {
    function checkClassValue(node: TSESTree.Node, value: string) {
      const violations = findShadowClasses(value);
      for (const violation of violations) {
        context.report({
          node,
          messageId: 'shadowClass',
          data: {
            className: violation,
          },
        });
      }
    }

    return {
      // Check JSX className attributes
      JSXAttribute(node: TSESTree.JSXAttribute) {
        const attrName = node.name.type === 'JSXIdentifier' ? node.name.name : null;
        if (attrName !== 'className' && attrName !== 'class') return;

        if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
          checkClassValue(node, node.value.value);
        }

        // Check template literals: className={`tw-shadow ${condition}`}
        if (
          node.value?.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'TemplateLiteral'
        ) {
          for (const quasi of node.value.expression.quasis) {
            checkClassValue(node, quasi.value.raw);
          }
        }
      },

      // Check cn() calls: cn('tw-shadow', condition && 'tw-shadow-lg')
      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === 'Identifier' &&
          (node.callee.name === 'cn' ||
            node.callee.name === 'clsx' ||
            node.callee.name === 'classNames')
        ) {
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
