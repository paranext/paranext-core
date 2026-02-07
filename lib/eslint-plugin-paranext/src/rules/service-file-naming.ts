import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Paranext-Core-Patterns.md#${name}`,
);

type MessageIds = 'serviceNotInServicesDir' | 'serviceWrongExtension';

/**
 * ESLint rule: paranext/service-file-naming
 *
 * Enforces that service files are named with .service.ts or .service-host.ts suffix and are located
 * in a services/ directory.
 *
 * The .service-host.ts pattern is used for files under extension-host/ or main/ that create network
 * objects or data providers consumed by the corresponding .service.ts in shared/.
 *
 * See: .context/standards/Paranext-Core-Patterns.md "Extension Structure"
 */
export default createRule<[], MessageIds>({
  name: 'service-file-naming',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce service file naming convention: *.service.ts or *.service-host.ts in services/ directory',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      serviceNotInServicesDir: "Service file '{{filename}}' should be in a 'services/' directory",
      serviceWrongExtension:
        "Service file '{{filename}}' should end with '.service.ts' or '.service-host.ts'",
    },
  },
  defaultOptions: [],

  create(context) {
    const filename = context.getFilename();
    const basename = path.basename(filename);

    // Check if filename suggests it's a service (contains 'service' in name)
    const lowerBasename = basename.toLowerCase();
    const isLikelyService =
      (lowerBasename.includes('service') && lowerBasename.endsWith('.ts')) ||
      lowerBasename.endsWith('.service.ts');

    if (!isLikelyService) {
      return {};
    }

    // Skip test files
    if (basename.includes('.test.') || basename.includes('.spec.')) {
      return {};
    }

    const isInServicesDir = filename.includes('/services/') || filename.includes('\\services\\');
    const hasServiceSuffix =
      basename.endsWith('.service.ts') || basename.endsWith('.service-host.ts');

    const messages: { messageId: MessageIds; data: Record<string, string> }[] = [];

    // Only warn if it looks like a service but doesn't follow conventions
    if (lowerBasename.includes('service') && !hasServiceSuffix && lowerBasename.endsWith('.ts')) {
      messages.push({
        messageId: 'serviceWrongExtension',
        data: { filename: basename },
      });
    }

    if (hasServiceSuffix && !isInServicesDir) {
      messages.push({
        messageId: 'serviceNotInServicesDir',
        data: { filename: basename },
      });
    }

    if (messages.length === 0) {
      return {};
    }

    return {
      Program(node: TSESTree.Program) {
        for (const msg of messages) {
          context.report({
            node,
            messageId: msg.messageId,
            data: msg.data,
          });
        }
      },
    };
  },
});
