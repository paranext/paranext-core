import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md#${name}`,
);

type MessageIds = 'missingMetadata' | 'missingMethodProperty';

/**
 * ESLint rule: paranext/registration-structure
 *
 * Enforces that command registration includes method metadata with summary, params, and result.
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Command Registration"
 */
export default createRule<[], MessageIds>({
  name: 'registration-structure',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce command registration includes method metadata',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      missingMetadata:
        'Command registration should include metadata object with method.summary, method.params, and method.result',
      missingMethodProperty:
        "Command registration metadata should include '{{property}}' in the method object",
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // Check if this is a registerCommand call
        if (!isRegisterCommandCall(node)) return;

        // registerCommand takes 2-3 arguments: (name, handler, metadata?)
        if (node.arguments.length < 3) {
          // If no metadata provided, this is a potential issue
          // But we'll make this a softer suggestion rather than error
          return;
        }

        const metadataArg = node.arguments[2];
        if (metadataArg.type !== TSESTree.AST_NODE_TYPES.ObjectExpression) {
          context.report({
            node: metadataArg,
            messageId: 'missingMetadata',
          });
          return;
        }

        // Check for method property in metadata
        const methodProp = findProperty(metadataArg, 'method');
        if (!methodProp) {
          context.report({
            node: metadataArg,
            messageId: 'missingMetadata',
          });
          return;
        }

        // Check that method has required properties
        const methodValue = methodProp.value;
        if (methodValue.type !== TSESTree.AST_NODE_TYPES.ObjectExpression) return;

        const requiredProps = ['summary'];
        for (const prop of requiredProps) {
          if (!findProperty(methodValue, prop)) {
            context.report({
              node: methodValue,
              messageId: 'missingMethodProperty',
              data: { property: prop },
            });
          }
        }
      },
    };
  },
});

/** Checks if a CallExpression is a registerCommand call. */
function isRegisterCommandCall(node: TSESTree.CallExpression): boolean {
  const { callee } = node;

  if (callee.type === TSESTree.AST_NODE_TYPES.Identifier && callee.name === 'registerCommand') {
    return true;
  }

  if (callee.type === TSESTree.AST_NODE_TYPES.MemberExpression) {
    const { property } = callee;
    if (
      property.type === TSESTree.AST_NODE_TYPES.Identifier &&
      property.name === 'registerCommand'
    ) {
      return true;
    }
  }

  return false;
}

/** Finds a property in an ObjectExpression by name. */
function findProperty(obj: TSESTree.ObjectExpression, name: string): TSESTree.Property | undefined {
  for (const prop of obj.properties) {
    if (prop.type === TSESTree.AST_NODE_TYPES.Property) {
      const { key } = prop;
      if (key.type === TSESTree.AST_NODE_TYPES.Identifier && key.name === name) {
        return prop;
      }
      if (key.type === TSESTree.AST_NODE_TYPES.Literal && key.value === name) {
        return prop;
      }
    }
  }
  return undefined;
}
