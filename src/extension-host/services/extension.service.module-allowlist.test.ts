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

/** Every specifier either host supplies - the extension host or the renderer - each named once. */
function readSuppliedModuleSpecifiers(): string[] {
  return [
    ...new Set([...readPermittedModuleSpecifiers(), ...readWebViewModuleSpecifiers()]),
  ].sort();
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
    const supplied = readSuppliedModuleSpecifiers();

    expect(FIRST_PARTY_SUPPLIED_MODULES.filter((module) => !supplied.includes(module))).toEqual([]);
  });

  it(`carves out nothing the hosts supply from a third party — ${WIDENING_THE_GRANT}`, () => {
    // The other direction: a first-party module added to either host has to reach the grant, or the
    // published carve-out is silently narrower than the interface extensions actually link against.
    const ungranted = readSuppliedModuleSpecifiers().filter(
      (module) => !FIRST_PARTY_SUPPLIED_MODULES.includes(module),
    );

    // Everything the hosts supply that the grant does not name must be a module this project does
    // not own - Node built-ins and React. Each is listed so that adding one is a deliberate line.
    expect(ungranted).toEqual([
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
 * templates bundle their own copy, as the table of `lib/` packages in `LICENSING.md` states. No
 * permission depends on it: the library is also published under the MIT License. Making it an
 * external is a product decision (smaller extensions, against tying every extension to the
 * platform's copy and its styles), not something to change silently here.
 */
const SUPPLIED_BUT_BUNDLED_MODULES = ['platform-bible-react'];

const EXTENSION_SOURCES_DIR = path.join(REPO, 'extensions', 'src');
/** The webpack folder of the combined build that packs every extension into the installer. */
const COMBINED_WEBPACK_DIR = path.join(REPO, 'extensions', 'webpack');
/** The one file in a webpack folder that may declare `externals`; the other configs merge it in. */
const BASE_CONFIG_FILE_NAME = 'webpack.config.base.ts';

const CHANGING_THE_EXTERNALS = [
  'The `externals` list decides which modules every extension built from the templates takes from',
  'Platform.Bible at run time instead of carrying its own copy, and LICENSE-EXCEPTION.md grants its',
  'additional permission to works that reach Platform.Bible only through the modules it supplies.',
  'These lists come from the extension templates: change them there, merge the change into every',
  'copy, and if a module the hosts supply is deliberately left out, update',
  "SUPPLIED_BUT_BUNDLED_MODULES and LICENSING.md's table of `lib/` packages, and say so in the",
  'review; do not update this test to make it pass.',
].join(' ');

/**
 * The `externals` list a webpack config declares, read by parsing it so comments and formatting
 * cannot change the result, or `undefined` if it declares none.
 *
 * Every `externals*` setting webpack has reaches here, not only `externals` itself, because
 * `externalsPresets` (`{ node: true }`) and a list assigned or pushed after the fact also change
 * what extensions take from the hosts. The one accepted form is a single `externals: [...]` of
 * plain string literals; anything else (a regex, a function, a spread, a template string, a second
 * list) is refused rather than skipped, because each can change what extensions take from the hosts
 * without naming a module this test could compare. `externalsType` is let through: it changes how a
 * module is loaded, not which.
 *
 * What it still misses: a setting reached under a computed name (`config[key]`) or built in a file
 * outside the webpack folder.
 */
function parseExternals(file: string, text: string): string[] | undefined {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const lists: ts.ArrayLiteralExpression[] = [];
  const visit = (node: ts.Node) => {
    if (
      (ts.isIdentifier(node) || ts.isStringLiteral(node)) &&
      node.text.startsWith('externals') &&
      node.text !== 'externalsType'
    ) {
      const { parent } = node;
      if (
        node.text === 'externals' &&
        ts.isPropertyAssignment(parent) &&
        parent.name === node &&
        ts.isArrayLiteralExpression(parent.initializer)
      )
        lists.push(parent.initializer);
      else {
        const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
        throw new Error(
          `${file}:${line} uses webpack's \`${node.text}\` other than as one ` +
            `\`externals: [...]\` list of module names. ${CHANGING_THE_EXTERNALS}`,
        );
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (lists.length > 1)
    throw new Error(
      `${file} declares \`externals\` ${lists.length} times. ${CHANGING_THE_EXTERNALS}`,
    );
  if (lists.length === 0) return undefined;
  return lists[0].elements
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

/**
 * The `externals` list of one webpack build, given the source of every file in its folder.
 *
 * The main and web-view configs merge the base config in, and webpack-merge appends lists, so an
 * `externals` declared in either would be added to every extension's without changing the base
 * config. Only the base config may declare it, and it must.
 */
function externalsOfBuild(folder: string, files: { name: string; text: string }[]): string[] {
  const declared = files.flatMap(({ name, text }) => {
    const externals = parseExternals(path.join(folder, name), text);
    return externals ? [{ name, externals }] : [];
  });
  if (declared.length !== 1 || declared[0].name !== BASE_CONFIG_FILE_NAME)
    throw new Error(
      `Expected only ${BASE_CONFIG_FILE_NAME} in ${folder} to declare \`externals\`, found: ` +
        `${declared.map(({ name }) => name).join(', ') || 'none'}. ${CHANGING_THE_EXTERNALS}`,
    );
  return declared[0].externals;
}

/** {@link externalsOfBuild}, reading every script in the folder. */
function readExternals(folder: string): string[] {
  return externalsOfBuild(
    folder,
    readdirSync(folder)
      .filter((name) => /\.[cm]?[jt]s$/.test(name))
      .map((name) => ({ name, text: readFileSync(path.join(folder, name), 'utf8') })),
  );
}

/**
 * The webpack folder of each extension's own build. Each comes from the extension templates, so
 * each is where a template change takes effect.
 */
function perExtensionWebpackDirs(): string[] {
  return readdirSync(EXTENSION_SOURCES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(EXTENSION_SOURCES_DIR, entry.name, 'webpack'))
    .filter((folder) => existsSync(folder));
}

describe('the modules extension builds leave to the hosts (webpack `externals`)', () => {
  it(`are the same in every extension's own build as in the combined build — ${CHANGING_THE_EXTERNALS}`, () => {
    // Keyed by folder, so a failure names every build that differs, not only the first.
    const combined = readExternals(COMBINED_WEBPACK_DIR);
    const perExtension = Object.fromEntries(
      perExtensionWebpackDirs().map((folder) => [
        path.relative(REPO, folder),
        readExternals(folder),
      ]),
    );

    expect(Object.keys(perExtension).length).toBeGreaterThan(0);
    expect(perExtension).toEqual(
      Object.fromEntries(Object.keys(perExtension).map((folder) => [folder, combined])),
    );
  });

  it(`are the modules either host supplies, apart from the ones extensions bundle — ${CHANGING_THE_EXTERNALS}`, () => {
    // Adding an external makes every extension rely on the host's copy of that module instead of
    // carrying one; removing one makes every extension carry its own. Either changes what extensions
    // reach Platform.Bible through, and the license exception is defined by that.
    //
    // This pins the union of the two hosts, not each one: the main and web-view bundles share one
    // list, so `react` is external in an extension's main bundle too, though only the renderer
    // supplies it. An extension's `main.ts` that imports React therefore fails when it activates.
    const supplied = readSuppliedModuleSpecifiers();

    expect(readExternals(COMBINED_WEBPACK_DIR)).toEqual(
      supplied.filter((module) => !SUPPLIED_BUT_BUNDLED_MODULES.includes(module)),
    );
    expect(SUPPLIED_BUT_BUNDLED_MODULES.filter((module) => !supplied.includes(module))).toEqual([]);
  });
});

describe('reading the `externals` list a webpack build declares', () => {
  const read = (text: string) => parseExternals('config.ts', text);

  it('reads the module names, whatever the comments around them hold', () => {
    expect(
      read(
        "export default { externals: [/* ] */ 'react', // ]\n 'crypto'], externalsType: 'commonjs' };",
      ),
    ).toEqual(['crypto', 'react']);
  });

  it('finds no list in a config that declares none', () => {
    expect(read("export default { target: 'web' };")).toBeUndefined();
  });

  it.each([
    ['a regular expression', 'export default { externals: [/^react/] };'],
    ['a spread', 'export default { externals: [...more] };'],
    ['a template string', 'export default { externals: [`react`] };'],
    ['a function', 'export default { externals: ({ request }, callback) => callback() };'],
    ['a list held in a variable', 'const externals = []; export default { externals };'],
    ['a list assigned afterwards', "config.externals = ['react'];"],
    ['a list pushed onto afterwards', "config.externals.push('react');"],
    ['`externalsPresets`', 'export default { externalsPresets: { node: true } };'],
    ['a second list', "export const a = { externals: ['react'] }, b = { externals: ['crypto'] };"],
  ])('refuses %s', (_, text) => {
    expect(() => read(text)).toThrow(CHANGING_THE_EXTERNALS);
  });

  it('refuses a list declared outside the base config, which would be appended to it', () => {
    expect(() =>
      externalsOfBuild('webpack', [
        { name: BASE_CONFIG_FILE_NAME, text: "export default { externals: ['react'] };" },
        { name: 'webpack.config.main.ts', text: "export default { externals: ['lodash'] };" },
      ]),
    ).toThrow(CHANGING_THE_EXTERNALS);
  });

  it('refuses a build whose base config declares no list', () => {
    expect(() =>
      externalsOfBuild('webpack', [{ name: 'webpack.config.main.ts', text: 'export default {};' }]),
    ).toThrow(CHANGING_THE_EXTERNALS);
  });
});
