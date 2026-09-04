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

/**
 * Stands in for `https.get` across a REDIRECT CHAIN, serving one scripted response per hop.
 *
 * GitHub raw and LFS redirect on every real download, so the first response of every fetch is one
 * `downloadFile` abandons - the hop the single-response stub above cannot reach.
 */
function stubHttpsGetSequence(hops: ((response: PassThrough, hop: number) => void)[]) {
  let hop = 0;
  const requests: EventEmitter[] = [];
  const urls: string[] = [];
  vi.spyOn(https, 'get').mockImplementation(
    // @ts-expect-error ts(2345) - a test stub for one call shape, not the full `https.get` surface
    (url: string, callback: (response: unknown) => void) => {
      // The real `https.get` REJECTS a URL it cannot use by throwing SYNCHRONOUSLY, before it
      // returns the request an error listener would be attached to. A stub that accepted anything
      // would make the redirect-target tests pass on a value the real client never accepts.
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:')
        throw Object.assign(new Error(`Protocol "${parsed.protocol}" not supported.`), {
          code: 'ERR_INVALID_PROTOCOL',
        });
      urls.push(url);
      const request = new EventEmitter();
      requests.push(request);
      const response = new PassThrough();
      Object.assign(response, { statusCode: 200, headers: {} });
      const index = hop;
      hop += 1;
      setImmediate(() => {
        // Scripted BEFORE the callback, not after: `handleResponse` reads `statusCode` the moment
        // it is handed the response, so a script that sets it afterwards would send every hop down
        // the 200 path and quietly never exercise the redirect branch at all.
        // Past the end of the script the chain TERMINATES rather than repeating its last hop, so a
        // test that abandons a download mid-chain cannot leave a live redirect chain running on
        // into whichever test happens to follow it.
        const scripted = hops[index];
        if (scripted) scripted(response, index);
        else Object.assign(response, { statusCode: 200, headers: {} });
        callback(response);
        if (!scripted) response.end('');
      });
      return request;
    },
  );
  return { requestCount: () => hop, requests, urls: () => urls };
}

