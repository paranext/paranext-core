import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';
import { EXTENSION_INTERFACE_MODULE_SPECIFIERS } from '@extension-host/data/extension-interface-modules.data';
import { WEB_VIEW_MODULE_SPECIFIERS } from '@renderer/data/web-view-modules.data';

/*
 * Helpers for tests that read the webpack `externals` list extension builds declare, and the
 * modules the hosts supply that the list is pinned against. One reader, so every test that checks
 * the list reads it the same way: by parsing the config, never by searching its text.
 */

/** The one file in a webpack folder that may declare `externals`; the other configs merge it in. */
export const BASE_CONFIG_FILE_NAME = 'webpack.config.base.ts';

export const CHANGING_THE_EXTERNALS = [
  'The `externals` list decides which modules every extension built from the templates takes from',
  'Platform.Bible at run time instead of carrying its own copy, and LICENSE-EXCEPTION.md grants its',
  'additional permission to works that reach Platform.Bible only through the modules it supplies.',
  'These lists come from the extension templates: change them there, merge the change into every',
  'copy, and if a module the hosts supply is deliberately left out, update',
  "SUPPLIED_BUT_BUNDLED_MODULES and LICENSING.md's table of `lib/` packages, and say so in the",
  'review; do not update this test to make it pass.',
].join(' ');

/** The specifiers the extension host supplies, as its require shim reads them. */
export function readPermittedModuleSpecifiers(): string[] {
  return [...EXTENSION_INTERFACE_MODULE_SPECIFIERS].sort();
}

/** The specifiers the renderer answers for a web view, as its module map is keyed. */
export function readWebViewModuleSpecifiers(): string[] {
  return [...WEB_VIEW_MODULE_SPECIFIERS].sort();
}

/** Every specifier either host supplies - the extension host or the renderer - each named once. */
export function readSuppliedModuleSpecifiers(): string[] {
  return [
    ...new Set([...readPermittedModuleSpecifiers(), ...readWebViewModuleSpecifiers()]),
  ].sort();
}

/**
 * The `externals` list a webpack config declares, read by parsing it so comments and formatting
 * cannot change the result, or `undefined` if it declares none.
 *
 * Every `externals*` setting webpack has reaches here, not only `externals` itself, because
 * `externalsPresets` (`{ node: true }`) and a list assigned or pushed after the fact also change
 * what extensions take from the hosts. The one accepted form is a single `externals: [...]` of
 * plain string literals; anything else (a regex, a function, a spread, a template string, a second
 * list) is refused rather than skipped, because each can change what extensions take from the hosts
 * without naming a module a test could compare. `externalsType` is let through: it changes how a
 * module is loaded, not which.
 *
 * What it still misses: a setting reached under a computed name (`config[key]`) or built in a file
 * outside the webpack folder.
 */
export function parseExternals(file: string, text: string): string[] | undefined {
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
export function externalsOfBuild(
  folder: string,
  files: { name: string; text: string }[],
): string[] {
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

/** {@link externalsOfBuild}, reading every script in the webpack folder `folder`. */
export function readExternals(folder: string): string[] {
  return externalsOfBuild(
    folder,
    readdirSync(folder)
      .filter((name) => /\.[cm]?[jt]s$/.test(name))
      .map((name) => ({ name, text: readFileSync(path.join(folder, name), 'utf8') })),
  );
}
