import rule from './registration-structure';
import { ruleTester } from '../test-utils';

ruleTester.run('registration-structure', rule, {
  valid: [
    // Command with full metadata
    {
      code: `
        registerCommand('ext.cmd', handler, {
          method: {
            summary: 'Does something',
            params: [],
            result: { name: 'result', schema: {} },
          },
        });
      `,
    },
    // Command with method summary only (satisfies required props)
    {
      code: `
        registerCommand('ext.cmd', handler, {
          method: {
            summary: 'Does something',
          },
        });
      `,
    },
    // Two-argument call (no metadata) is not flagged
    {
      code: `registerCommand('ext.cmd', handler)`,
    },
    // Non-registerCommand calls ignored
    {
      code: `someFunction('ext.cmd', handler, 'bad-metadata')`,
    },
  ],
  invalid: [
    // Third argument is not an object
    {
      code: `registerCommand('ext.cmd', handler, 'not-an-object')`,
      errors: [{ messageId: 'missingMetadata' }],
    },
    // Missing method property in metadata
    {
      code: `registerCommand('ext.cmd', handler, { description: 'foo' })`,
      errors: [{ messageId: 'missingMetadata' }],
    },
    // method object missing summary
    {
      code: `
        registerCommand('ext.cmd', handler, {
          method: {
            params: [],
          },
        });
      `,
      errors: [{ messageId: 'missingMethodProperty' }],
    },
  ],
});
