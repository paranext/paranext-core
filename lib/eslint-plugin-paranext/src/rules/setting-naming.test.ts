import rule from './setting-naming';
import { ruleTester } from '../test-utils';

ruleTester.run('setting-naming', rule, {
  valid: [
    // Valid setting name in SettingTypes interface
    {
      code: `
        declare module 'papi-shared-types' {
          interface SettingTypes {
            'platformScripture.fontSize': number;
          }
        }
      `,
    },
    // Property outside SettingTypes interface is not checked
    {
      code: `
        interface Other {
          'Bad-Name': string;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        declare module 'papi-shared-types' {
          interface SettingTypes {
            'PlatformScripture.FontSize': number;
          }
        }
      `,
      output: `
        declare module 'papi-shared-types' {
          interface SettingTypes {
            'platformScripture.fontSize': number;
          }
        }
      `,
      errors: [{ messageId: 'invalidSettingName' }],
    },
    {
      code: `
        declare module 'papi-shared-types' {
          interface SettingTypes {
            'platform-scripture.font-size': number;
          }
        }
      `,
      output: `
        declare module 'papi-shared-types' {
          interface SettingTypes {
            'platformScripture.fontSize': number;
          }
        }
      `,
      errors: [{ messageId: 'invalidSettingName' }],
    },
  ],
});
