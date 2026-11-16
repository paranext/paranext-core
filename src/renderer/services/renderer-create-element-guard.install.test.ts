import { JSDOM } from 'jsdom';
import vm from 'node:vm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { installCreateElementGuard } from './renderer-create-element-guard.util';

const HTML = '<!doctype html><body></body>';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';

/** Runs `code` in a foreign realm and returns the name of what it threw, or `'no throw'` */
const THROWN_NAME = (code: string) =>
  `(() => { try { ${code}; return 'no throw'; } catch (e) { return e.name; } })()`;

function asRealm(dom: JSDOM): typeof globalThis {
  // JSDOM types its window as `DOMWindow`, which is not `typeof globalThis` even though at runtime
  // it is a complete realm global with `Document`, `Error`, `Object`, `String` and `Reflect`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return dom.window as unknown as typeof globalThis;
}

describe('installCreateElementGuard', () => {
  let app: JSDOM;
  let web: JSDOM;
  let rendererBundleFileName: string;
  let onAllowed: ReturnType<typeof vi.fn<(tagName: string, stackText: string) => void>>;
  let runTrusted: (code: string) => unknown;
  let runForeign: (code: string) => unknown;

  beforeEach(() => {
    app = new JSDOM(HTML, { runScripts: 'outside-only' });
    onAllowed = vi.fn<(tagName: string, stackText: string) => void>();
    ({ rendererBundleFileName } = installCreateElementGuard({
      realm: asRealm(app),
      restrictedTagNames: ['script', 'iframe', 'a', 'form', 'base'],
      onAllowed,
      onRejected: (tagName) => {
        throw new Error(`rejected ${tagName}`);
      },
    }));
    runTrusted = (code) =>
      vm.runInContext(code, app.getInternalVMContext(), { filename: rendererBundleFileName });

    web = new JSDOM(HTML, { runScripts: 'outside-only' });
    vm.runInContext('0', web.getInternalVMContext());
    Object.assign(web.window, { appWindow: app.window, bundle: rendererBundleFileName });
    runForeign = (code) =>
      vm.runInContext(code, web.getInternalVMContext(), { filename: 'about:srcdoc' });
  });

  it('allows a guarded tag from the renderer bundle', () => {
    expect(runTrusted("document.createElement('script').tagName")).toBe('SCRIPT');
    expect(onAllowed).toHaveBeenCalledWith('script', expect.any(String));
  });

  it('rejects a guarded tag from another realm', () => {
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
      /rejected script/,
    );
  });

  it('creates unguarded tags for anyone', () => {
    expect(runForeign("appWindow.document.createElement('div').tagName")).toBe('DIV');
    expect(onAllowed).not.toHaveBeenCalled();
  });

  it('rejects a newline-named foreign function', () => {
    expect(() =>
      runForeign(`
        function f() { return appWindow.document.createElement('script'); }
        Object.defineProperty(f, 'name', { value: 'x (' + bundle + ':1:1)\\n    at y' });
        f();
      `),
    ).toThrow(/rejected script/);
  });

  it("rejects eval code labelled with the bundle's sourceURL", () => {
    expect(() =>
      runForeign(`eval("appWindow.document.createElement('script')\\n//# sourceURL=" + bundle)`),
    ).toThrow(/rejected script/);
  });

  it('ignores a hijacked prepareStackTrace', () => {
    expect(() =>
      runForeign(`
        appWindow.Error.prepareStackTrace = () => [{ getFileName: () => bundle }];
        appWindow.document.createElement('script');
      `),
    ).toThrow(/rejected script/);
    expect(runTrusted("document.createElement('script').tagName")).toBe('SCRIPT');
  });

  it('legitimate hook still formats other errors', () => {
    expect(runTrusted("Error.prepareStackTrace = () => 'MINE'; new Error().stack")).toBe('MINE');
    expect(runTrusted("document.createElement('script').tagName")).toBe('SCRIPT');
    expect(runTrusted('new Error().stack')).toBe('MINE');
  });

  it('rejects after stackTraceLimit is zeroed, then restores it', () => {
    expect(() =>
      runForeign(`
        appWindow.Error.stackTraceLimit = 0;
        appWindow.document.createElement('script');
      `),
    ).toThrow(/rejected script/);
    expect(runTrusted("document.createElement('iframe').tagName")).toBe('IFRAME');
    expect(app.window.Error.stackTraceLimit).toBe(0);
  });

  it('poisoned intrinsics do not change the answer', () => {
    runForeign(`
      appWindow.String.prototype.toLowerCase = () => 'div';
      appWindow.Error.prepareStackTrace = (e, s) => { globalThis.proto = Object.getPrototypeOf(s[0]); };
    `);
    runTrusted('new Error().stack');
    expect(runForeign('typeof proto.getFileName')).toBe('function');
    // Node 22's V8 makes `CallSite` prototype methods read-only, so this sloppy-mode assignment is
    // silently ignored there; it stays to cover an engine that leaves them writable
    runForeign('proto.getFileName = () => bundle;');

    const originalExec = RegExp.prototype.exec;
    const fakeMatch = originalExec.call(/(?:)/, '');
    let foreignResult: unknown;
    let trustedResult: unknown;
    // Matches only the attacker's file name: jsdom shares this realm, and an `exec` that never
    // returns `null` sends its global-regex `replace` calls into an endless loop
    const execSpy = vi.spyOn(RegExp.prototype, 'exec').mockImplementation(function poisonedExec(
      this: RegExp,
      input: string,
    ) {
      return input === 'about:srcdoc' ? fakeMatch : originalExec.call(this, input);
    });
    try {
      try {
        foreignResult = runForeign("appWindow.document.createElement('script')");
      } catch (error) {
        foreignResult = error;
      }
      trustedResult = runTrusted("document.createElement('script').tagName");
    } finally {
      execSpy.mockRestore();
    }
    expect(foreignResult).toBeInstanceOf(Error);
    expect(String(foreignResult)).toContain('rejected script');
    expect(trustedResult).toBe('SCRIPT');
  });

  it('guards the prototype and namespaced methods', () => {
    expect(() =>
      runForeign("appWindow.Document.prototype.createElement.call(appWindow.document, 'script')"),
    ).toThrow(/rejected script/);
    expect(() =>
      runForeign(`appWindow.document.createElementNS('${SVG_NAMESPACE}', 'script')`),
    ).toThrow(/rejected script/);
    expect(() =>
      runForeign(`appWindow.document.createElementNS('${SVG_NAMESPACE}', 'svg:script')`),
    ).toThrow(/rejected script/);
  });

  it('judges the string the native method receives', () => {
    expect(
      runForeign(
        "appWindow.document.createElement({ n: 0, toString() { return this.n++ ? 'script' : 'div'; } }).tagName",
      ),
    ).toBe('DIV');
    expect(() => runForeign("appWindow.document.createElement('SCRIPT')")).toThrow(
      /rejected script/,
    );
    expect(() => runForeign("appWindow.document.createElement('IfRaMe')")).toThrow(
      /rejected iframe/,
    );
    expect(runForeign('appWindow.document.createElement(undefined).tagName')).toBe('UNDEFINED');
  });

  it('rejects a guarded call through a builtin frame', () => {
    expect(() => runTrusted("['script'].map(document.createElement, document)")).toThrow(
      /rejected script/,
    );
  });

  it('restores state after a rejection', () => {
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow();
    expect(runTrusted("new Error('x').stack.split('\\n').length > 1")).toBe(true);
  });

  it('forwards options', () => {
    const code = `document.createElementNS('${XHTML_NAMESPACE}', 'div', { is: 'x-a' }).getAttribute('is')`;
    const uninstalled = new JSDOM(HTML, { runScripts: 'outside-only' });
    const nativeResult = vm.runInContext(code, uninstalled.getInternalVMContext());
    expect(runTrusted(code)).toBe(nativeResult);
  });

  it('locks the patched methods and the hook', () => {
    expect(
      runForeign(
        THROWN_NAME(
          "Object.defineProperty(appWindow.Document.prototype, 'createElement', { value: () => 0 })",
        ),
      ),
    ).toBe('TypeError');
    expect(
      runForeign(
        THROWN_NAME(
          "Object.defineProperty(appWindow.Error, 'prepareStackTrace', { value: () => 0 })",
        ),
      ),
    ).toBe('TypeError');
    runForeign('appWindow.Document.prototype.createElement = () => 0;');
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
      /rejected script/,
    );
  });

  it('refuses to install over a locked hook', () => {
    const locked = new JSDOM(HTML, { runScripts: 'outside-only' });
    Object.defineProperty(locked.window.Error, 'prepareStackTrace', {
      value: undefined,
      configurable: false,
    });
    expect(() =>
      installCreateElementGuard({
        realm: asRealm(locked),
        restrictedTagNames: ['script'],
        onAllowed: vi.fn(),
        onRejected: (tagName) => {
          throw new Error(`rejected ${tagName}`);
        },
      }),
    ).toThrow();
  });
});
