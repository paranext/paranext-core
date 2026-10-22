import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import {
  descendants,
  effectDependenciesCalling,
  objectLiteralShape,
  parseWebViewSource,
  propExpressions,
  variableInitializer,
} from './web-view-source.test-utils';

/*
 * Guards how `platform-scripture-editor.web-view.tsx` applies the footnotes-pane note model. A
 * pane-model view (Standard view, or Simple's Formatted view — see `usesPaneNoteModel`) edits
 * notes in the pane, navigates the text to a picked note, and highlights its caller; a view that
 * keeps a Standard-only check anywhere along that path behaves half one way and half the other.
 * The web view cannot be mounted in jsdom (see `content-zoom-markers.contract.test.ts`), so this
 * is a source-reading contract test, like `copy-limit-wiring.contract.test.ts`.
 */

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
    if (ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === 'getViewOptionsForType')
      return 'getViewOptionsForType';
    if (ts.isIfStatement(node) && contains(node.expression)) {
      const condition = node.expression.getText(sourceFile);
      if (condition.includes("=== 't'")) return 'Ctrl+T insert';
      if (condition.includes('defaultMarkersMenuTrigger')) return 'main-text marker menu trigger';
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sourceFile) === 'useProjectStylesheet' &&
      node.arguments.some(contains)
    )
      return 'useProjectStylesheet';
  }
  // Anything else: the first line of the nearest statement, so the failure diff shows where it is.
  let statement: ts.Node = check;
  while (statement.parent && !(ts.isStatement(statement) && !ts.isBlock(statement)))
    statement = statement.parent;
  return statement.getText(sourceFile).split('\n')[0].trim();
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

describe('note pane model wiring (platform-scripture-editor.web-view.tsx)', () => {
  const sourceFile = parseWebViewSource();

  it('checks the view against Standard only where Standard alone is meant', () => {
    // Every other Standard-only note check goes through `usesPaneNoteModel`.
    expect(standardCheckLabels(sourceFile)).toEqual([
      // Standard view's own view options
      'getViewOptionsForType',
      // The `\` marker menu in the main text; Standard view types markers in place instead
      'main-text marker menu trigger',
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

  it('runs the pane row editor on the pane’s view options with structure protection off, as Power’s is', () => {
    // A note has no verse or paragraph structure of its own to protect, and 'protected' claims
    // Enter before the note's own `\fp` handling can run.
    const { properties } = objectLiteralShape(
      sourceFile,
      variableInitializer(sourceFile, 'paneFootnoteEditorOptions'),
    );
    expect(properties).toMatchObject({
      view: 'footnotesPaneViewOptions',
      structureProtectionMode: "'off'",
    });
  });

  it('re-derives the caller highlight when the pane model changes, not just the view', () => {
    const effects = effectDependenciesCalling(sourceFile, 'applyCallerHighlight');
    expect(effects.some((dependencies) => dependencies.includes('viewType'))).toBe(true);
    expect(
      effects
        .filter((dependencies) => dependencies.includes('viewType'))
        .every((dependencies) => dependencies.includes('usesPaneModel')),
    ).toBe(true);
  });

  it('leaves a pane row merely selected while a popover still holds the session', () => {
    // The popover applies its text only on Save, so a row editor opened over it would discard
    // what was typed.
    const handler = variableInitializer(sourceFile, 'handleFootnoteEditRequested');
    const guard = descendants(handler).find(
      (node): node is ts.IfStatement =>
        ts.isIfStatement(node) &&
        node.expression.getText(sourceFile) === 'showFootnoteEditorRef.current' &&
        ts.isReturnStatement(node.thenStatement),
    );
    const firstEdit = descendants(handler).find(
      (node) =>
        ts.isCallExpression(node) &&
        ['closeFootnoteEditorRef.current', 'navigateToNote', 'startPaneNoteEdit'].includes(
          node.expression.getText(sourceFile),
        ),
    );
    expect(guard).toBeDefined();
    expect(firstEdit).toBeDefined();
    expect(guard?.getStart(sourceFile)).toBeLessThan(firstEdit?.getStart(sourceFile) ?? 0);
  });
});
