"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/main/.context/standards/Code-Style-Guide.md#${name}`);
/** Valid provenance markers that indicate where code came from. */
const PROVENANCE_PATTERNS = [
    /PORTED FROM PT9/i,
    /NEW IN PT10/i,
    /ADAPTED FROM/i,
    /BASED ON/i,
    /MIGRATED FROM/i,
];
/** Check if a JSDoc comment contains a provenance marker. */
function hasProvenanceComment(comments) {
    if (!comments || comments.length === 0)
        return false;
    for (const comment of comments) {
        const text = comment.value;
        for (const pattern of PROVENANCE_PATTERNS) {
            if (pattern.test(text)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * ESLint rule: paranext/require-provenance-comment
 *
 * Ensures exported functions in extensions/ have provenance comments indicating whether they were
 * ported from PT9 or are new in PT10.
 *
 * Good examples:
 *
 * - // PORTED FROM PT9: Paratext/EditForms/Whatever.cs
 * - // NEW IN PT10: Platform-specific implementation
 *
 * See: .context/standards/Code-Style-Guide.md "Source Provenance"
 */
exports.default = createRule({
    name: 'require-provenance-comment',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Require provenance comments (PORTED FROM PT9 / NEW IN PT10) on exported functions in extensions',
            recommended: 'warn',
        },
        schema: [],
        messages: {
            missingProvenance: "Exported function '{{name}}' should have a provenance comment (PORTED FROM PT9 or NEW IN PT10) in its JSDoc.",
        },
    },
    defaultOptions: [],
    create(context) {
        const filename = context.getFilename();
        // Only check files in extensions/
        if (!filename.includes('/extensions/')) {
            return {};
        }
        // Skip test files
        if (filename.includes('.test.') || filename.includes('.spec.')) {
            return {};
        }
        // Skip type declaration files
        if (filename.endsWith('.d.ts')) {
            return {};
        }
        const sourceCode = context.getSourceCode();
        function checkFunction(node, name, isExported) {
            if (!isExported || !name)
                return;
            const comments = sourceCode.getCommentsBefore(node);
            if (!hasProvenanceComment(comments)) {
                context.report({
                    node,
                    messageId: 'missingProvenance',
                    data: { name },
                });
            }
        }
        return {
            // export function foo() {}
            ExportNamedDeclaration(node) {
                if (node.declaration?.type === 'FunctionDeclaration') {
                    const funcDecl = node.declaration;
                    checkFunction(funcDecl, funcDecl.id?.name ?? null, true);
                }
            },
            // export default function foo() {}
            ExportDefaultDeclaration(node) {
                if (node.declaration.type === 'FunctionDeclaration') {
                    const funcDecl = node.declaration;
                    checkFunction(funcDecl, funcDecl.id?.name ?? 'default', true);
                }
            },
        };
    },
});
