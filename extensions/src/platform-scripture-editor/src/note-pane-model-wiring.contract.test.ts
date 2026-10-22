import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

/*
 * Guards how `platform-scripture-editor.web-view.tsx` applies the footnotes-pane note model. A
 * pane-model view (Standard view, or Simple's Formatted view — see `usesPaneNoteModel`) edits
 * notes in the pane, navigates the text to a picked note, and highlights its caller; a view that
 * keeps a Standard-only check anywhere along that path behaves half one way and half the other.
 * The web view cannot be mounted in jsdom (see `content-zoom-markers.contract.test.ts`), so this
 * is a source-reading contract test, like `copy-limit-wiring.contract.test.ts`.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** The source text of the `propName` expression on every `<tagName>` element in the file. */
function propExpressions(sourceFile: ts.SourceFile, tagName: string, propName: string): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node) => {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(sourceFile) === tagName
    )
      node.attributes.properties.forEach((attribute) => {
        if (
          ts.isJsxAttribute(attribute) &&
          attribute.name.getText(sourceFile) === propName &&
          attribute.initializer &&
          ts.isJsxExpression(attribute.initializer) &&
          attribute.initializer.expression
        )
          found.push(attribute.initializer.expression.getText(sourceFile));
      });
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

/** Names the place a `=== 'standard'` comparison sits, so an unexpected one shows in the diff. */
function labelStandardComparison(sourceFile: ts.SourceFile, comparison: ts.Node): string {
  const ancestors: ts.Node[] = [];
  for (let node = comparison.parent; node; node = node.parent) ancestors.push(node);
  // The allowed places first, wherever they sit among the ancestors.
  if (
    ancestors.some(
      (node) =>
        ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === 'getViewOptionsForType',
    )
  )
    return 'getViewOptionsForType';
  if (
    ancestors.some(
      (node) => ts.isIfStatement(node) && node.expression.getText(sourceFile).includes("=== 't'"),
    )
  )
    return 'Ctrl+T insert';
  if (
    ancestors.some(
      (node) =>
        ts.isCallExpression(node) && node.expression.getText(sourceFile) === 'useProjectStylesheet',
    )
  )
    return 'useProjectStylesheet';
  // Anything else: the first line of the nearest statement, so the failure diff shows where it is.
  const statement = ancestors.find((node) => ts.isStatement(node) && !ts.isBlock(node));
  return (statement ?? comparison).getText(sourceFile).split('\n')[0].trim();
}

/** Every comparison of something to `'standard'` with `===`, labelled, in source order. */
function standardComparisonLabels(sourceFile: ts.SourceFile): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node) => {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken &&
      node.right.getText(sourceFile) === "'standard'"
    )
      found.push(labelStandardComparison(sourceFile, node));
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

describe('note pane model wiring (platform-scripture-editor.web-view.tsx)', () => {
  const sourceFile = ts.createSourceFile(
    WEB_VIEW_FILE,
    readFileSync(WEB_VIEW_FILE, 'utf-8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  it('compares the view to Standard only where Standard alone is meant', () => {
    // Every other Standard-only note check goes through `usesPaneNoteModel`.
    expect(standardComparisonLabels(sourceFile)).toEqual([
      // Standard view's own view options
      'getViewOptionsForType',
      // The insert shortcuts stay Standard-only
      'Ctrl+T insert',
      // Which stylesheet mode the text renders in; not a note check
      'useProjectStylesheet',
    ]);
  });

  it('feeds the main editor its own view options, never the pane’s', () => {
    expect(propExpressions(sourceFile, 'Editorial', 'options')).toEqual([
      'editorOptionsWithCopyLimit',
    ]);
  });

  it('shows markers in the pane from the pane’s view options', () => {
    expect(propExpressions(sourceFile, 'FootnotesLayout', 'showMarkers')).toEqual([
      "footnotesPaneViewOptions?.markerMode !== 'hidden'",
    ]);
  });

  it('runs the pane row editor with structure protection off, as Power’s is', () => {
    // A note has no verse or paragraph structure of its own to protect, and 'protected' claims
    // Enter before the note's own `\fp` handling can run.
    expect(sourceFile.getText()).toMatch(
      /\(\{\s*\.\.\.editorOptionsWithCopyLimit,\s*view: footnotesPaneViewOptions,\s*structureProtectionMode: 'off',\s*\}\)/,
    );
  });

  it('re-derives the caller highlight when the pane model changes, not just the view', () => {
    expect(sourceFile.getText()).toMatch(
      /applyCallerHighlight\(\);\s*\}, \[viewType, usesPaneModel, applyCallerHighlight\]\)/,
    );
  });
});
