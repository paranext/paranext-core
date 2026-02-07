import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/paranext/paranext-core/blob/ai/main/.context/standards/Entry-Point-Guide.md#${name}`,
);

/** Registration methods that return promises which must be tracked for cleanup. */
const REGISTRATION_METHODS = [
  // papi.commands.registerCommand
  'registerCommand',
  // papi.webViewProviders.register
  'register',
  // papi.dataProviders.registerEngine
  'registerEngine',
  // papi.projectDataProviders.registerProjectDataProviderEngineFactory
  'registerProjectDataProviderEngineFactory',
  // papi.projectSettings.registerValidator
  'registerValidator',
];

/** Objects that have registration methods. */
const REGISTRATION_OBJECTS = [
  'commands',
  'webViewProviders',
  'dataProviders',
  'projectDataProviders',
  'projectSettings',
];

/**
 * ESLint rule: paranext/registration-cleanup
 *
 * Ensures that command and service registrations are properly added to context.registrations for
 * cleanup when the extension is deactivated.
 *
 * Pattern expected: const commandPromise = papi.commands.registerCommand('name', handler);
 * context.registrations.add(await commandPromise);
 *
 * Or: context.registrations.add(await papi.commands.registerCommand('name', handler));
 *
 * See: .context/standards/Entry-Point-Guide.md
 */
export default createRule({
  name: 'registration-cleanup',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure registrations are added to context.registrations for cleanup',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      missingCleanup:
        "Registration result '{{name}}' should be added to context.registrations.add() for proper cleanup.",
      unusedRegistration:
        'Registration call result is not captured. Store in a variable and add to context.registrations.add().',
    },
  },
  defaultOptions: [],

  create(context) {
    const filename = context.getFilename();

    // Only check extension main.ts files
    if (!filename.includes('/extensions/') || !filename.endsWith('/main.ts')) {
      return {};
    }

    // Track registration promise variables
    const registrationVariables = new Set<string>();
    // Track variables that have been added to context.registrations
    const cleanedUpVariables = new Set<string>();

    /** Check if a call expression is a registration method. */
    function isRegistrationCall(node: TSESTree.CallExpression): boolean {
      // papi.commands.registerCommand(...)
      if (node.callee.type === 'MemberExpression') {
        const callee = node.callee;
        if (callee.property.type === 'Identifier') {
          const methodName = callee.property.name;
          if (!REGISTRATION_METHODS.includes(methodName)) return false;

          // Check if it's on papi.commands, papi.webViewProviders, etc.
          if (callee.object.type === 'MemberExpression') {
            const obj = callee.object;
            if (
              obj.object.type === 'Identifier' &&
              obj.object.name === 'papi' &&
              obj.property.type === 'Identifier' &&
              REGISTRATION_OBJECTS.includes(obj.property.name)
            ) {
              return true;
            }
          }
        }
      }
      return false;
    }

    return {
      // Track variable declarations that store registration results
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.id.type !== 'Identifier') return;
        if (!node.init) return;

        const varName = node.id.name;

        // Check if init is a registration call
        if (node.init.type === 'CallExpression' && isRegistrationCall(node.init)) {
          registrationVariables.add(varName);
        }

        // Check if init is await of registration call
        if (
          node.init.type === 'AwaitExpression' &&
          node.init.argument.type === 'CallExpression' &&
          isRegistrationCall(node.init.argument)
        ) {
          registrationVariables.add(varName);
        }
      },

      // Track context.registrations.add() calls
      CallExpression(node: TSESTree.CallExpression) {
        // Check if this is context.registrations.add(...)
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee;
          if (
            callee.property.type === 'Identifier' &&
            callee.property.name === 'add' &&
            callee.object.type === 'MemberExpression'
          ) {
            const obj = callee.object;
            if (
              obj.property.type === 'Identifier' &&
              obj.property.name === 'registrations' &&
              obj.object.type === 'Identifier' &&
              obj.object.name === 'context'
            ) {
              // context.registrations.add(something)
              for (const arg of node.arguments) {
                // context.registrations.add(varName) or context.registrations.add(await varName)
                if (arg.type === 'Identifier') {
                  cleanedUpVariables.add(arg.name);
                } else if (arg.type === 'AwaitExpression' && arg.argument.type === 'Identifier') {
                  cleanedUpVariables.add(arg.argument.name);
                }
                // context.registrations.add(await papi.commands.registerCommand(...))
                // This is fine - registration is inline and cleaned up
              }
            }
          }
        }
      },

      // At end of file, check for uncleaned registrations
      'Program:exit'() {
        for (const varName of registrationVariables) {
          if (!cleanedUpVariables.has(varName)) {
            // Find the variable declaration to report on
            // We'll report at program level since we don't track node references
            context.report({
              loc: { line: 1, column: 0 },
              messageId: 'missingCleanup',
              data: { name: varName },
            });
          }
        }
      },
    };
  },
});
