"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const path = __importStar(require("path"));
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Paranext-Core-Patterns.md#${name}`);
/**
 * ESLint rule: paranext/webview-file-naming
 *
 * Enforces that WebView files end with .web-view.tsx or .web-view.html
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Extension Structure"
 */
exports.default = createRule({
    name: 'webview-file-naming',
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce WebView file naming convention: *.web-view.tsx or *.web-view.html',
            recommended: 'error',
        },
        schema: [],
        messages: {
            invalidWebViewFileName: "WebView file '{{filename}}' should end with '.web-view.tsx' or '.web-view.html'",
        },
    },
    defaultOptions: [],
    create(context) {
        const filename = context.getFilename();
        const basename = path.basename(filename);
        // Only check files in web-views directories
        if (!filename.includes('/web-views/') && !filename.includes('\\web-views\\')) {
            return {};
        }
        // Skip index files and test files
        if (basename.startsWith('index.') ||
            basename.includes('.test.') ||
            basename.includes('.spec.')) {
            return {};
        }
        // Check if the file follows the naming convention
        const isValidWebViewName = basename.endsWith('.web-view.tsx') ||
            basename.endsWith('.web-view.html') ||
            basename.endsWith('.web-view.scss') ||
            basename.endsWith('.web-view.css');
        if (!isValidWebViewName) {
            return {
                Program(node) {
                    context.report({
                        node,
                        messageId: 'invalidWebViewFileName',
                        data: {
                            filename: basename,
                        },
                    });
                },
            };
        }
        return {};
    },
});
