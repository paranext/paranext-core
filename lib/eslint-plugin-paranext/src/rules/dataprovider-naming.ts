import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { isValidExtensionIdentifier, suggestFix } from '../utils/naming-patterns';

const createRule = ESLintUtils.RuleCreator(() => '');

/**
 * ESLint rule: paranext/dataprovider-naming
 *
 * Enforces that DataProvider names follow the pattern: 'extensionName.dataName' where both parts
 * are camelCase.
 */
export default createRule({
  name: 'dataprovider-naming',
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce DataProvider naming convention: 'extensionName.dataName' (camelCase)",
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidDataProviderName:
        "DataProvider name '{{actual}}' does not follow the pattern 'extensionName.dataName' (camelCase). Suggested: '{{suggested}}'",
    },
  },
  defaultOptions: [],

  create(context) {
    return {
      TSPropertySignature(node: TSESTree.TSPropertySignature) {
        // Only check in papi-shared-types module augmentation for DataProviders
        if (!isInDataProvidersInterface(node)) return;

        // Get the property key (provider name)
        const { key } = node;
        if (key.type !== TSESTree.AST_NODE_TYPES.Literal) return;

        const providerName = key.value;
        if (typeof providerName !== 'string') return;

        // Validate the provider name
        if (!isValidExtensionIdentifier(providerName)) {
          context.report({
            node: key,
            messageId: 'invalidDataProviderName',
            data: {
              actual: providerName,
              suggested: suggestFix(providerName),
            },
            fix(fixer) {
              const suggested = suggestFix(providerName);
              return fixer.replaceText(key, `'${suggested}'`);
            },
          });
        }
      },
    };
  },
});

/**
 * Checks if a TSPropertySignature is inside a DataProviders or ProjectDataProviderInterfaces
 * interface.
 */
function isInDataProvidersInterface(node: TSESTree.TSPropertySignature): boolean {
  // Walk up the tree to find the interface declaration
  let current: TSESTree.Node | undefined = node.parent;
  while (current) {
    if (current.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration) {
      if (
        current.id.name === 'DataProviders' ||
        current.id.name === 'ProjectDataProviderInterfaces'
      ) {
        return true;
      }
    }
    current = current.parent;
  }
  return false;
}
