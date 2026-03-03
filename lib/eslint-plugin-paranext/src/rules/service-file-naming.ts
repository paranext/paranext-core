import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as path from 'path';

const createRule = ESLintUtils.RuleCreator(() => '');

type MessageIds = 'serviceNotInServicesDir' | 'serviceModelNotInDir' | 'serviceWrongExtension';

/**
 * ESLint rule: paranext/service-file-naming
 *
 * Enforces that service files are named with .service.ts, .service-host.ts, or .service-model.ts
 * suffix and are located in an appropriate directory (services/ or models/).
 *
 * The .service-host.ts pattern is used for files under extension-host/ or main/ that create network
 * objects or data providers consumed by the corresponding .service.ts in shared/.
 *
 * The .service-model.ts pattern is used for files that define models/types associated with a
 * service.
 */
export default createRule<[], MessageIds>({
  name: 'service-file-naming',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce service file naming convention: *.service.ts, *.service-host.ts, or *.service-model.ts in services/ directory',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      serviceNotInServicesDir: "Service file '{{filename}}' should be in a 'services/' directory",
      serviceModelNotInDir:
        "Service model file '{{filename}}' should be in a 'services/' or 'models/' directory",
      serviceWrongExtension:
        "Service file '{{filename}}' should end with '.service.ts', '.service-host.ts', or '.service-model.ts'",
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
    const isInModelsDir = filename.includes('/models/') || filename.includes('\\models\\');
    const hasServiceSuffix =
      basename.endsWith('.service.ts') ||
      basename.endsWith('.service-host.ts') ||
      basename.endsWith('.service-model.ts');
    const isServiceModel = basename.endsWith('.service-model.ts');

    const messages: { messageId: MessageIds; data: Record<string, string> }[] = [];

    // Only warn if it looks like a service but doesn't follow conventions
    if (lowerBasename.includes('service') && !hasServiceSuffix && lowerBasename.endsWith('.ts')) {
      messages.push({
        messageId: 'serviceWrongExtension',
        data: { filename: basename },
      });
    }

    // service-model files can be in services/ or models/; other service files must be in services/
    if (isServiceModel && !isInServicesDir && !isInModelsDir) {
      messages.push({
        messageId: 'serviceModelNotInDir',
        data: { filename: basename },
      });
    } else if (hasServiceSuffix && !isServiceModel && !isInServicesDir) {
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
