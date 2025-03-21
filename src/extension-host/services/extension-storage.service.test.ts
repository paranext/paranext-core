import fs from 'fs';
import path from 'path';
import { createUuid } from '@node/utils/crypto-util';
import { getAppDir } from '@node/utils/util';
import { ExecutionToken } from '@node/models/execution-token.model';
import { executionTokenService } from '@node/services/execution-token.service';
import { extensionStorageService, setExtensionUris } from './extension-storage.service';

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
  } catch (error) {
    // do nothing
  }
  try {
    fs.rmSync(thisUserBasePath, { recursive: true });
  } catch (error) {
    // do nothing
  }
});

beforeEach(() => {
  try {
    fs.rmSync(path.join(thisExtensionBasePath, '*.*'), { recursive: false });
  } catch (error) {
    // do nothing
  }
  try {
    fs.rmSync(path.join(thisUserBasePath, '*.*'), { recursive: false });
  } catch (error) {
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
