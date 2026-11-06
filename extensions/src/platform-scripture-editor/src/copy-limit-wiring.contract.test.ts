import { describe, expect, it } from 'vitest';
import {
  objectLiteralShape,
  parseWebViewSource,
  propExpressions,
  variableInitializer,
} from './web-view-source.test-utils';

/*
 * Guards that every copy surface in `platform-scripture-editor.web-view.tsx` gets the editor's copy
 * limit, the one with the chapter-text loading block applied. The web view cannot be mounted in
 * jsdom (see `content-zoom-markers.contract.test.ts`), and `options` and
 * `editorOptionsWithCopyLimit` have the same type, so passing the wrong one still type-checks. This
 * is a source-reading contract test: it finds each JSX element and checks the expression its prop
 * is given.
 */

describe('copy-limit wiring (platform-scripture-editor.web-view.tsx)', () => {
  const sourceFile = parseWebViewSource();

  it('resolves the copy limit with the chapter-text loading block', () => {
    expect(sourceFile.getText()).toMatch(
      /const copyLimit = useChapterCopyLimit\(projectId, scrRef, isChapterTextLoading\)/,
    );
  });

  it('builds the copy-limited options from that copy limit', () => {
    expect(sourceFile.getText()).toMatch(/\(\) => \(\{ \.\.\.options, copyLimit \}\)/);
  });

  it('gives the editor the copy-limited options', () => {
    expect(propExpressions(sourceFile, 'Editorial', 'options')).toEqual([
      'editorOptionsWithCopyLimit',
    ]);
  });

  it('gives the footnotes pane the copy-limited copy limit', () => {
    expect(propExpressions(sourceFile, 'FootnotesLayout', 'copyLimit')).toEqual([
      'editorOptionsWithCopyLimit.copyLimit',
    ]);
  });

  it('gives every footnote editor (the pane row editor and the popover) the copy-limited options', () => {
    expect(propExpressions(sourceFile, 'FootnoteEditor', 'editorOptions')).toEqual([
      'paneFootnoteEditorOptions',
      'editorOptionsWithCopyLimit',
    ]);
  });

  it('builds the pane row editor’s options from the copy-limited options', () => {
    const { spreads, properties } = objectLiteralShape(
      sourceFile,
      variableInitializer(sourceFile, 'paneFootnoteEditorOptions'),
    );
    expect(spreads).toEqual(['editorOptionsWithCopyLimit']);
    // Overriding `copyLimit` after the spread would undo it.
    expect(properties).not.toHaveProperty('copyLimit');
  });
});
