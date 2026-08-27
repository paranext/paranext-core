import fs from 'fs';
import os from 'os';
import path from 'path';
import https from 'https';
import { EventEmitter } from 'events';
import { PassThrough } from 'stream';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { downloadFile } from './download-db';

/**
 * A destination that already holds a good file is the normal state these downloads run against:
 * `runDownload` re-fetches the notice files on EVERY install, so every failure path is a failure
 * path over a correct file.
 */
const GOOD_TEXT = 'Attribution-ShareAlike 4.0 International\n\nThe complete license text.\n';

let tempDirs: string[] = [];

function makeTempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'download-file-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  vi.restoreAllMocks();
  tempDirs.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }));
  tempDirs = [];
});

/**
 * Stands in for `https.get`, handing the caller a response it drives by hand.
 *
 * `https.get` returns the request, which `downloadFile` attaches an error handler to, so the stub
 * has to be an emitter as well as invoke the response callback.
 */
function stubHttpsGet(drive: (response: PassThrough) => void) {
  vi.spyOn(https, 'get').mockImplementation(
    // The real overloads are far wider than this stub needs, and the stub is only ever called the
    // one way `downloadFile` calls it.
    // @ts-expect-error ts(2345) - a test stub for one call shape, not the full `https.get` surface
    (_url: string, callback: (response: unknown) => void) => {
      const request = new EventEmitter();
      const response = new PassThrough();
      Object.assign(response, { statusCode: 200, headers: { 'content-length': '4096' } });
      // After the caller has attached its handlers, which it does synchronously on return.
      setImmediate(() => {
        callback(response);
        drive(response);
      });
      return request;
    },
  );
}

describe('downloadFile', () => {
  it('leaves the existing file intact when the connection drops mid-body', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, GOOD_TEXT);

    stubHttpsGet((response) => {
      response.write('Attribution-ShareAlike 4.0 Inter');
      setImmediate(() => response.emit('error', new Error('socket hang up')));
    });

    await expect(downloadFile('https://example.invalid/LICENSE.md', destination)).rejects.toThrow(
      'socket hang up',
    );

    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });

  it('replaces the file only once the body is complete', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, 'stale');

    stubHttpsGet((response) => {
      response.end(GOOD_TEXT);
    });

    await downloadFile('https://example.invalid/LICENSE.md', destination);

    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });
});
