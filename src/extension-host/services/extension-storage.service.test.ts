import fs from 'fs';
import path from 'path';
import { vi } from 'vitest';
import { createUuid } from '@node/utils/crypto-util';
import { getAppDir } from '@node/utils/util';
import { ExecutionToken } from '@node/models/execution-token.model';
import { executionTokenService } from '@node/services/execution-token.service';
import {
  buildExtensionUriFromPath,
  extensionStorageService,
  setExtensionUris,
} from './extension-storage.service';

vi.mock('@node/utils/util', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@node/utils/util')>();
  // __dirname is a module global available in the factory closure
  return {
    ...actual,
    /**
     * Gets the dev app directory relative to this file instead of using `getAppDir` because
     * `getAppDir` uses `globalThis.resourcesPath`, which is set to the repo root via command line
     * argument in dev but is not set while testing
     */
    getAppDir: () => path.join(__dirname, '../..'),
  };
});

const extensionName = 'storageTestExtName';
const extensionsBasePath = path.join(getAppDir(), 'test-extensions');
const thisExtensionBasePath = path.join(extensionsBasePath, 'extensions', extensionName);
const thisUserBasePath = path.join(getAppDir(), extensionName);

const resourcesUri = 'resources://extensions';
const testData = 'TEST DATA';

const token: ExecutionToken = executionTokenService.registerExtension(extensionName);

beforeAll(() => {
  globalThis.resourcesPath = extensionsBasePath;
  fs.mkdirSync(thisExtensionBasePath, { recursive: true });
  fs.mkdirSync(thisUserBasePath, { recursive: true });

  setExtensionUris(new Map([[extensionName, `${resourcesUri}/${extensionName}`]]));
});

afterAll(() => {
  try {
    fs.rmSync(extensionsBasePath, { recursive: true });
  } catch {
    // do nothing
  }
  try {
    fs.rmSync(thisUserBasePath, { recursive: true });
  } catch {
    // do nothing
  }
});

beforeEach(() => {
  try {
    fs.rmSync(path.join(thisExtensionBasePath, '*.*'), { recursive: false });
  } catch {
    // do nothing
  }
  try {
    fs.rmSync(path.join(thisUserBasePath, '*.*'), { recursive: false });
  } catch {
    // do nothing
  }
});

test('Reading extension data works', async () => {
  fs.writeFileSync(path.join(thisExtensionBasePath, 'foo.txt'), 'hello, world!');
  const data = await extensionStorageService.readTextFileFromInstallDirectory(token, 'foo.txt');
  expect(data).toEqual('hello, world!');
});

test('reading and writing user data works', async () => {
  const key = createUuid();
  await extensionStorageService.writeUserData(token, key, testData);
  const data = await extensionStorageService.readUserData(token, key);
  expect(data).toEqual(testData);
});

test('erasing user data works', async () => {
  const key = createUuid();
  await extensionStorageService.writeUserData(token, key, testData);
  await extensionStorageService.deleteUserData(token, key);
  await expect(extensionStorageService.readUserData(token, key)).rejects.toBeTruthy();
});

describe('buildExtensionUriFromPath traversal guard', () => {
  test('rejects a path containing ".."', () => {
    expect(() => buildExtensionUriFromPath(extensionName, '../../secret.txt')).toThrow();
  });

  // Extensions reach this across the network, so the declared `string` is not a guarantee. Both
  // guards are string operations that quietly coerce: `Array.prototype.includes` compares elements
  // rather than searching text, and the name regex stringifies its argument. Asserting the guard's
  // own message rather than just `toThrow()` is what makes these falsifiable — a non-string that
  // slips past both guards still throws, but from `joinUriPaths` further down, and that incidental
  // `TypeError` would satisfy a bare `toThrow()` while the traversal check did nothing.
  test.each([
    ['an array holding a traversal path', ['../../secret.txt']],
    ['an object whose string form traverses', { toString: () => '../../secret.txt' }],
    ['a number', 42],
    ['a boolean', true],
  ])('rejects %s at the guard, not incidentally downstream', (_name, filePath) => {
    // The assertion is that a caller lying about the type is rejected, so the lie has to be written
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect(() => buildExtensionUriFromPath(extensionName, filePath as string)).toThrow(
      /Invalid file name/,
    );
  });
});
