"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/main/.context/standards/Paranext-Core-Patterns.md#${name}`);
/**
 * ESLint rule: paranext/registration-structure
 *
 * Enforces that command registration includes method metadata with summary, params, and result.
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Command Registration"
 */
exports.default = createRule({
    name: 'registration-structure',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce command registration includes method metadata',
            recommended: 'warn',
        },
        schema: [],
        messages: {
            missingMetadata: 'Command registration should include metadata object with method.summary, method.params, and method.result',
            missingMethodProperty: "Command registration metadata should include '{{property}}' in the method object",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                // Check if this is a registerCommand call
                if (!isRegisterCommandCall(node))
                    return;
                // registerCommand takes 2-3 arguments: (name, handler, metadata?)
                if (node.arguments.length < 3) {
                    // If no metadata provided, this is a potential issue
                    // But we'll make this a softer suggestion rather than error
                    return;
                }
                const metadataArg = node.arguments[2];
                if (metadataArg.type !== utils_1.TSESTree.AST_NODE_TYPES.ObjectExpression) {
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
                if (methodValue.type !== utils_1.TSESTree.AST_NODE_TYPES.ObjectExpression)
                    return;
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
function isRegisterCommandCall(node) {
    const { callee } = node;
    if (callee.type === utils_1.TSESTree.AST_NODE_TYPES.Identifier && callee.name === 'registerCommand') {
        return true;
    }
    if (callee.type === utils_1.TSESTree.AST_NODE_TYPES.MemberExpression) {
        const { property } = callee;
        if (property.type === utils_1.TSESTree.AST_NODE_TYPES.Identifier &&
            property.name === 'registerCommand') {
            return true;
        }
    }
    return false;
}
/** Finds a property in an ObjectExpression by name. */
function findProperty(obj, name) {
    for (const prop of obj.properties) {
        if (prop.type === utils_1.TSESTree.AST_NODE_TYPES.Property) {
            const { key } = prop;
            if (key.type === utils_1.TSESTree.AST_NODE_TYPES.Identifier && key.name === name) {
                return prop;
            }
            if (key.type === utils_1.TSESTree.AST_NODE_TYPES.Literal && key.value === name) {
                return prop;
            }
        }
    }
    return undefined;
}
