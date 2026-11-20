import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { descendants, parseSource, parseWebViewSource } from './web-view-source.test-utils';

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
