import rule from './command-naming';
import { ruleTester } from '../test.utils';

ruleTester.run('command-naming', rule, {
  valid: [
    // Direct call with valid name
    { code: `registerCommand('myExtension.doThing', handler)` },
    // Member expression call with valid name
    { code: `papi.commands.registerCommand('platformScripture.openFind', handler)` },
    // Non-registerCommand calls are ignored
    { code: `someFunction('Not-A-Command')` },
    // Non-string argument is ignored
    { code: `registerCommand(commandVar, handler)` },
    // Numeric first arg is ignored
    { code: `registerCommand(42, handler)` },
  ],
  invalid: [
    {
      code: `registerCommand('MyExtension.DoThing', handler)`,
      errors: [{ messageId: 'invalidCommandName' }],
      output: `registerCommand('myExtension.doThing', handler)`,
    },
    {
      code: `papi.commands.registerCommand('PlatformScripture.OpenFind', handler)`,
      errors: [{ messageId: 'invalidCommandName' }],
      output: `papi.commands.registerCommand('platformScripture.openFind', handler)`,
    },
    {
      code: `registerCommand('no-dot-and-bad', handler)`,
      errors: [{ messageId: 'invalidCommandName' }],
    },
  ],
});
