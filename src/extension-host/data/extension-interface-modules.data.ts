/**
 * The module specifiers an extension may `require` from the extension host at run time.
 *
 * This IS the Extension Interface for the extension host, and `LICENSE-EXCEPTION.md` grants an
 * additional permission under section 7 of the AGPL over works that reach Platform.Bible only
 * through it. Adding an entry widens a published, irrevocable grant as well as the security
 * boundary the `Module.prototype.require` shim enforces; removing one can put an existing extension
 * outside the exception. Treat a change here as a licensing change as well as a security one, and
 * see https://github.com/paranext/paranext/wiki/Module-import-restrictions.
 *
 * Kept in a module of its own, importing nothing, for one reason: the guard that has to notice a
 * change to it (`extension.service.module-allowlist.test.ts`) must be able to read it as a VALUE.
 * `extension.service.ts` cannot be imported from a test - it creates directories at module scope,
 * and installing the shim is a side effect of `activateExtensions`, which also deletes
 * `globalThis.eval` and replaces `fetch` - so a guard that reached for the list there would have to
 * scrape source text and would only recognize the one syntax it was written against.
 *
 * `EXTENSION_INTERFACE_MODULES` in `extension.service.ts` is typed as a `Record` over this union,
 * so the two cannot drift: a module supplied without a specifier here, or a specifier here with no
 * module supplied, is a compile error rather than a silent widening.
 *
 * Not every entry is Platform.Bible's own. `crypto` is Node's and `@sillsdev/scripture` is
 * separately published under the MIT License; `LICENSE-EXCEPTION.md` names both as supplied but
 * ungranted, because an additional permission can only carve out rights in a work its grantors hold
 * copyright in.
 */
export const EXTENSION_INTERFACE_MODULE_SPECIFIERS = [
  '@papi/backend',
  '@papi/core',
  '@sillsdev/scripture',
  'crypto',
  'platform-bible-utils',
] as const;

/** One of the module specifiers the extension host supplies. */
export type ExtensionInterfaceModuleSpecifier =
  (typeof EXTENSION_INTERFACE_MODULE_SPECIFIERS)[number];
