import fs from 'fs';
import os from 'os';
import path from 'path';
import { createUuid } from '@node/utils/crypto-util';
import { ExecutionToken } from '@node/models/execution-token.model';
import { executionTokenService } from '@node/services/execution-token.service';
import {
  buildExtensionUriFromPath,
  extensionStorageService,
  setExtensionUris,
} from './extension-storage.service';

const extensionName = 'storageTestExtName';
// Set in `beforeAll`, outside the source tree: other tests walk `src/`, and a folder that appears
// and vanishes under them while they read it makes them fail at random. The service keeps user
// data under `getAppDir()`, which is `<resourcesPath>/dev-appdata` while `isPackaged` is false, so
// it lands in this folder too.
let extensionsBasePath = '';
let thisExtensionBasePath = '';
const originalIsPackaged = globalThis.isPackaged;

const resourcesUri = 'resources://extensions';
const testData = 'TEST DATA';

const token: ExecutionToken = executionTokenService.registerExtension(extensionName);

beforeAll(() => {
  extensionsBasePath = fs.mkdtempSync(path.join(os.tmpdir(), 'extension-storage-test-'));
  thisExtensionBasePath = path.join(extensionsBasePath, 'extensions', extensionName);
  globalThis.resourcesPath = extensionsBasePath;
  // A packaged app dir is the user's real data folder
  globalThis.isPackaged = false;
  fs.mkdirSync(thisExtensionBasePath, { recursive: true });

  setExtensionUris(new Map([[extensionName, `${resourcesUri}/${extensionName}`]]));
});

afterAll(() => {
  globalThis.isPackaged = originalIsPackaged;
  try {
    fs.rmSync(extensionsBasePath, { recursive: true });
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