/** Turns a scripted response into a 302 pointing at the next hop. */
function redirectTo(location: string) {
  return (response: PassThrough) => {
    Object.assign(response, { statusCode: 302, headers: { location } });
  };
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

  it('rejects rather than crashing when a redirect hop drops its connection', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, GOOD_TEXT);

    // The redirect response is abandoned by design - nothing pipes it anywhere. Without an error
    // listener attached BEFORE the redirect branch returns, this `error` is unhandled, which Node
    // raises process-wide and which would take the whole `postinstall` down rather than failing
    // this one fetch.
    stubHttpsGetSequence([
      (response) => {
        Object.assign(response, {
          statusCode: 302,
          headers: { location: 'https://example.invalid/redirected' },
        });
        setImmediate(() => response.emit('error', new Error('socket hang up on the redirect')));
      },
    ]);

    await expect(downloadFile('https://example.invalid/LICENSE.md', destination)).rejects.toThrow(
      'socket hang up on the redirect',
    );

    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });

  it('gives up on an endless redirect chain instead of following it forever', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, GOOD_TEXT);

    // Every hop redirects, forever - the shape a misconfigured host or a redirect loop produces.
    let gets = 0;
    vi.spyOn(https, 'get').mockImplementation(
      // @ts-expect-error ts(2345) - a test stub for one call shape, not the full `https.get` surface
      (_url: string, callback: (response: unknown) => void) => {
        const request = new EventEmitter();
        const response = new PassThrough();
        gets += 1;
        Object.assign(response, {
          statusCode: 302,
          headers: { location: 'https://example.invalid/loop' },
        });
        setImmediate(() => callback(response));
        return request;
      },
    );

    await expect(downloadFile('https://example.invalid/LICENSE.md', destination)).rejects.toThrow(
      /more than \d+ redirects/,
    );

    // Bounded, not merely terminated: an unbounded chain recurses until the stack or the socket
    // pool gives out, which hangs `npm install` rather than failing it. One initial request plus
    // the capped number of hops.
    expect(gets).toBe(6);
    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });

  it('follows a redirect to a real body, as every GitHub download does', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');

    stubHttpsGetSequence([
      redirectTo('https://example.invalid/redirected'),
      (response) => response.end(GOOD_TEXT),
    ]);

    await downloadFile('https://example.invalid/LICENSE.md', destination);

    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });

  it('rejects exactly once, leaving no staging file, when the rename fails after a complete body', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, GOOD_TEXT);

    // The body lands correctly and only the rename fails, which is the window in which the
    // teardown path must NOT be re-entered: it assumes an incomplete download, and reaching it
    // here would find the promise already claimed and leave it pending forever.
    vi.spyOn(fs, 'rename').mockImplementation(
      // @ts-expect-error ts(2345) - a test stub for the one call shape `downloadFile` uses
      (_from: string, _to: string, callback: (error: Error | undefined) => void) => {
        callback(new Error('EXDEV: cross-device link not permitted'));
      },
    );

    stubHttpsGet((response) => {
      response.end(GOOD_TEXT);
    });

    await expect(downloadFile('https://example.invalid/LICENSE.md', destination)).rejects.toThrow(
      'cross-device link not permitted',
    );

    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });

  it('rejects when the close fails after a complete body, rather than renaming a truncated file', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, GOOD_TEXT);

    // The window between `'finish'` and the rename. A flush or close failure - a full disk found
    // only when the last buffered write lands - is emitted as `'error'` on the stream, and the
    // close callback carries no error to report it with: `close(cb)` registers `cb` as a `'close'`
    // listener and `'close'` is emitted with no arguments. With the download's own teardown handler
    // still attached, that error is swallowed and the rename goes ahead, replacing a complete
    // license text with a truncated one and reporting success.
    const createWriteStream = fs.createWriteStream.bind(fs);
    vi.spyOn(fs, 'createWriteStream').mockImplementation(
      // @ts-expect-error ts(2345) - a test stub for the one call shape `downloadFile` uses
      (file: string) => {
        const stream = createWriteStream(file);
        const close = stream.close.bind(stream);
        Object.defineProperty(stream, 'close', {
          value: (callback?: () => void) => {
            stream.emit('error', new Error('EIO: i/o error on flush'));
            close(callback);
          },
        });
        return stream;
      },
    );

    stubHttpsGet((response) => {
      response.end('Attribution-ShareAlike 4.0 Inter');
    });

    await expect(downloadFile('https://example.invalid/LICENSE.md', destination)).rejects.toThrow(
      'i/o error on flush',
    );

    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });

  it('resolves a relative redirect target against the URL that produced it', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');

    // RFC 7231 section 7.1.2 permits a relative `Location`, and `https.get` throws
    // `ERR_INVALID_URL` on one - synchronously, before the request its error listener would attach
    // to exists, and from inside a `'response'` listener where nothing else catches it either.
    const stub = stubHttpsGetSequence([
      redirectTo('/lfs/redirected'),
      (response) => response.end(GOOD_TEXT),
    ]);

    await downloadFile('https://example.invalid/notices/LICENSE.md', destination);

    expect(stub.urls()).toEqual([
      'https://example.invalid/notices/LICENSE.md',
      'https://example.invalid/lfs/redirected',
    ]);
    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
  });

  it('rejects rather than crashing on a redirect to a URL it cannot follow', async () => {
    const dir = makeTempDir();
    const destination = path.join(dir, 'LICENSE.md');
    fs.writeFileSync(destination, GOOD_TEXT);

    // A captive portal answering an `http:` Location. `https.get` throws `ERR_INVALID_PROTOCOL`
    // synchronously, so the failure has to be caught at the call site and routed into the promise -
    // otherwise the promise never settles and `postinstall` dies on an uncaught exception.
    stubHttpsGetSequence([redirectTo('http://portal.invalid/login')]);

    await expect(downloadFile('https://example.invalid/LICENSE.md', destination)).rejects.toThrow(
      /not supported/,
    );

    expect(fs.readFileSync(destination, 'utf8')).toBe(GOOD_TEXT);
    expect(fs.existsSync(`${destination}.part`)).toBe(false);
  });
});
