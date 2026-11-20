import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { descendants, parseSource, parseWebViewSource } from './web-view-source.test-utils';

/*
 * The inline markers menu and the insert-comment chord are the two keyboard sites of the main
 * editor that a mounted test cannot observe (their effect is a popup anchored in a real layout, or
 * a comment editor that needs a live selection). The mounted tests cover the other three sites (the
 * backslash, Enter, the note chords), so this reads the web view's syntax tree for the one thing
 * that matters here: each of the two calls runs only when the platform context menu is NOT claiming
 * the keyboard.
 */

const CLAIMING = 'isEditorContextMenuClaimingKeysRef.current()';

/** Whether `node` sits in the then-branch of an `if (!<claiming>)` whose function is the same. */
function isGuardedByNotClaiming(node: ts.Node, sourceFile: ts.SourceFile): boolean {
  for (let { parent } = node; parent && !ts.isFunctionLike(parent); parent = parent.parent) {
    if (
      ts.isIfStatement(parent) &&
      parent.expression.getText(sourceFile) === `!${CLAIMING}` &&
      // In the then-branch, not in the else-branch.
      parent.thenStatement.pos <= node.pos &&
      node.end <= parent.thenStatement.end
    )
      return true;
  }
  return false;
}

describe('keyboard sites the mounted tests cannot reach (platform-scripture-editor.web-view.tsx)', () => {
  const sourceFile = parseWebViewSource();
  const callsTo = (name: string) =>
    descendants(sourceFile).filter(
      (node): node is ts.CallExpression =>
        ts.isCallExpression(node) && node.expression.getText(sourceFile) === name,
    );

  it.each(['showInlineMarkersMenu', 'insertCommentAtCurrentSelection'])(
    'runs %s from its key handler only while the menu is not claiming the keyboard',
    (name) => {
      // The calls made inside the effect's key handlers; the definitions and the other callers
      // (the menus, the web view's messages) are not key sites.
      const keyHandlers = descendants(sourceFile).filter(
        (node): node is ts.VariableDeclaration =>
          ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === 'handleKeyDown',
      );
      const keySites = callsTo(name).filter((call) =>
        keyHandlers.some((handler) => handler.pos <= call.pos && call.end <= handler.end),
      );
      // Positive control: the key site exists, so the check below is not vacuous.
      expect(keySites.length).toBeGreaterThan(0);

      keySites.forEach((call) => {
        expect(isGuardedByNotClaiming(call, sourceFile)).toBe(true);
      });
    },
  );

  // The hook's own key listener runs ahead of the web view's and consumes every key while the claim
  // lasts, so a mounted test cannot tell whether these three sites gate too; they are the guard for
  // a listener that does run first. What each does while claiming is the contract.
  const claimingBranchOf = (container: ts.Node) =>
    descendants(container).find(
      (node): node is ts.IfStatement =>
        ts.isIfStatement(node) && node.expression.getText(sourceFile) === CLAIMING,
    );
  const ifOnKey = (keyExpression: string) =>
    descendants(sourceFile).find(
      (node): node is ts.IfStatement =>
        ts.isIfStatement(node) &&
        node.expression.getText(sourceFile) === `event.key === ${keyExpression}`,
    );

  it.each(['INLINE_MARKERS_MENU_TRIGGER', "'Enter'"])(
    'claims the %s key while the menu claims the keyboard, so Lexical never sees it',
    (keyExpression) => {
      const keyBranch = ifOnKey(keyExpression);
      expect(keyBranch).toBeDefined();
      const claiming = keyBranch && claimingBranchOf(keyBranch.thenStatement);
      const text = claiming?.thenStatement.getText(sourceFile) ?? '';

      expect(text).toContain('event.preventDefault()');
      expect(text).toContain('event.stopPropagation()');
      expect(text).toContain('return');
    },
  );

  it('drops the footnote and cross-reference chords while the menu claims the keyboard', () => {
    const insertNote = descendants(sourceFile).find(
      (node): node is ts.PropertyAssignment =>
        ts.isPropertyAssignment(node) && node.name.getText(sourceFile) === 'insertNote',
    );
    const claiming = insertNote && claimingBranchOf(insertNote.initializer);

    expect(claiming?.thenStatement.getText(sourceFile)).toBe('return;');
  });

  it('hands the gates the hook’s own claim state', () => {
    const assignment = descendants(sourceFile).find(
      (node): node is ts.BinaryExpression =>
        ts.isBinaryExpression(node) &&
        node.left.getText(sourceFile) === 'isEditorContextMenuClaimingKeysRef.current',
    );

    expect(assignment?.right.getText(sourceFile)).toBe('isEditorContextMenuClaimingKeys');
  });
});

describe('both editors’ menus hand Find the tab’s view options', () => {
  const callSites: [string, ts.SourceFile][] = [
    ['platform-scripture-editor.web-view.tsx', parseWebViewSource()],
    [
      'pane-footnote-editor-context-menu.component.tsx',
      parseSource('pane-footnote-editor-context-menu.component.tsx'),
    ],
  ];

  it.each(callSites)('%s', (_file, sourceFile) => {
    const calls = descendants(sourceFile).filter(
      (node): node is ts.CallExpression =>
        ts.isCallExpression(node) &&
        node.expression.getText(sourceFile) === 'createContextMenuCommandEffects',
    );
    // Positive control: the menu's command effects are built here.
    expect(calls).toHaveLength(1);
    const [options] = calls[0].arguments;
    const viewOptions =
      ts.isObjectLiteralExpression(options) &&
      options.properties.find((property) => property.name?.getText(sourceFile) === 'viewOptions');

    expect(viewOptions && viewOptions.getText(sourceFile)).toMatch(/^viewOptions\b/);
  });
});
