/**
 * The module specifiers a web view may `webViewRequire` from the renderer at run time.
 *
 * This IS the Extension Interface for the renderer, and `LICENSE-EXCEPTION.md` grants an additional
 * permission under section 7 of the AGPL over works that reach Platform.Bible only through it.
 * Adding an entry widens a published, irrevocable grant as well as the boundary `webViewRequire`
 * enforces; removing one can put an existing extension outside the exception. Treat a change here
 * as a licensing change as well as a security one, and see
 * https://github.com/paranext/paranext/wiki/Module-import-restrictions.
 *
 * Kept in a module of its own, importing nothing, for the same reason
 * `@extension-host/data/extension-interface-modules.data` is: the guard that has to notice a change
 * to it (`extension.service.module-allowlist.test.ts`) must be able to read it as a VALUE.
 * `global-this-web-view.model.ts` builds its map out of React, `platform-bible-react` and the
 * renderer's own services, none of which load outside a browser environment - so a guard reaching
 * for the list there has to scrape source text, and then recognizes only the one syntax it was
 * written against.
 *
 * The map in `global-this-web-view.model.ts` is typed as a `Record` over this union, so the two
 * cannot drift: a module supplied without a specifier here, or a specifier here with no module
 * supplied, is a compile error rather than a silent widening.
 *
 * Not every entry is Platform.Bible's own. React and `@sillsdev/scripture` carry their own terms
 * and `LICENSE-EXCEPTION.md` names them as supplied but ungranted, because an additional permission
 * can only carve out rights in a work its grantors hold copyright in.
 */
export const WEB_VIEW_MODULE_SPECIFIERS = [
  '@papi/core',
  '@papi/frontend',
  '@papi/frontend/react',
  '@sillsdev/scripture',
  'platform-bible-react',
  'platform-bible-utils',
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
] as const;

/** One of the module specifiers the renderer supplies to a web view. */
export type WebViewModuleSpecifier = (typeof WEB_VIEW_MODULE_SPECIFIERS)[number];
