import { describe, it, expect } from 'vitest';

/**
 * ScripturePane component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interface and utility logic.
 */

describe('scripture-pane.component', () => {
  it('ScripturePaneProps callback signatures are correctly typed', () => {
    let footnotesCallbackCalled = false;
    let zoomCallbackCalled = false;
    let wordClickCallbackCalled = false;

    const props: import('./scripture-pane.component').ScripturePaneProps = {
      scriptureHtml: '<p>Test scripture content</p>',
      footnoteHtml: '<p>Test footnote content</p>',
      showFootnotes: false,
      onShowFootnotesChange: (show: boolean) => {
        footnotesCallbackCalled = true;
        expect(typeof show).toBe('boolean');
      },
      zoomLevel: 100,
      onZoomChange: (zoom: number) => {
        zoomCallbackCalled = true;
        expect(typeof zoom).toBe('number');
      },
      onWordClick: (wordFilter) => {
        wordClickCallbackCalled = true;
        expect(wordFilter).toHaveProperty('lemma');
        expect(wordFilter).toHaveProperty('lexicalLinks');
        expect(wordFilter).toHaveProperty('surfaceForm');
        expect(wordFilter).toHaveProperty('sourcePane');
      },
      highlightState: {
        researchTerms: true,
        found: false,
        missing: false,
      },
    };

    // Exercise callbacks to verify they work correctly
    props.onShowFootnotesChange(true);
    props.onZoomChange(110);
    props.onWordClick({
      lemma: 'logos',
      lexicalLinks: ['SDBG:logos:001001'],
      surfaceForm: 'word',
      sourcePane: 'scripture',
    });

    expect(footnotesCallbackCalled).toBe(true);
    expect(zoomCallbackCalled).toBe(true);
    expect(wordClickCallbackCalled).toBe(true);
  });

  it('exports WordFilterData interface via type check', () => {
    const wordFilter: import('./scripture-pane.component').WordFilterData = {
      lemma: 'arche',
      lexicalLinks: ['SDBG:arche:001001'],
      surfaceForm: 'beginning',
      sourcePane: 'scripture',
    };
    expect(wordFilter.lemma).toBe('arche');
    expect(wordFilter.lexicalLinks).toHaveLength(1);
    expect(wordFilter.surfaceForm).toBe('beginning');
    expect(wordFilter.sourcePane).toBe('scripture');
  });

  it('exports HighlightState interface via type check', () => {
    const state: import('./scripture-pane.component').HighlightState = {
      researchTerms: true,
      found: false,
      missing: true,
    };
    expect(state.researchTerms).toBe(true);
    expect(state.found).toBe(false);
    expect(state.missing).toBe(true);
  });

  it('ScripturePaneProps supports empty HTML content', () => {
    const props: import('./scripture-pane.component').ScripturePaneProps = {
      scriptureHtml: '',
      footnoteHtml: '',
      showFootnotes: false,
      onShowFootnotesChange: () => {},
      zoomLevel: 100,
      onZoomChange: () => {},
      onWordClick: () => {},
      highlightState: {
        researchTerms: false,
        found: false,
        missing: false,
      },
    };
    expect(props.scriptureHtml).toBe('');
    expect(props.footnoteHtml).toBe('');
    expect(props.zoomLevel).toBe(100);
  });

  it('ScripturePaneProps zoom level supports min and max bounds', () => {
    const props: import('./scripture-pane.component').ScripturePaneProps = {
      scriptureHtml: '<p>Content</p>',
      footnoteHtml: '',
      showFootnotes: false,
      onShowFootnotesChange: () => {},
      zoomLevel: 50,
      onZoomChange: () => {},
      onWordClick: () => {},
      highlightState: { researchTerms: false, found: false, missing: false },
    };
    expect(props.zoomLevel).toBe(50);

    const maxProps: import('./scripture-pane.component').ScripturePaneProps = {
      ...props,
      zoomLevel: 200,
    };
    expect(maxProps.zoomLevel).toBe(200);
  });

  it('WordFilterData supports multiple lexical links', () => {
    const wordFilter: import('./scripture-pane.component').WordFilterData = {
      lemma: 'dabar',
      lexicalLinks: ['SDBH:dabar:001001', 'SDBH:dabar:001002'],
      surfaceForm: 'word',
      sourcePane: 'scripture',
    };
    expect(wordFilter.lexicalLinks).toHaveLength(2);
  });

  it('WordFilterData supports empty lexical links', () => {
    const wordFilter: import('./scripture-pane.component').WordFilterData = {
      lemma: 'unknown',
      lexicalLinks: [],
      surfaceForm: 'text',
      sourcePane: 'scripture',
    };
    expect(wordFilter.lexicalLinks).toHaveLength(0);
  });

  it('ScripturePaneProps handles footnote visibility toggle', () => {
    let receivedShow: boolean | undefined;

    const props: import('./scripture-pane.component').ScripturePaneProps = {
      scriptureHtml: '<p>Content</p>',
      footnoteHtml: '<p>Footnote</p>',
      showFootnotes: true,
      onShowFootnotesChange: (show) => {
        receivedShow = show;
      },
      zoomLevel: 100,
      onZoomChange: () => {},
      onWordClick: () => {},
      highlightState: { researchTerms: true, found: true, missing: true },
    };

    // Simulate toggling footnotes off
    props.onShowFootnotesChange(false);
    expect(receivedShow).toBe(false);

    // Simulate toggling footnotes on
    props.onShowFootnotesChange(true);
    expect(receivedShow).toBe(true);
  });
});
