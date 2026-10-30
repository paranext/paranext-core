import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import {
  descendants,
  objectLiteralShape,
  parseWebViewSource,
  variableInitializer,
} from './web-view-source.test-utils';

/*
 * Pins that the web view actually gives the footnotes pane the settle hold. The web view cannot be
 * mounted in jsdom (see `content-zoom-markers.contract.test.ts`), so this reads its source. Without
 * this wiring, every unit test of the hook and of the ownership check still passes, while a Find
 * replacement made right after a pane edit is overwritten.
 */

describe('footnotes pane settle hold wiring (platform-scripture-editor.web-view.tsx)', () => {
  const source = parseWebViewSource();

  it('tells useEditorPdpSync when the pane owns the content', () => {
    const syncCall = descendants(source).find(
      (node) => ts.isCallExpression(node) && node.expression.getText(source) === 'useEditorPdpSync',
    );
    if (!syncCall) throw new Error('No useEditorPdpSync call found');

    expect(objectLiteralShape(source, syncCall).properties.isFootnotesPaneOwner).toBe(
      'isFootnotesPaneOwner',
    );
  });

  it('answers from the open note session and the pane session', () => {
    const predicate = variableInitializer(source, 'isFootnotesPaneOwner').getText(source);

    expect(predicate).toContain(
      'doesPaneSessionOwnContent(editingNoteKey.current, getPaneEditingSession(), Date.now())',
    );
  });
});
