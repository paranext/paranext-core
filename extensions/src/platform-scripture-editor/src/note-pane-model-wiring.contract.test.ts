import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

/*
 * Guards that this extension checks the view against `'standard'` only where Standard view alone is
 * meant. A pane-model view (Standard view, Power's read-only Preview, or Simple's Formatted view —
 * see `usesPaneNoteModel`) edits notes in the pane when its text is editable, navigates the text to
 * a picked note, and highlights its caller; a view that keeps a Standard-only check anywhere along
 * that path behaves half one way and half the other. Every other Standard-only note check goes
 * through `usesPaneNoteModel`.
 *
 * This reads source text, which is a last resort (see
 * `adr-tests-exercise-behavior-not-source-text`): it is a rule about how the extension's code is
 * written, across every file, not a behavior one test can exercise. The smallest real fix is an
 * ESLint `no-restricted-syntax` rule over this extension's non-test sources that flags a comparison
 * with `'standard'` (either operand order, or a `case`), with each allowed site below disabled
 * with its reason.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

/** `relativePath` (relative to this extension's `src`), parsed. */
function parseSource(relativePath: string): ts.SourceFile {
  const filePath = path.join(SRC_DIR, relativePath);
  return ts.createSourceFile(
    filePath,
    readFileSync(filePath, 'utf-8'),
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

/**
 * Every `.ts`/`.tsx` file under this extension's `src` that ships (not a test, test helper, or
 * story), as `/`-separated paths relative to it, so the sweep also sees a file added later.
 */
function listSourceFiles(relativeDir = ''): string[] {
  return readdirSync(path.join(SRC_DIR, relativeDir), { withFileTypes: true }).flatMap((entry) => {
    const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return listSourceFiles(relativePath);
    return /\.tsx?$/.test(entry.name) && !/\.(test|test-utils|stories)\.tsx?$/.test(entry.name)
      ? [relativePath]
      : [];
  });
}

/** Every node in `root`'s subtree, `root` included, in source order. */
function descendants(root: ts.Node): ts.Node[] {
  const found: ts.Node[] = [];
  const visit = (node: ts.Node) => {
    found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}

const EQUALITY_OPERATORS = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
]);

const isStandardLiteral = (node: ts.Node) =>
  ts.isStringLiteralLike(node) && node.text === 'standard';

/**
 * Names the place a check against `'standard'` sits, so an unexpected one shows in the diff. A
 * check counts as one of the allowed places only when it is part of that place's own condition or
 * arguments, not merely somewhere inside the code that place guards.
 */
function labelStandardCheck(sourceFile: ts.SourceFile, check: ts.Node): string {
  const contains = (container: ts.Node) =>
    check.getStart(sourceFile) >= container.getStart(sourceFile) &&
    check.getEnd() <= container.getEnd();
  for (let node = check.parent; node; node = node.parent) {
    if (ts.isIfStatement(node) && contains(node.expression)) {
      const condition = node.expression.getText(sourceFile);
      if (condition.includes("=== 't'")) return 'Ctrl+T insert';
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sourceFile) === 'useProjectStylesheet' &&
      node.arguments.some(contains)
    )
      return 'useProjectStylesheet';
  }
  // Anything else: the first line of the nearest statement, after the name of the function
  // declaring it if there is one, so the failure diff shows where it is.
  let statement: ts.Node = check;
  while (statement.parent && !(ts.isStatement(statement) && !ts.isBlock(statement)))
    statement = statement.parent;
  const line = statement.getText(sourceFile).split('\n')[0].trim();
  let declaration: ts.Node | undefined = statement;
  while (declaration && !ts.isFunctionDeclaration(declaration)) declaration = declaration.parent;
  return declaration?.name ? `${declaration.name.text}: ${line}` : line;
}

/**
 * Every check of something against `'standard'` — an equality or inequality comparison with the
 * literal on either side, or a `case 'standard':` — labelled, in source order.
 */
function standardCheckLabels(sourceFile: ts.SourceFile): string[] {
  return descendants(sourceFile)
    .filter(
      (node) =>
        (ts.isBinaryExpression(node) &&
          EQUALITY_OPERATORS.has(node.operatorToken.kind) &&
          (isStandardLiteral(node.left) || isStandardLiteral(node.right))) ||
        (ts.isCaseClause(node) && isStandardLiteral(node.expression)),
    )
    .map((node) => labelStandardCheck(sourceFile, node));
}

describe('note pane model wiring', () => {
  it('checks the view against Standard only where Standard alone is meant, across the extension', () => {
    const checksByFile = Object.fromEntries(
      listSourceFiles().flatMap((file) => {
        const labels = standardCheckLabels(parseSource(file));
        return labels.length > 0 ? [[file, labels]] : [];
      }),
    );
    expect(checksByFile).toEqual({
      // Standard view's own view options
      'editor-view-options.util.ts': ["getViewOptionsForType: if (viewType === 'standard') {"],
      // This router serves only the main text's marker palette, which only Standard view has
      'palette-key-routing.util.ts': [
        "shouldRoutePaletteKey: if (viewType !== 'standard') return false;",
        // The `\` marker menu in the main text; Standard view types markers in place instead
        'shouldOpenInlineMarkersMenu: return (',
      ],
      'platform-scripture-editor.utils.ts': [
        // Narrows a saved value to a view type; not a note check
        "isScriptureEditorViewType: return viewType === 'formatted' || viewType === 'standard' || viewType === 'markers';",
        // The view toggle steps between Standard view and Preview
        "getNextViewTypeInCycle: return viewType === 'standard' ? 'formatted' : 'standard';",
        // The one place the note model itself is decided
        "usesPaneNoteModel: if (viewType === 'standard') return true;",
      ],
      'use-project-stylesheet.hook.ts': [
        // Which stylesheet mode the text renders in; not a note check
        "projectStylesheetMode: return viewType === 'standard' ? 'full' : 'fonts';",
      ],
    });
  });
});
