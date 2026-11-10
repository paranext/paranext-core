import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { EXTENSION_INTERFACE_MODULE_SPECIFIERS } from '@extension-host/data/extension-interface-modules.data';
import { WEB_VIEW_MODULE_SPECIFIERS } from '@renderer/data/web-view-modules.data';

/*
 * Pins the module specifiers an extension may `require` at runtime.
 *
 * The `Module.prototype.require` shim in `extension.service.ts` is where the Extension Interface is
 * defined in practice, and `LICENSE-EXCEPTION.md` grants an additional permission under section 7
 * of the AGPL to works that reach Platform.Bible only through that interface. The list is therefore
 * the boundary of a published, irrevocable license grant as well as a security control.
 *
 * The shim itself has no seam - `activateExtensions` installs it as a side effect of loading
 * extensions, and the same function deletes `globalThis.eval`/`Function` and replaces
 * `fetch`/`XMLHttpRequest` - and `extension.service.ts` cannot even be imported here, because it
 * creates directories at module scope. So the shim dispatches from
 * `EXTENSION_INTERFACE_MODULE_SPECIFIERS` instead, in a module that imports nothing, and this
 * compares that VALUE. Any admission has to add a specifier there, in any syntax, and fail this.
 *
 * The renderer half is read the same way, and for the same reason: `global-this-web-view.model.ts`
 * pulls in React and `platform-bible-react`, which do not load outside a browser environment, so its
 * map is keyed by `WEB_VIEW_MODULE_SPECIFIERS` in a module that imports nothing and this compares
 * that value.
 */

const REPO = path.join(__dirname, '..', '..', '..');
const LICENSE_EXCEPTION_PATH = path.join(REPO, 'LICENSE-EXCEPTION.md');

/**
 * Module specifiers the shim answers itself instead of refusing.
 *
 * Every entry is a promise this project has already made to extension authors. Adding one widens
 * the AGPL section 7 additional permission in `LICENSE-EXCEPTION.md`; removing one can push an
 * existing extension outside it. Written out here rather than derived, because a guard that derived
 * it from the thing it is guarding would assert nothing.
 */
const PERMITTED_MODULE_SPECIFIERS = [
  '@papi/backend',
  '@papi/core',
  '@sillsdev/scripture',
  'crypto',
  'platform-bible-utils',
];

const WIDENING_THE_GRANT = [
  'The module specifiers this shim permits ARE the Extension Interface that LICENSE-EXCEPTION.md',
  'names: its additional permission under section 7 of the AGPL frees a work from sections 4, 5, 6',
  'and 13 provided it talks to Platform.Bible only through them. Adding an entry widens a published,',
  'irrevocable grant, and removing one can put an existing extension outside it. If this change is',
  'intended, update PERMITTED_MODULE_SPECIFIERS deliberately and say so in the review; do not update',
  'it to make the test pass.',
].join(' ');

/** The specifiers the extension host supplies, as the shim reads them. */
function readPermittedModuleSpecifiers(): string[] {
  return [...EXTENSION_INTERFACE_MODULE_SPECIFIERS].sort();
}

// The consequence lives in the test name because that is what a failing run prints. Vitest's
// two-argument `expect(value, message)` would say it closer to the assertion, but `vitest/valid-expect`
// refuses that form.
/**
 * The SHAPE of dispatching on the module name against hard-coded literals, rather than one expected
 * spelling of it.
 *
 * A pattern spelled for one expected form - `/moduleName === /`, with exactly that spacing - is
 * satisfied by `switch (moduleName)`, `moduleName.startsWith('react')` and a collapsed
 * `moduleName==='react'` doing the very thing it forbids. Anchoring on the syntax that has to be
 * present - and letting the noise through - is what `.claude/rules/grep-safety-net.md` asks for.
 *
 * A string LITERAL on the other side is what makes it the dangerous shape: comparing the name to a
 * variable is how a membership test against the allowlist itself is written
 * (`specifiers.some((specifier) => specifier === moduleName)`), which is the safe pattern rather
 * than the forbidden one.
 *
 * What it still misses, so nobody reads a green run as more than it is: a comparison against a
 * named constant (`const REACT = 'react'; moduleName === REACT`), and a `switch` over a variable
 * the name was copied into. The behavioural coverage named below is the actual proof; this is a
 * cheap tripwire for the obvious regression.
 */
