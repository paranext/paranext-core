import rule from './service-file-naming';
import { ruleTester } from '../test.utils';

ruleTester.run('service-file-naming', rule, {
  valid: [
    // Correct service file in services dir
    {
      code: `export class MyService {}`,
      filename: '/src/shared/services/my.service.ts',
    },
    // Service-host file in services dir
    {
      code: `export class MyServiceHost {}`,
      filename: '/src/extension-host/services/my.service-host.ts',
    },
    // Service-model file in services dir
    {
      code: `export type MyModel = {};`,
      filename: '/src/shared/services/my.service-model.ts',
    },
    // Service-model file in models dir
    {
      code: `export type MyModel = {};`,
      filename: '/src/shared/models/my.service-model.ts',
    },
    // Non-service file is not checked
    {
      code: `export const x = 1;`,
      filename: '/src/shared/utils/helper.ts',
    },
    // Test files are skipped
    {
      code: `describe('test', () => {});`,
      filename: '/src/shared/services/my-service.test.ts',
    },
  ],
  invalid: [
    // Service-like file not in services dir
    {
      code: `export class MyService {}`,
      filename: '/src/shared/my.service.ts',
      errors: [{ messageId: 'serviceNotInServicesDir' }],
    },
    // Service-like file with wrong suffix
    {
      code: `export class DataService {}`,
      filename: '/src/shared/services/data-service.ts',
      errors: [{ messageId: 'serviceWrongExtension' }],
    },
    // Service-model file not in services or models dir
    {
      code: `export type MyModel = {};`,
      filename: '/src/shared/utils/my.service-model.ts',
      errors: [{ messageId: 'serviceModelNotInDir' }],
    },
  ],
});
