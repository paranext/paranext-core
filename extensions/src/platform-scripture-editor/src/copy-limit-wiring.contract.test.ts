import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

/*
 * Guards that every copy surface in `platform-scripture-editor.web-view.tsx` gets the editor's copy
 * limit, the one with the chapter-text loading block applied. The web view cannot be mounted in
 * jsdom (see `content-zoom-markers.contract.test.ts`), and `options` and
 * `editorOptionsWithCopyLimit` have the same type, so passing the wrong one still type-checks. This
 * is a source-reading contract test: it finds each JSX element and checks the expression its prop
 * is given.
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

describe('copy-limit wiring (platform-scripture-editor.web-view.tsx)', () => {
  const sourceFile = ts.createSourceFile(
    WEB_VIEW_FILE,
    readFileSync(WEB_VIEW_FILE, 'utf-8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

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

  it('gives the footnote editor the copy-limited options', () => {
    expect(propExpressions(sourceFile, 'FootnoteEditor', 'editorOptions')).toEqual([
      'editorOptionsWithCopyLimit',
    ]);
  });
});