const NAME_COMPARISON_DISPATCH =
  /moduleName\s*===\s*['"`]|['"`]\s*===\s*moduleName|switch\s*\(\s*moduleName|moduleName\s*\.\s*(startsWith|endsWith|includes|match)\s*\(\s*['"`]/;

describe('extension host require shim allowlist', () => {
  it(`permits exactly the modules the Extension Interface publishes — ${WIDENING_THE_GRANT}`, () => {
    expect(readPermittedModuleSpecifiers()).toEqual([...PERMITTED_MODULE_SPECIFIERS].sort());
  });

  it(`dispatches from that list rather than comparing names in the shim — ${WIDENING_THE_GRANT}`, () => {
    // The value comparison above is only a guard while the shim is what consumes the value. A shim
    // that compared `moduleName` against string literals could admit a module the list does not
    // name, and every assertion in this file would still pass.
    const source = readFileSync(path.join(__dirname, 'extension.service.ts'), 'utf8');
    expect(source).toContain('EXTENSION_INTERFACE_MODULES[moduleName]');
    expect(source).not.toMatch(NAME_COMPARISON_DISPATCH);
  });
});

describe('renderer web view require shim allowlist', () => {
  it(`dispatches from that map rather than comparing names in the shim — ${WIDENING_THE_GRANT}`, () => {
    // The renderer's value is pinned below, under the license exception. That pin is only a guard
    // while the shim is what consumes the value, for the reason the extension host's twin above
    // gives - and web views are the larger of the two surfaces. `global-this-web-view.model.ts`
    // pulls in React and `platform-bible-react`, which do not load outside a browser environment,
    // so its source is read here instead of imported.
    //
    // This is a BACKSTOP, not the proof: no regex over source text can express "dispatches from the
    // map". What the shim actually does is exercised in
    // `src/renderer/global-this-web-view.model.test.ts`, which runs it through
    // `globalThis.webViewRequire` - the surface a web view reaches - and asserts that every
    // allowlisted specifier resolves, that an unlisted one throws, and that `Object.prototype`
    // members throw rather than answering as modules.
    const source = readFileSync(
      path.join(REPO, 'src/renderer/global-this-web-view.model.ts'),
      'utf8',
    );
    expect(source).toContain('moduleMap.get(moduleName)');
    expect(source).not.toMatch(NAME_COMPARISON_DISPATCH);
  });
});

/**
 * Modules the two hosts supply that Platform.Bible itself authors.
 *
 * The split is what decides whether a module belongs in the license grant, and it is not derivable
 * from either host's list: both supply first-party and third-party modules side by side. An
 * additional permission can only carve out rights in a work its grantors hold copyright in, so
 * React and Node's built-ins are supplied but ungranted - they carry their own terms, and no
 * permission from this project is needed to use them. `@sillsdev/scripture` is in that same group:
 * SIL's, but separately published under the MIT License and not this project's to relicense, so an
 * additional permission over it would grant an extension author nothing MIT does not already.
 *
 * Adding a FIRST-PARTY module to either host widens the published grant and must be accompanied by
 * a new version of `LICENSE-EXCEPTION.md`; adding a third-party one does not. That is the decision
 * this list exists to force.
 */
const FIRST_PARTY_SUPPLIED_MODULES = [
  '@papi/backend',
  '@papi/core',
  '@papi/frontend',
  '@papi/frontend/react',
  'platform-bible-react',
  'platform-bible-utils',
];

/** The specifiers the renderer answers for a web view, as its module map is keyed. */
function readWebViewModuleSpecifiers(): string[] {
  return [...WEB_VIEW_MODULE_SPECIFIERS].sort();
}

/**
 * The module specifiers `LICENSE-EXCEPTION.md` names as the Extension Interface.
 *
 * Read from the numbered clause rather than from the whole file, because the document names
 * `crypto` and React elsewhere on purpose - in the paragraph that says they are supplied but NOT
 * granted - and a whole-file scan would read that disclaimer as part of the grant.
 */
function readGrantedModuleSpecifiers(source: string): string[] {
  const start = source.indexOf("of Platform.Bible's own authorship");
  const end = source.indexOf('2. the type declarations', start);
  if (start < 0 || end < 0)
    throw new Error(
      `Could not find the Extension Interface's module clause in ${LICENSE_EXCEPTION_PATH}. This ` +
        `guard reads document text, so check whether the clause was merely reworded. ${WIDENING_THE_GRANT}`,
    );
  return [...source.slice(start, end).matchAll(/`([^`]+)`/g)]
    .map(([, specifier]) => specifier)
    .sort();
}

describe('the Extension Interface the license exception grants', () => {
  it(`names every first-party module the hosts supply, and no module they do not — ${WIDENING_THE_GRANT}`, () => {
    const granted = readGrantedModuleSpecifiers(readFileSync(LICENSE_EXCEPTION_PATH, 'utf8'));

    expect(granted).toEqual([...FIRST_PARTY_SUPPLIED_MODULES].sort());
  });

  it(`is supplied in full by the extension host and the renderer between them — ${WIDENING_THE_GRANT}`, () => {
    // The grant is a promise that these modules are there to be linked against. A name the hosts do
    // not answer is a promise nothing keeps; this is the direction the shim-only guard above cannot
    // see, because it compares the shim against a copy of itself.
    const supplied = new Set([
      ...readPermittedModuleSpecifiers(),
      ...readWebViewModuleSpecifiers(),
    ]);

    expect(FIRST_PARTY_SUPPLIED_MODULES.filter((module) => !supplied.has(module))).toEqual([]);
  });

  it(`carves out nothing the hosts supply from a third party — ${WIDENING_THE_GRANT}`, () => {
    // The other direction: a first-party module added to either host has to reach the grant, or the
    // published carve-out is silently narrower than the interface extensions actually link against.
    const supplied = [
      ...new Set([...readPermittedModuleSpecifiers(), ...readWebViewModuleSpecifiers()]),
    ];
    const ungranted = supplied.filter((module) => !FIRST_PARTY_SUPPLIED_MODULES.includes(module));

    // Everything the hosts supply that the grant does not name must be a module this project does
    // not own - Node built-ins and React. Each is listed so that adding one is a deliberate line.
    expect(ungranted.sort()).toEqual([
      '@sillsdev/scripture',
      'crypto',
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
    ]);
  });
});

/**
 * Modules the hosts supply that extension builds bundle anyway instead of leaving to the host.
 *
 * The renderer supplies `platform-bible-react` to web views, but extensions built from the
 * templates bundle their own copy. No permission depends on it: the library is also published under
 * the MIT License. Making it an external is a product decision (smaller extensions, against tying
 * every extension to the platform's copy and its styles), not something to change silently here.
 */
const SUPPLIED_BUT_BUNDLED_MODULES = ['platform-bible-react'];

const EXTENSION_SOURCES_DIR = path.join(REPO, 'extensions', 'src');
/** The base config of the combined build that packs every extension into the installer. */
const COMBINED_BASE_CONFIG = path.join(REPO, 'extensions', 'webpack', 'webpack.config.base.ts');

const CHANGING_THE_EXTERNALS = [
  'The `externals` list decides which modules every extension built from the templates takes from',
  'Platform.Bible at run time instead of carrying its own copy, and LICENSE-EXCEPTION.md grants its',
  'additional permission to works that reach Platform.Bible only through the modules it supplies.',
  'These lists come from the extension templates: change them there, merge the change into every',
  'copy, and if a module the hosts supply is deliberately left out, update',
  'SUPPLIED_BUT_BUNDLED_MODULES and say so in the review; do not update this test to make it pass.',
].join(' ');

/**
 * Every copy of the extension build's shared base config: the combined build's and each extension's
 * own. They all come from the extension templates, so each is where a template change takes
 * effect.
 */
function extensionBaseConfigPaths(): string[] {
  const perExtension = readdirSync(EXTENSION_SOURCES_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && existsSync(path.join(EXTENSION_SOURCES_DIR, entry.name, 'webpack')),
    )
    .map((entry) =>
      path.join(EXTENSION_SOURCES_DIR, entry.name, 'webpack', 'webpack.config.base.ts'),
    );
  // An extension with its own webpack build but no base config has moved or renamed it; skipping
  // it would quietly drop that copy from the comparison.
  const missing = perExtension.filter((file) => !existsSync(file));
  if (missing.length > 0)
    throw new Error(
      `These extensions have a webpack folder but no webpack.config.base.ts: ` +
        `${missing.map((file) => path.relative(REPO, file)).join(', ')}. ${CHANGING_THE_EXTERNALS}`,
    );
  return [COMBINED_BASE_CONFIG, ...perExtension];
}

/**
 * The entries of a config's `externals` array, read by parsing the file so comments and formatting
 * cannot change the result. Anything other than a plain string literal (a regex, a function, a
 * spread, a template string) is refused rather than skipped: each of those can change what
 * extensions take from the hosts without naming a module this test could compare.
 */
function readExternals(file: string): string[] {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  const arrays: ts.ArrayLiteralExpression[] = [];
  const visit = (node: ts.Node) => {
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(source) === 'externals' &&
      ts.isArrayLiteralExpression(node.initializer)
    )
      arrays.push(node.initializer);
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (arrays.length !== 1)
    throw new Error(
      `Expected one \`externals: [...]\` array in ${file}, found ${arrays.length}. ` +
        `${CHANGING_THE_EXTERNALS}`,
    );
  return arrays[0].elements
    .map((element) => {
      if (!ts.isStringLiteral(element))
        throw new Error(
          `\`externals\` in ${file} holds \`${element.getText(source)}\`, which is not a plain ` +
            `string. ${CHANGING_THE_EXTERNALS}`,
        );
      return element.text;
    })
    .sort();
}

