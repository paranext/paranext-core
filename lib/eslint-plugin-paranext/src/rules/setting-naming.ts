import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { isValidExtensionIdentifier, suggestFix } from '../utils/naming-patterns';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md#${name}`,
);

/**
 * ESLint rule: paranext/setting-naming
 *
 * Enforces that setting names follow the pattern: 'extensionName.settingName' where both parts are
 * camelCase.
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Naming Conventions Summary"
 */
export default createRule({
  name: 'setting-naming',
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce setting naming convention: 'extensionName.settingName' (camelCase)",
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidSettingName:
        "Setting name '{{actual}}' does not follow the pattern 'extensionName.settingName' (camelCase). Suggested: '{{suggested}}'",
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      TSPropertySignature(node: TSESTree.TSPropertySignature) {
        // Only check in papi-shared-types module augmentation for SettingTypes
        if (!isInSettingTypesInterface(node)) return;

        // Get the property key (setting name)
        const { key } = node;
        if (key.type !== TSESTree.AST_NODE_TYPES.Literal) return;

        const settingName = key.value;
        if (typeof settingName !== 'string') return;

        // Validate the setting name
        if (!isValidExtensionIdentifier(settingName)) {
          context.report({
            node: key,
            messageId: 'invalidSettingName',
            data: {
              actual: settingName,
              suggested: suggestFix(settingName),
            },
            fix(fixer) {
              const suggested = suggestFix(settingName);
              return fixer.replaceText(key, `'${suggested}'`);
            },
          });
        }
      },
    };
  },
});

/** Checks if a TSPropertySignature is inside a SettingTypes interface. */
function isInSettingTypesInterface(node: TSESTree.TSPropertySignature): boolean {
  // Walk up the tree to find the interface declaration
  let current: TSESTree.Node | undefined = node.parent;
  while (current) {
    if (current.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration) {
      if (current.id.name === 'SettingTypes') {
        return true;
      }
    }
    current = current.parent;
  }
  return false;
}
