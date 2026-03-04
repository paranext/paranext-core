import rule from './registration-cleanup';
import { ruleTester } from '../test.utils';

ruleTester.run('registration-cleanup', rule, {
  valid: [
    // Registration with cleanup
    {
      code: `
        const cmdPromise = papi.commands.registerCommand('ext.cmd', handler);
        context.registrations.add(await cmdPromise);
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // Inline registration with cleanup
    {
      code: `
        context.registrations.add(await papi.commands.registerCommand('ext.cmd', handler));
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
    },
    // Non-extension file is not checked
    {
      code: `
        const cmdPromise = papi.commands.registerCommand('ext.cmd', handler);
      `,
      filename: '/src/shared/services/my.service.ts',
    },
    // Non-main.ts extension file is not checked
    {
      code: `
        const cmdPromise = papi.commands.registerCommand('ext.cmd', handler);
      `,
      filename: '/extensions/src/my-ext/src/helper.ts',
    },
  ],
  invalid: [
    // Registration without cleanup
    {
      code: `
        const cmdPromise = papi.commands.registerCommand('ext.cmd', handler);
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
      errors: [{ messageId: 'missingCleanup' }],
    },
    // Await registration stored but not cleaned up
    {
      code: `
        const disposable = await papi.commands.registerCommand('ext.cmd', handler);
      `,
      filename: '/extensions/src/my-ext/src/main.ts',
      errors: [{ messageId: 'missingCleanup' }],
    },
  ],
});
