import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { isValidExtensionIdentifier, suggestFix } from '../utils/naming-patterns';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Paranext-Core-Patterns.md#${name}`,
);

/**
 * ESLint rule: paranext/command-naming
 *
 * Enforces that command names registered with papi.commands.registerCommand follow the pattern:
 * 'extensionName.commandName' where both parts are camelCase.
 *
 * Valid: 'platformScripture.openFind' Invalid: 'PlatformScripture.OpenFind',
 * 'platform-scripture.open-find'
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Command Naming" section
 */
export default createRule({
  name: 'command-naming',
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce command naming convention: 'extensionName.commandName' (camelCase)",
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidCommandName:
        "Command name '{{actual}}' does not follow the pattern 'extensionName.commandName' (camelCase). Suggested: '{{suggested}}'",
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // Check if this is a registerCommand call
        if (!isRegisterCommandCall(node)) return;

        // Get the first argument (the command name)
        const firstArg = node.arguments[0];
        if (!firstArg || firstArg.type !== TSESTree.AST_NODE_TYPES.Literal) return;

        const commandName = firstArg.value;
        if (typeof commandName !== 'string') return;

        // Validate the command name
        if (!isValidExtensionIdentifier(commandName)) {
          context.report({
            node: firstArg,
            messageId: 'invalidCommandName',
            data: {
              actual: commandName,
              suggested: suggestFix(commandName),
            },
            fix(fixer) {
              const suggested = suggestFix(commandName);
              return fixer.replaceText(firstArg, `'${suggested}'`);
            },
          });
        }
      },
    };
  },
});

/** Checks if a CallExpression is a registerCommand call. */
function isRegisterCommandCall(node: TSESTree.CallExpression): boolean {
  const { callee } = node;

  // Direct call: registerCommand(...)
  if (callee.type === TSESTree.AST_NODE_TYPES.Identifier && callee.name === 'registerCommand') {
    return true;
  }

  // Member call: papi.commands.registerCommand(...)
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
