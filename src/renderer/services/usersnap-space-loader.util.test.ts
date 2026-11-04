import { afterEach, describe, expect, it } from 'vitest';
import { loadUsersnapSpace } from '@renderer/services/usersnap-space-loader.util';

const SPACE_API_KEY = 'test-space-key';

function getLoaderScripts(): HTMLScriptElement[] {
  return Array.from(document.head.querySelectorAll('script'));
}

/** Name of the global callback the loader script calls, read from the script's `onload` parameter */
function getCallbackName(script: HTMLScriptElement): string {
  const callbackName = new URL(script.src).searchParams.get('onload');
  if (!callbackName) throw new Error(`Loader script has no onload callback: ${script.src}`);
  return callbackName;
}

/** Plays the part of Usersnap's loader script finishing: it calls the callback named in its URL */
function finishLoading(script: HTMLScriptElement, spaceApi: unknown): void {
  const callback: unknown = Reflect.get(window, getCallbackName(script));
  if (typeof callback !== 'function') throw new Error('Loader callback is not on window');
  callback(spaceApi);
}

describe('loadUsersnapSpace', () => {
  afterEach(() => {
    document.head.innerHTML = '';
  });

  it("adds Usersnap's loader script for the space and resolves to the space the script hands back", async () => {
    const spaceApi = { init: () => {} };

    const load = loadUsersnapSpace(SPACE_API_KEY);
    const [script] = getLoaderScripts();

    const url = new URL(script.src);
    expect(`${url.origin}${url.pathname}`).toBe(
      `https://widget.usersnap.com/global/load/${SPACE_API_KEY}`,
    );
    finishLoading(script, spaceApi);
    await expect(load).resolves.toBe(spaceApi);
    expect(Reflect.has(window, getCallbackName(script))).toBe(false);
  });

  it('rejects when the script cannot be loaded, and removes the script and its callback', async () => {
    const load = loadUsersnapSpace(SPACE_API_KEY);
    const [script] = getLoaderScripts();
    const callbackName = getCallbackName(script);

    script.dispatchEvent(new Event('error'));

    await expect(load).rejects.toThrow(
      'Could not load the Usersnap widget script from https://widget.usersnap.com',
    );
    expect(getLoaderScripts()).toHaveLength(0);
    expect(Reflect.has(window, callbackName)).toBe(false);
  });

  it('loads afresh after a failure instead of handing back the failed attempt', async () => {
    const spaceApi = { init: () => {} };
    const failedLoad = loadUsersnapSpace(SPACE_API_KEY);
    getLoaderScripts()[0].dispatchEvent(new Event('error'));
    await expect(failedLoad).rejects.toThrow();

    const retry = loadUsersnapSpace(SPACE_API_KEY);
    const [retryScript] = getLoaderScripts();
    finishLoading(retryScript, spaceApi);

    await expect(retry).resolves.toBe(spaceApi);
  });

  it('creates the script from a named function, which the renderer document guard requires', () => {
    // The guard on `document.createElement` lets the renderer's own code create a `<script>` only
    // when the frame calling it is a named function in the renderer bundle. An anonymous function,
    // such as a Promise executor, prints as `at <file>:<line>:<column>` and is rejected.
    // Patched the way the guard patches it, so the frame after the patch is the caller's
    const createElementOriginal = document.createElement;
    let callerFrame: string | undefined;
    document.createElement = function createElementRecordingCaller(
      ...args: Parameters<Document['createElement']>
    ) {
      callerFrame = (Error().stack ?? '').split('\n')[2]?.trim();
      return createElementOriginal.apply(document, args);
    };
    try {
      loadUsersnapSpace(SPACE_API_KEY).catch(() => {});
    } finally {
      document.createElement = createElementOriginal;
    }

    expect(callerFrame).toMatch(/^at \S*loadUsersnapSpace \(/);
  });

  it('gives each load its own callback, so two loads cannot answer each other', async () => {
    const firstSpace = { name: 'first' };
    const secondSpace = { name: 'second' };

    const firstLoad = loadUsersnapSpace(SPACE_API_KEY);
    const secondLoad = loadUsersnapSpace(SPACE_API_KEY);
    const [firstScript, secondScript] = getLoaderScripts();
    expect(getCallbackName(firstScript)).not.toBe(getCallbackName(secondScript));

    finishLoading(secondScript, secondSpace);
    finishLoading(firstScript, firstSpace);

    await expect(firstLoad).resolves.toBe(firstSpace);
    await expect(secondLoad).resolves.toBe(secondSpace);
  });
});
