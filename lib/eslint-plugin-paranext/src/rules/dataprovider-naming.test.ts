import rule from './dataprovider-naming';
import { ruleTester } from '../test-utils';

ruleTester.run('dataprovider-naming', rule, {
  valid: [
    // Valid provider name in DataProviders interface
    {
      code: `
        declare module 'papi-shared-types' {
          interface DataProviders {
            'platformScripture.scriptureData': SomeType;
          }
        }
      `,
    },
    // Property outside DataProviders interface is not checked
    {
      code: `
        interface SomeOther {
          'Bad-Name.Here': string;
        }
      `,
    },
    // Non-literal key is not checked
    {
      code: `
        declare module 'papi-shared-types' {
          interface DataProviders {
            [key: string]: SomeType;
          }
        }
      `,
    },
    // Valid provider name in ProjectDataProviderInterfaces interface
    {
      code: `
        declare module 'papi-shared-types' {
          interface ProjectDataProviderInterfaces {
            'platformScripture.scriptureProject': SomeType;
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        declare module 'papi-shared-types' {
          interface DataProviders {
            'PlatformScripture.ScriptureData': SomeType;
          }
        }
      `,
      output: `
        declare module 'papi-shared-types' {
          interface DataProviders {
            'platformScripture.scriptureData': SomeType;
          }
        }
      `,
      errors: [{ messageId: 'invalidDataProviderName' }],
    },
    {
      code: `
        declare module 'papi-shared-types' {
          interface DataProviders {
            'platform-scripture.data': SomeType;
          }
        }
      `,
      output: `
        declare module 'papi-shared-types' {
          interface DataProviders {
            'platformscripture.data': SomeType;
          }
        }
      `,
      errors: [{ messageId: 'invalidDataProviderName' }],
    },
    // Invalid name in ProjectDataProviderInterfaces
    {
      code: `
        declare module 'papi-shared-types' {
          interface ProjectDataProviderInterfaces {
            'PlatformScripture.ScriptureProject': SomeType;
          }
        }
      `,
      output: `
        declare module 'papi-shared-types' {
          interface ProjectDataProviderInterfaces {
            'platformScripture.scriptureProject': SomeType;
          }
        }
      `,
      errors: [{ messageId: 'invalidDataProviderName' }],
    },
  ],
});
