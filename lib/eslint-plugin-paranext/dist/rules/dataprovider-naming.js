"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const naming_patterns_1 = require("../utils/naming-patterns");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Paranext-Core-Patterns.md#${name}`);
/**
 * ESLint rule: paranext/dataprovider-naming
 *
 * Enforces that DataProvider names follow the pattern: 'extensionName.dataName' where both parts
 * are camelCase.
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Naming Conventions Summary"
 */
exports.default = createRule({
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
            invalidDataProviderName: "DataProvider name '{{actual}}' does not follow the pattern 'extensionName.dataName' (camelCase). Suggested: '{{suggested}}'",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            TSPropertySignature(node) {
                // Only check in papi-shared-types module augmentation for DataProviders
                if (!isInDataProvidersInterface(node))
                    return;
                // Get the property key (provider name)
                const { key } = node;
                if (key.type !== utils_1.TSESTree.AST_NODE_TYPES.Literal)
                    return;
                const providerName = key.value;
                if (typeof providerName !== 'string')
                    return;
                // Validate the provider name
                if (!(0, naming_patterns_1.isValidExtensionIdentifier)(providerName)) {
                    context.report({
                        node: key,
                        messageId: 'invalidDataProviderName',
                        data: {
                            actual: providerName,
                            suggested: (0, naming_patterns_1.suggestFix)(providerName),
                        },
                        fix(fixer) {
                            const suggested = (0, naming_patterns_1.suggestFix)(providerName);
                            return fixer.replaceText(key, `'${suggested}'`);
                        },
                    });
                }
            },
        };
    },
});
/** Checks if a TSPropertySignature is inside a DataProviders interface. */
function isInDataProvidersInterface(node) {
    // Walk up the tree to find the interface declaration
    let current = node.parent;
    while (current) {
        if (current.type === utils_1.TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration) {
            if (current.id.name === 'DataProviders') {
                return true;
            }
        }
        current = current.parent;
    }
    return false;
}
