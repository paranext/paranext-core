import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import {
  descendants,
  effectDependenciesCalling,
  listSourceFiles,
  objectLiteralShape,
  parseSource,
  parseWebViewSource,
  propExpressions,
  variableInitializer,
} from './web-view-source.test-utils';

/*
 * Guards how this extension, chiefly `platform-scripture-editor.web-view.tsx`, applies the
 * footnotes-pane note model. A pane-model view (Standard view, Power's read-only Preview, or
 * Simple's Formatted view — see `usesPaneNoteModel`) edits notes in the pane when its text is
 * editable, navigates the text to a picked note, and highlights its caller; a view that keeps a
 * Standard-only check anywhere along that path behaves half one way and half the other.
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
  const sourceFile = parseWebViewSource();

  it('checks the view against Standard only where Standard alone is meant, across the extension', () => {
    // Every other Standard-only note check goes through `usesPaneNoteModel`.
    const checksByFile = Object.fromEntries(
      listSourceFiles().flatMap((file) => {
        const labels = standardCheckLabels(parseSource(file));
        return labels.length > 0 ? [[file, labels]] : [];
      }),
    );
    expect(checksByFile).toEqual({
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
      'platform-scripture-editor.web-view.tsx': [
        // Standard view's own view options
        'getViewOptionsForType',
        // Which stylesheet mode the text renders in; not a note check
        'useProjectStylesheet',
      ],
    });
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
      view: 'rowEditorViewOptions',
      structureProtectionMode: "'off'",
    });
  });

  it('holds the row editor on its own view options while its session ends', () => {
    // Handed another view's options (Power's Formatted view hides markers), the row editor tears
    // its marker engine down before the session's close can settle a rename under the caret.
    const assignment = descendants(sourceFile).find(
      (node): node is ts.IfStatement =>
        ts.isIfStatement(node) &&
        node.thenStatement.getText(sourceFile).startsWith('rowEditorViewOptionsRef.current ='),
    );
    expect(assignment?.expression.getText(sourceFile)).toBe(
      "noteEditingSurface === 'pane' || paneEditingIndex === undefined",
    );
    expect(assignment?.thenStatement.getText(sourceFile)).toBe(
      'rowEditorViewOptionsRef.current = footnotesPaneViewOptions;',
    );
  });

  it('releases focus from the row editor before the close settles its note', () => {
    // The settle leaves the marker under a focused caret pending.
    const close = variableInitializer(sourceFile, 'closeFootnoteEditor');
    const callStart = (name: string) =>
      descendants(close)
        .find(
          (node) => ts.isCallExpression(node) && node.expression.getText(sourceFile).endsWith(name),
        )
        ?.getStart(sourceFile);
    const blurAt = callStart('.blur');
    const flushAt = callStart('.flushPendingEdits');
    expect(blurAt).toBeDefined();
    expect(flushAt).toBeDefined();
    expect(blurAt ?? Infinity).toBeLessThan(flushAt ?? 0);
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

  it('only navigates to a pane row’s note while a popover still holds the session', () => {
    // The popover applies its text only on Save, so a row editor opened over it would discard
    // what was typed. The text still moves to the note, as Space on the row does.
    const handler = variableInitializer(sourceFile, 'handleFootnoteEditRequested');
    const guard = descendants(handler).find(
      (node): node is ts.IfStatement =>
        ts.isIfStatement(node) &&
        node.expression.getText(sourceFile) === 'showFootnoteEditorRef.current',
    );
    const callsIn = (root: ts.Node) =>
      descendants(root).flatMap((node) =>
        ts.isCallExpression(node) ? [node.expression.getText(sourceFile)] : [],
      );
    const firstEdit = descendants(handler).find(
      (node) =>
        ts.isCallExpression(node) &&
        ['closeFootnoteEditorRef.current', 'startPaneNoteEdit'].includes(
          node.expression.getText(sourceFile),
        ),
    );
    expect(guard).toBeDefined();
    expect(firstEdit).toBeDefined();
    expect(guard?.getStart(sourceFile)).toBeLessThan(firstEdit?.getStart(sourceFile) ?? 0);
    const thenStatement = guard?.thenStatement;
    expect(thenStatement && callsIn(thenStatement)).toEqual(['navigateToNote']);
    expect(thenStatement && descendants(thenStatement).some(ts.isReturnStatement)).toBe(true);
  });

  it('renders the open session’s row editor whatever the editing surface', () => {
    // Unmounting the row editor before the session's close runs flushes its note unsettled,
    // losing a marker rename still pending under its caret.
    expect(propExpressions(sourceFile, 'FootnotesLayout', 'editingFootnoteIndex')).toEqual([
      'paneEditingIndex',
    ]);
  });
});
