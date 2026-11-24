import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import JSZip from 'jszip';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  assertNoDanglingLicensePointers,
  danglingPointersInFiles,
  danglingPointersInZip,
  licensePointersIn,
} from './license-pointers';

const POINTER_COMMENT = '/*! For license information please see main.js.LICENSE.txt */';

let tmp: string;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'license-pointers-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

function write(relativePath: string, content: string): void {
  const full = path.join(tmp, relativePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

describe('licensePointersIn', () => {
  it('captures exactly the file name inside an escaped string', () => {
    const source =
      'const s = "x\\n\\/*! For license information please see x.LICENSE.txt *\\/\\ny";';
    expect(licensePointersIn(source)).toEqual(['x.LICENSE.txt']);
  });

  it('gives the same answer when called again on the same source', () => {
    expect(licensePointersIn(POINTER_COMMENT)).toEqual(['main.js.LICENSE.txt']);
    expect(licensePointersIn(POINTER_COMMENT)).toEqual(['main.js.LICENSE.txt']);
  });
});

describe('danglingPointersInFiles', () => {
  it('is clean when the pointed-to file sits beside the script', () => {
    write('main/main.js', `${POINTER_COMMENT}\nconsole.log(1);`);
    write('main/main.js.LICENSE.txt', 'text');
    expect(danglingPointersInFiles(tmp)).toEqual({ scanned: 1, dangling: [] });
  });

  it('reports a pointer whose file is absent, relative to the root', () => {
    write('main/main.js', `${POINTER_COMMENT}\nconsole.log(1);`);
    expect(danglingPointersInFiles(tmp)).toEqual({
      scanned: 1,
      dangling: ['main/main.js -> main.js.LICENSE.txt'],
    });
  });

  it('reports a repeated pointer once per script', () => {
    write('a.js', `${POINTER_COMMENT}\n${POINTER_COMMENT}`);
    expect(danglingPointersInFiles(tmp).dangling).toEqual(['a.js -> main.js.LICENSE.txt']);
  });

  it('finds a pointer inside a string with escaped slashes', () => {
    write(
      'main.js',
      'const s = "\\n\\/*! For license information please see x.LICENSE.txt *\\/\\n";',
    );
    expect(danglingPointersInFiles(tmp).dangling).toEqual(['main.js -> x.LICENSE.txt']);
    write('x.LICENSE.txt', 'text');
    expect(danglingPointersInFiles(tmp).dangling).toEqual([]);
  });

  it('ignores non-js files', () => {
    write('notes.txt', POINTER_COMMENT);
    expect(danglingPointersInFiles(tmp)).toEqual({ scanned: 0, dangling: [] });
  });
});

/** Writes a real zip holding `entries` under `tmp` and returns its path. */
async function zipWith(entries: Record<string, string>, fileName = 'ext.zip'): Promise<string> {
  const zip = new JSZip();
  Object.entries(entries).forEach(([name, content]) => zip.file(name, content));
  const zipPath = path.join(tmp, fileName);
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  fs.writeFileSync(zipPath, await zip.generateAsync({ type: 'nodebuffer' }));
  return zipPath;
}

describe('danglingPointersInZip', () => {
  const POINTER = '/*! For license information please see send-receive.web-view.js.LICENSE.txt */';

  it('reports a pointer whose file is not in the zip, naming the zip', async () => {
    const zipPath = await zipWith({ 'ext/src/main.js': POINTER });
    expect(await danglingPointersInZip(zipPath)).toEqual({
      scanned: 1,
      dangling: ['ext.zip!ext/src/main.js -> send-receive.web-view.js.LICENSE.txt'],
    });
  });

  it('is clean when the file is beside the script inside the zip', async () => {
    const zipPath = await zipWith({
      'ext/src/main.js': POINTER,
      'ext/src/send-receive.web-view.js.LICENSE.txt': 'text',
    });
    expect(await danglingPointersInZip(zipPath)).toEqual({ scanned: 1, dangling: [] });
  });

  it('does not accept the file from a different folder of the zip', async () => {
    const zipPath = await zipWith({
      'ext/src/main.js': POINTER,
      'ext/send-receive.web-view.js.LICENSE.txt': 'text',
    });
    expect((await danglingPointersInZip(zipPath)).dangling).toHaveLength(1);
  });

  it('names the zip when its bytes are not a zip', async () => {
    const zipPath = path.join(tmp, 'broken.zip');
    fs.writeFileSync(zipPath, 'these bytes are not a zip');
    await expect(danglingPointersInZip(zipPath)).rejects.toThrow(zipPath);
  });
});

describe('assertNoDanglingLicensePointers', () => {
  it('refuses an empty release/app/dist', async () => {
    fs.mkdirSync(path.join(tmp, 'release/app/dist'), { recursive: true });
    await expect(assertNoDanglingLicensePointers({ repo: tmp, externalZips: [] })).rejects.toThrow(
      /nothing was built/,
    );
  });

  it('accepts a clean build with no extensions/dist', async () => {
    write('release/app/dist/main.js', 'console.log(1);');
    await expect(
      assertNoDanglingLicensePointers({ repo: tmp, externalZips: [] }),
    ).resolves.toBeUndefined();
  });

  it('lists dangling pointers from the build folders', async () => {
    write('release/app/dist/main.js', POINTER_COMMENT);
    write('extensions/dist/ext/main.js', POINTER_COMMENT);
    const check = assertNoDanglingLicensePointers({ repo: tmp, externalZips: [] });
    await expect(check).rejects.toThrow('release/app/dist/main.js -> main.js.LICENSE.txt');
    await expect(check).rejects.toThrow('extensions/dist/ext/main.js -> main.js.LICENSE.txt');
  });

  describe('over external extension zips', () => {
    const WEB_VIEW_POINTER =
      '/*! For license information please see ext.web-view.js.LICENSE.txt */';

    beforeEach(() => {
      write('release/app/dist/main.js', 'console.log(1);');
    });

    it('refuses a zip whose bundle points at a .LICENSE.txt it does not carry', async () => {
      const zipPath = await zipWith(
        { 'ext/src/main.js': WEB_VIEW_POINTER },
        'zips/ext-one_1.0.0.zip',
      );
      await expect(
        assertNoDanglingLicensePointers({ repo: tmp, externalZips: [zipPath] }),
      ).rejects.toThrow('ext-one_1.0.0.zip!ext/src/main.js -> ext.web-view.js.LICENSE.txt');
    });

    it('accepts a zip that carries the file its bundle points at', async () => {
      const zipPath = await zipWith(
        {
          'ext/src/main.js': WEB_VIEW_POINTER,
          'ext/src/ext.web-view.js.LICENSE.txt': 'text',
        },
        'zips/ext-one_1.0.0.zip',
      );
      await expect(
        assertNoDanglingLicensePointers({ repo: tmp, externalZips: [zipPath] }),
      ).resolves.toBeUndefined();
    });
  });
});
