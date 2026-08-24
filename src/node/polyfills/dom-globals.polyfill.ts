/**
 * Installs `DOMParser` and `XMLSerializer` as globals for Node processes, which have no DOM.
 *
 * `@eten-tech-foundation/scripture-utilities`' USX⇔USJ converters use the platform's native
 * `DOMParser`/`XMLSerializer` instead of bundling an XML implementation, and throw without them.
 * Browsers and web views supply them; plain Node does not. The package's README prescribes
 * `@xmldom/xmldom`, which is what this installs. Existing globals win, so a real DOM (renderer,
 * jsdom tests) is never overridden.
 *
 * **Import this module first** in any Node entry point that needs it, and keep it there. A module's
 * imports are evaluated in source order before its own body runs — true of both this build's
 * CommonJS output and ESM — so exporting a function to call, the shape its neighbor
 * `local-storage.polyfill` uses, would run too late: after every other import had its chance to
 * convert at load time. `dom-globals.polyfill.test.ts` guards the order.
 */

import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

/**
 * Defines `globalThis[name]` unless the environment already provides a usable constructor.
 *
 * Tests for `function` rather than `undefined` so a `null` or otherwise non-constructible value
 * still gets replaced — otherwise callers would see `DOMParser is not a constructor` instead of a
 * working parser. (`local-storage.polyfill` guards the same shape with an explicit `null` check.)
 *
 * Goes through `Reflect` rather than assigning directly because xmldom's DOM types are structurally
 * looser than lib.dom's, so a direct assignment would need a type assertion to compile.
 */
function installGlobalIfMissing(name: 'DOMParser' | 'XMLSerializer', implementation: unknown) {
  if (typeof Reflect.get(globalThis, name) !== 'function')
    Reflect.set(globalThis, name, implementation);
}

installGlobalIfMissing('DOMParser', DOMParser);
installGlobalIfMissing('XMLSerializer', XMLSerializer);
