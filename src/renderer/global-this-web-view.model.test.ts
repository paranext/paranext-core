import { describe, expect, it } from 'vitest';
import { WEB_VIEW_MODULE_SPECIFIERS } from '@renderer/data/web-view-modules.data';
import '@renderer/global-this-web-view.model';

/**
 * The require shim web views are handed, exercised through the global a web view reaches it by.
 *
 * The module is imported for its side effects rather than for an export, because that global IS the
 * surface: `globalThis.webViewRequire` is what extension code calls, so testing it is testing what
 * ships. The allowlist twin in `extension.service.module-allowlist.test.ts` can only grep this
 * file's source; these assertions run the dispatch.
 */
describe('webViewRequire', () => {
  // Already declared as `typeof webViewRequire` on `globalThis` by the module under test.
  const { webViewRequire } = globalThis;

  it('resolves every specifier the allowlist publishes', () => {
    WEB_VIEW_MODULE_SPECIFIERS.forEach((specifier) => {
      expect(webViewRequire(specifier)).toBeDefined();
    });
  });

  it('refuses a specifier the allowlist does not name', () => {
    expect(() => webViewRequire('node:fs')).toThrow(/Only these modules can be required/);
  });

  it.each(['constructor', 'toString', 'valueOf', 'hasOwnProperty', '__proto__'])(
    'refuses the Object.prototype member %s rather than answering with it',
    (member) => {
      // The reason the table is a `Map` and not the record: indexing a plain object with an
      // arbitrary string answers every prototype member as though it were a supplied module.
      expect(() => webViewRequire(member)).toThrow(/Only these modules can be required/);
    },
  );

  it('names the specifier that was asked for, not the module it failed to find', () => {
    // `getModuleSimilarApiMessage` was handed the (always undefined) module rather than the name,
    // so every one of these errors read `Rejected require('undefined')`.
    expect(() => webViewRequire('node:fs')).toThrow(/node:fs/);
  });
});