describe('the modules extension builds leave to the hosts (webpack `externals`)', () => {
  it(`are the same in every copy of the extension base config — ${CHANGING_THE_EXTERNALS}`, () => {
    const files = extensionBaseConfigPaths();
    const [first, ...rest] = files.map((file) => ({
      file: path.relative(REPO, file),
      externals: readExternals(file),
    }));

    expect(files.length).toBeGreaterThan(1);
    rest.forEach((copy) => expect(copy).toEqual({ ...first, file: copy.file }));
  });

  it(`are the modules either host supplies, apart from the ones extensions bundle — ${CHANGING_THE_EXTERNALS}`, () => {
    // Adding an external makes every extension rely on the host's copy of that module instead of
    // carrying one; removing one makes every extension carry its own. Either changes what extensions
    // reach Platform.Bible through, and the license exception is defined by that.
    const supplied = [
      ...new Set([...readPermittedModuleSpecifiers(), ...readWebViewModuleSpecifiers()]),
    ];

    expect(readExternals(COMBINED_BASE_CONFIG)).toEqual(
      supplied.filter((module) => !SUPPLIED_BUT_BUNDLED_MODULES.includes(module)).sort(),
    );
    expect(SUPPLIED_BUT_BUNDLED_MODULES.filter((module) => !supplied.includes(module))).toEqual([]);
  });
});
