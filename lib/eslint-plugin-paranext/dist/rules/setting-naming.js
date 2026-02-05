"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const naming_patterns_1 = require("../utils/naming-patterns");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md#${name}`);
/**
 * ESLint rule: paranext/setting-naming
 *
 * Enforces that setting names follow the pattern: 'extensionName.settingName' where both parts are
 * camelCase.
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Naming Conventions Summary"
 */
exports.default = createRule({
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
            invalidSettingName: "Setting name '{{actual}}' does not follow the pattern 'extensionName.settingName' (camelCase). Suggested: '{{suggested}}'",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            TSPropertySignature(node) {
                // Only check in papi-shared-types module augmentation for SettingTypes
                if (!isInSettingTypesInterface(node))
                    return;
                // Get the property key (setting name)
                const { key } = node;
                if (key.type !== utils_1.TSESTree.AST_NODE_TYPES.Literal)
                    return;
                const settingName = key.value;
                if (typeof settingName !== 'string')
                    return;
                // Validate the setting name
                if (!(0, naming_patterns_1.isValidExtensionIdentifier)(settingName)) {
                    context.report({
                        node: key,
                        messageId: 'invalidSettingName',
                        data: {
                            actual: settingName,
                            suggested: (0, naming_patterns_1.suggestFix)(settingName),
                        },
                        fix(fixer) {
                            const suggested = (0, naming_patterns_1.suggestFix)(settingName);
                            return fixer.replaceText(key, `'${suggested}'`);
                        },
                    });
                }
            },
        };
    },
});
/** Checks if a TSPropertySignature is inside a SettingTypes interface. */
function isInSettingTypesInterface(node) {
    // Walk up the tree to find the interface declaration
    let current = node.parent;
    while (current) {
        if (current.type === utils_1.TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration) {
            if (current.id.name === 'SettingTypes') {
                return true;
            }
        }
        current = current.parent;
    }
    return false;
}
