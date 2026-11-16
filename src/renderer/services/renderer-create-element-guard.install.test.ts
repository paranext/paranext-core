import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
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

  it('ignores a swapped Error binding fed a harvested bundle call site', () => {
    // Node's stack-trace callback finds the hook through the window's `Error` binding, so a swapped
    // binding would run this formatter during the guard's own capture: it harvests a call site from
    // the renderer bundle and hands it to the real hook, which is the guard's formatter right then
    runForeign(`
      globalThis.realError = appWindow.Error;
      const Fake = function () {};
      Fake.prepareStackTrace = (e, sites) => {
        for (const site of sites) if (site.getFileName() === bundle) globalThis.saved = site;
        if (globalThis.saved) {
          const hook = realError.prepareStackTrace;
          if (typeof hook === 'function') hook(e, [globalThis.saved]);
        }
        return '';
      };
      appWindow.Error = Fake;
    `);
    expect(runForeign('appWindow.Error === realError')).toBe(true);
    expect(
      runTrusted("try { null.x; } catch (e) { e.stack; } document.createElement('iframe').tagName"),
    ).toBe('IFRAME');
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
      /rejected script/,
    );
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
    // jsdom serializes `is` but does not report it through `getAttribute`, so compare the markup
    const code = `document.createElementNS('${XHTML_NAMESPACE}', 'div', { is: 'x-a' }).outerHTML`;
    const uninstalled = new JSDOM(HTML, { runScripts: 'outside-only' });
    const nativeResult = vm.runInContext(code, uninstalled.getInternalVMContext());
    expect(nativeResult).toContain('x-a');
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

  it('refuses creation even if onRejected returns', () => {
    const returning = new JSDOM(HTML, { runScripts: 'outside-only' });
    // An unimplemented mock returns, breaking the `never` contract on purpose
    const onRejected = vi.fn<(tagName: string, stackText: string) => never>();
    const { rendererBundleFileName: bundle } = installCreateElementGuard({
      realm: asRealm(returning),
      restrictedTagNames: ['script'],
      onAllowed: vi.fn(),
      onRejected,
    });
    const foreign = new JSDOM(HTML, { runScripts: 'outside-only' });
    Object.assign(foreign.window, { appWindow: returning.window });
    expect(() =>
      vm.runInContext(
        "appWindow.document.createElement('script')",
        foreign.getInternalVMContext(),
        { filename: 'about:srcdoc' },
      ),
    ).toThrow(/Rejected creating new script/);
    expect(onRejected).toHaveBeenCalledWith('script', expect.any(String));
    expect(returning.window.document.getElementsByTagName('script')).toHaveLength(0);
    expect(bundle).toEqual(expect.any(String));
  });

  it('refuses to install over a locked Error binding', () => {
    const locked = new JSDOM(HTML, { runScripts: 'outside-only' });
    // The vm global drops the value when a redefinition omits it, so restate it
    Object.defineProperty(locked.window, 'Error', {
      value: locked.window.Error,
      writable: false,
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
    ).toThrow(/Error binding/);
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

/** Script file name the same-realm harness gives the guard module and trusted code */
const SAME_REALM_BUNDLE = 'http://localhost:1212/renderer.dev.js';

/** The guard module compiled to a CommonJS body that assigns its exports to `exports` */
const GUARD_MODULE_SOURCE = ts.transpileModule(
  readFileSync(path.join(__dirname, 'renderer-create-element-guard.util.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

/**
 * Poisons a same-origin frame can apply to the app window's builtins. Each one would let the
 * foreign `createElement('script')` below through if the guard looked that builtin up at call
 * time.
 */
const SAME_REALM_POISONS: [string, string][] = [
  ['Boolean', 'appWindow.Boolean = () => true;'],
  ['String.prototype.toLowerCase', "appWindow.String.prototype.toLowerCase = () => 'div';"],
  ['RegExp.prototype.exec', "appWindow.RegExp.prototype.exec = () => [''];"],
  [
    'Reflect.apply',
    `const realApply = appWindow.Reflect.apply;
     const realExec = appWindow.RegExp.prototype.exec;
     appWindow.Reflect.apply = (f, t, a) => (f === realExec ? [''] : realApply(f, t, a));`,
  ],
  [
    'Array.prototype[Symbol.iterator]',
    "appWindow.Array.prototype[Symbol.iterator] = function* () { yield 'div'; };",
  ],
  ['Function.prototype.call', "appWindow.Function.prototype.call = () => [''];"],
  ['Function.prototype.apply', "appWindow.Function.prototype.apply = () => [''];"],
];

describe('installCreateElementGuard in the realm it guards', () => {
  // In production the guard module is part of the renderer bundle, so it shares its builtins with
  // the window a same-origin web view can reach as `parent`. This harness evaluates the module inside
  // the app window's realm to reproduce that.
  let app: JSDOM;
  let rendererBundleFileName: string;
  let runTrusted: (code: string) => unknown;
  let runForeign: (code: string) => unknown;

  beforeEach(() => {
    app = new JSDOM(HTML, { runScripts: 'outside-only' });
    const appContext = app.getInternalVMContext();
    vm.runInContext(
      `(function (exports) {\n${GUARD_MODULE_SOURCE}\n})(globalThis.guardModule = {});`,
      appContext,
      { filename: SAME_REALM_BUNDLE },
    );
    const guardModule: { installCreateElementGuard: typeof installCreateElementGuard } =
      vm.runInContext('guardModule', appContext);
    ({ rendererBundleFileName } = guardModule.installCreateElementGuard({
      realm: asRealm(app),
      restrictedTagNames: ['script', 'iframe'],
      onAllowed: vi.fn(),
      onRejected: (tagName) => {
        throw new Error(`rejected ${tagName}`);
      },
    }));
    runTrusted = (code) => vm.runInContext(code, appContext, { filename: SAME_REALM_BUNDLE });

    const web = new JSDOM(HTML, { runScripts: 'outside-only' });
    vm.runInContext('0', web.getInternalVMContext());
    Object.assign(web.window, { appWindow: app.window });
    runForeign = (code) =>
      vm.runInContext(code, web.getInternalVMContext(), {
        filename: 'http://localhost:1212/evil.web-view.html',
      });
  });

  it('allows the bundle and rejects another realm', () => {
    expect(rendererBundleFileName).toBe(SAME_REALM_BUNDLE);
    expect(runTrusted("document.createElement('script').tagName")).toBe('SCRIPT');
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
      /rejected script/,
    );
  });

  it.each(SAME_REALM_POISONS)(
    'still rejects a foreign call after poisoning %s',
    (_name, poison) => {
      runForeign(poison);
      expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
        /rejected script/,
      );
      expect(() => runForeign("appWindow.document.createElementNS('x', 'svg:script')")).toThrow(
        /rejected script/,
      );
      expect(runTrusted("document.createElement('script').tagName")).toBe('SCRIPT');
    },
  );

  it('still rejects a foreign call after poisoning String', () => {
    // No trusted create is checked here: jsdom converts tag names with the window's own `String`,
    // so after this poison it creates whatever the poison returns, whoever calls
    runForeign("appWindow.String = () => 'div';");
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
      /rejected script/,
    );
  });

  it('rejects when Error.stackTraceLimit is replaced by an accessor', () => {
    runForeign(
      "Object.defineProperty(appWindow.Error, 'stackTraceLimit', { get: () => 10, set() {} });",
    );
    expect(() => runForeign("appWindow.document.createElement('script')")).toThrow(
      /rejected script/,
    );
  });
});
