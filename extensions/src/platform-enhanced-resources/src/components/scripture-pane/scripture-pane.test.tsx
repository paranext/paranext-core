// @vitest-environment jsdom
// We pull the click handler out of `setAnnotationSpy.mock.calls[0][3]` (typed `unknown`) and
// must cast it to a callable signature for the test to invoke it. There is no cleaner alternative.
/* eslint-disable no-type-assertion/no-type-assertion */
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  EnhancedScripturePane,
  ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
  annotationToRange,
  detectSourceLanguage,
  renderTooltipMarkdown,
} from './scripture-pane.component';
import type { MarbleAnnotation } from '../../lib/marble-converter';
import type { TooltipViewModel } from '../../presenters/tooltip-presenter';

// Module-scope spies so tests can assert on calls across renders. The mock's
// useImperativeHandle returns a fresh object each render, but the spies it
// references are stable - so assertions stay reliable.
const setAnnotationSpy = vi.fn();
const removeAnnotationSpy = vi.fn();

// papi.overlays is an external boundary; mock it so unit tests can assert on
// hover-lifecycle calls without spinning up the real overlay service.
const mockShowPopover = vi.fn();
const mockUpdatePopover = vi.fn();
const mockDismissPopover = vi.fn();

vi.mock('@papi/frontend', () => ({
  default: {
    overlays: {
      showPopover: (...args: unknown[]) => mockShowPopover(...args),
      updatePopover: (...args: unknown[]) => mockUpdatePopover(...args),
      dismissPopover: (...args: unknown[]) => mockDismissPopover(...args),
    },
  },
  logger: { warn: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

// Network-object proxy mock. The component fetches the popover content through this proxy (no
// papi.commands.sendCommand path remains since the D-02 fix). Methods declared with vi.fn() so
// individual tests can override .mockResolvedValueOnce / .mockRejectedValueOnce as needed.
// EnhancedResourcesNetworkObject has many methods we don't exercise in this test - cast through
// `unknown` so we only need to stub the two methods the scripture pane actually calls.
const mockErProxy = {
  buildTooltipData: vi.fn(),
  translatePartOfSpeech: vi.fn(),
} as unknown as import('../../lib/use-enhanced-resources-proxy').EnhancedResourcesNetworkObject & {
  buildTooltipData: ReturnType<typeof vi.fn>;
  translatePartOfSpeech: ReturnType<typeof vi.fn>;
};

const SCR_REF_JHN_1_1 = { book: 'JHN', chapterNum: 1, verseNum: 1 };

beforeAll(() => {
  (globalThis as unknown as { webViewId: string }).webViewId = 'test-webview';
});

// Editorial is heavy and depends on Lexical; mock it so unit tests stay fast and isolated.
// The mock renders a div the tests can query, and exposes setAnnotation/removeAnnotation spies on a ref.
vi.mock('@eten-tech-foundation/platform-editor', () => {
  return {
    Editorial: React.forwardRef(function MockEditorial(
      props: { defaultUsj?: unknown; options?: { isReadonly?: boolean } },
      ref: React.Ref<{
        setAnnotation: (...args: unknown[]) => void;
        removeAnnotation: (...args: unknown[]) => void;
      }>,
    ) {
      React.useImperativeHandle(ref, () => ({
        setAnnotation: setAnnotationSpy,
        removeAnnotation: removeAnnotationSpy,
      }));
      return (
        <div
          data-testid="mock-editorial"
          data-readonly={String(props.options?.isReadonly ?? false)}
          data-has-usj={String(props.defaultUsj !== undefined)}
        />
      );
    }),
    getDefaultViewOptions: () => ({}),
  };
});

const STRINGS_BAG = {
  '%enhancedResources_scripturePane_loading%': 'Loading',
  '%enhancedResources_scripturePane_emptyTitle%': 'No content',
  '%enhancedResources_scripturePane_emptyDescription%': 'Open a resource',
  '%enhancedResources_scripturePane_errorTitle%': 'Something went wrong',
  '%enhancedResources_scripturePane_filterActive%': 'Filter',
};

/**
 * Build a minimal USJ fixture whose first paragraph has `count` text children. Annotation paths
 * shaped `$.content[0].content[N]` resolve to string leaves, so `annotationToRange` returns a valid
 * non-collapsed range for each.
 */
function makeTestUsj(count: number): Usj {
  return {
    type: 'USJ',
    version: '3.1',
    content: [
      {
        type: 'para',
        marker: 'p',
        content: Array.from({ length: count }, (_, i) => `word-${i}`),
      },
    ],
  } as unknown as Usj;
}

beforeEach(() => {
  // restoreAllMocks resets vi.spyOn() targets back to originals - must run BEFORE we install
  // the per-test mock implementations below, otherwise our resolved-value setup gets wiped.
  vi.restoreAllMocks();
  setAnnotationSpy.mockClear();
  removeAnnotationSpy.mockClear();
  mockShowPopover.mockReset();
  mockShowPopover.mockResolvedValue('overlay-1');
  mockUpdatePopover.mockReset();
  mockUpdatePopover.mockResolvedValue(undefined);
  mockDismissPopover.mockReset();
  mockDismissPopover.mockResolvedValue(undefined);
  mockErProxy.buildTooltipData.mockReset();
  mockErProxy.buildTooltipData.mockResolvedValue({
    sourceForm: 'λόγος',
    lemma: 'λόγος',
    partOfSpeechRaw: 'noun',
    rawGlosses: ['word, speech, reason'],
  });
  mockErProxy.translatePartOfSpeech.mockReset();
  mockErProxy.translatePartOfSpeech.mockResolvedValue({
    displayString: 'noun (masculine)',
    isKnown: true,
    localizationKey: 'pos.noun.m',
  });
});

describe('EnhancedScripturePane', () => {
  it('renders the loading skeleton when isLoading is true', () => {
    render(
      <EnhancedScripturePane
        usj={undefined}
        annotations={[]}
        isLoading
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    const pane = screen.getByTestId('er-scripture-pane');
    expect(pane).toHaveAttribute('aria-busy', 'true');
  });

  it('renders the empty state when usj is undefined and not loading', () => {
    render(
      <EnhancedScripturePane
        usj={undefined}
        annotations={[]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    expect(screen.getByText('No content')).toBeInTheDocument();
    expect(screen.getByText('Open a resource')).toBeInTheDocument();
  });

  it('renders an alert when errorMessage is provided', () => {
    render(
      <EnhancedScripturePane
        usj={undefined}
        annotations={[]}
        errorMessage="boom"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.getByRole('alert')).toHaveTextContent('boom');
  });

  it('renders the Editorial component in readonly mode when usj is supplied', () => {
    render(
      <EnhancedScripturePane
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={[]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    const editorial = screen.getByTestId('mock-editorial');
    expect(editorial).toHaveAttribute('data-readonly', 'true');
    expect(editorial).toHaveAttribute('data-has-usj', 'true');
  });

  it('exports the localized string keys as a frozen array', () => {
    expect(Object.isFrozen(ENHANCED_SCRIPTURE_PANE_STRING_KEYS)).toBe(true);
    expect(ENHANCED_SCRIPTURE_PANE_STRING_KEYS).toContain(
      '%enhancedResources_scripturePane_emptyTitle%',
    );
  });

  it('calls setAnnotation for each marble annotation when usj + annotations are supplied', () => {
    const annotations: MarbleAnnotation[] = [
      {
        usjPath: '$.content[0].content[1]',
        kind: 'word',
        annotationId: 'wg-001',
        metadata: { strong: 'H7225' },
      },
      {
        usjPath: '$.content[0].content[2]',
        kind: 'note',
        annotationId: 'note-1',
        metadata: { caller: '+' },
      },
    ];
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(3)}
        annotations={annotations}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // setAnnotation should be called only for word annotations; notes are skipped because in
    // readonly mode the editor renders note callers as ImmutableNoteCallerNode whose content
    // children don't exist in the Lexical tree, causing path resolution to silently fail.
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    // Only call: word annotation
    expect(setAnnotationSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        start: expect.objectContaining({ jsonPath: '$.content[0].content[1]' }),
      }),
      'marble-word',
      'wg-001',
      expect.objectContaining({ onClick: expect.any(Function) }),
    );
  });

  it('routes a left-click on an annotation to onTokenClick (not onTokenContextMenu)', () => {
    const onTokenClick = vi.fn();
    const onTokenContextMenu = vi.fn();
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(2)}
        annotations={[annotation]}
        onTokenClick={onTokenClick}
        onTokenContextMenu={onTokenContextMenu}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // Grab the onClick callback the component registered with the editor.
    const callbacks = setAnnotationSpy.mock.calls[0][3] as {
      onClick: (event: { button: number }, type: string, id: string, textContent: string) => void;
    };
    const clickHandler = callbacks.onClick;
    clickHandler({ button: 0 }, 'marble-word', 'wg-001', 'λόγος');
    expect(onTokenClick).toHaveBeenCalledWith('wg-001', annotation, 'λόγος');
    expect(onTokenContextMenu).not.toHaveBeenCalled();
  });

  it('routes a right-click (button 2) on an annotation to onTokenContextMenu', () => {
    const onTokenClick = vi.fn();
    const onTokenContextMenu = vi.fn();
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(2)}
        annotations={[annotation]}
        onTokenClick={onTokenClick}
        onTokenContextMenu={onTokenContextMenu}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    const callbacks = setAnnotationSpy.mock.calls[0][3] as {
      onClick: (event: { button: number }, type: string, id: string, textContent: string) => void;
    };
    const clickHandler = callbacks.onClick;
    clickHandler({ button: 2 }, 'marble-word', 'wg-001', 'λόγος');
    expect(onTokenContextMenu).toHaveBeenCalledWith('wg-001', annotation, expect.anything());
    expect(onTokenClick).not.toHaveBeenCalled();
  });

  it('calls editor.setAnnotation with marble-filter when filteredTokenId matches a known annotation', () => {
    // Effect B layers a single marble-filter overlay via editor.setAnnotation on the
    // already-marked marble-word range.
    const annotations: MarbleAnnotation[] = [
      {
        usjPath: '$.content[0].content[1]',
        kind: 'word',
        annotationId: 'wg-001',
        metadata: {},
      },
    ];

    render(
      <EnhancedScripturePane
        usj={makeTestUsj(2)}
        annotations={annotations}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );

    const filterCalls = setAnnotationSpy.mock.calls.filter(([, type]) => type === 'marble-filter');
    expect(filterCalls).toHaveLength(1);
    expect(filterCalls[0][2]).toBe('wg-001');
    expect(filterCalls[0][0]).toEqual(
      expect.objectContaining({
        start: expect.objectContaining({ jsonPath: '$.content[0].content[1]' }),
      }),
    );
  });

  it('calls editor.setAnnotation with marble-highlight for each word annotation when highlightAllResearchTerms is true', async () => {
    // Effect C layers per-annotation marble-highlight overlays via editor.setAnnotation,
    // chunked across RAF ticks to avoid blocking the click handler.
    const annotations: MarbleAnnotation[] = [
      {
        usjPath: '$.content[0].content[1]',
        kind: 'word',
        annotationId: 'wg-001',
        metadata: {},
      },
      {
        usjPath: '$.content[0].content[2]',
        kind: 'note',
        annotationId: 'note-1',
        metadata: { caller: '+' },
      },
    ];
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(3)}
        annotations={annotations}
        highlightAllResearchTerms
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await vi.waitFor(() => {
      const highlightCalls = setAnnotationSpy.mock.calls.filter(
        ([, type]) => type === 'marble-highlight',
      );
      // Only word annotations get highlight overlays; notes are skipped.
      expect(highlightCalls).toHaveLength(1);
      expect(highlightCalls[0][2]).toBe('wg-001');
    });
  });

  it('does not re-run the annotation effect when re-rendered with the same props (no fake-dep churn)', () => {
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    const usj = makeTestUsj(2);
    // Hold every prop reference stable across renders so the only thing that *could* change
    // is the unstable inline `() => {}` defaults the component itself fabricates.
    const annotationsArr = [annotation];
    const localized: [Record<string, string>, boolean] = [STRINGS_BAG, false];
    const { rerender } = render(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    setAnnotationSpy.mockClear();
    removeAnnotationSpy.mockClear();
    // Re-render with the same props. With unstable defaults (`() => {}` recreated each render),
    // the effect re-runs and calls setAnnotation again. With Fix 1's module-level constants,
    // the dep array sees identical references and the effect does NOT re-run.
    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    expect(setAnnotationSpy).not.toHaveBeenCalled();
    expect(removeAnnotationSpy).not.toHaveBeenCalled();
  });

  it('toggling filteredTokenId only adds the filter overlay, not a fresh base annotation', () => {
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    const annotationsArr = [annotation];
    const localized: [Record<string, string>, boolean] = [STRINGS_BAG, false];
    const usj = makeTestUsj(2);

    const { rerender } = render(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    // First render: base marble-word annotation only.
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    expect(setAnnotationSpy.mock.calls[0][1]).toBe('marble-word');
    setAnnotationSpy.mockClear();

    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={localized}
      />,
    );
    // Effect B fires: a single marble-filter overlay. Base annotation is NOT re-applied
    // (Effect A's deps haven't changed).
    const filterCalls = setAnnotationSpy.mock.calls.filter(([, type]) => type === 'marble-filter');
    const wordCalls = setAnnotationSpy.mock.calls.filter(([, type]) => type === 'marble-word');
    expect(filterCalls).toHaveLength(1);
    expect(filterCalls[0][2]).toBe('wg-001');
    expect(wordCalls).toHaveLength(0);
    setAnnotationSpy.mockClear();
    removeAnnotationSpy.mockClear();

    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    // Filter overlay removed; base annotation not touched.
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-filter', 'wg-001');
    expect(setAnnotationSpy).not.toHaveBeenCalled();
  });

  it('toggling highlightAllResearchTerms only adds highlight overlays, not fresh base annotations', async () => {
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    const annotationsArr = [annotation];
    const localized: [Record<string, string>, boolean] = [STRINGS_BAG, false];
    const usj = makeTestUsj(2);
    const { rerender } = render(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={localized}
      />,
    );
    // First render: 1 base + 1 filter overlay.
    const initialCalls = setAnnotationSpy.mock.calls;
    expect(initialCalls.filter(([, type]) => type === 'marble-word')).toHaveLength(1);
    expect(initialCalls.filter(([, type]) => type === 'marble-filter')).toHaveLength(1);
    setAnnotationSpy.mockClear();
    removeAnnotationSpy.mockClear();

    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        filteredTokenId="wg-001"
        highlightAllResearchTerms
        localizedStringsWithLoadingState={localized}
      />,
    );
    // Effect C fires: a single marble-highlight overlay. Base + filter are NOT re-applied.
    await vi.waitFor(() => {
      const highlightCalls = setAnnotationSpy.mock.calls.filter(
        ([, type]) => type === 'marble-highlight',
      );
      expect(highlightCalls).toHaveLength(1);
      expect(highlightCalls[0][2]).toBe('wg-001');
    });
    expect(setAnnotationSpy.mock.calls.filter(([, type]) => type === 'marble-word')).toHaveLength(
      0,
    );
    expect(setAnnotationSpy.mock.calls.filter(([, type]) => type === 'marble-filter')).toHaveLength(
      0,
    );
  });

  it('chunks setAnnotation calls across animation frames so the JS thread can service other work', async () => {
    // 120 annotations exceeds the CHUNK_SIZE of 50, forcing at least two RAF yields.
    const annotations: MarbleAnnotation[] = Array.from({ length: 120 }, (_, i) => ({
      usjPath: `$.content[0].content[${i}]`,
      kind: 'word',
      annotationId: `wg-${i}`,
      metadata: {},
    }));
    // Spy on requestAnimationFrame to confirm the effect yielded.
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame');
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(120)}
        annotations={annotations}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await vi.waitFor(() => {
      expect(setAnnotationSpy).toHaveBeenCalledTimes(120);
    });
    expect(rafSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('aborts mid-apply if the component unmounts during the chunked loop', async () => {
    const annotations: MarbleAnnotation[] = Array.from({ length: 200 }, (_, i) => ({
      usjPath: `$.content[0].content[${i}]`,
      kind: 'word',
      annotationId: `wg-${i}`,
      metadata: {},
    }));
    // Stub requestAnimationFrame so we can intercept the first yield and unmount before chunk 2.
    let rafCallback: FrameRequestCallback | undefined;
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 0;
    });
    const { unmount } = render(
      <EnhancedScripturePane
        usj={makeTestUsj(200)}
        annotations={annotations}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // First chunk applied synchronously (50 calls), then RAF was registered.
    await vi.waitFor(() => {
      expect(setAnnotationSpy).toHaveBeenCalledTimes(50);
      expect(rafCallback).toBeDefined();
    });
    unmount();
    // Now release the RAF gate. Cancellation should short-circuit before chunk 2 runs.
    if (rafCallback) rafCallback(performance.now());
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
    // Total setAnnotation calls should not have grown past the first chunk.
    expect(setAnnotationSpy).toHaveBeenCalledTimes(50);
  });

  it('renders surface text in the filter banner when filteredTokenSurface is provided', () => {
    render(
      <EnhancedScripturePane
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={[]}
        filteredTokenId="453"
        filteredTokenSurface="λόγος"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Filter: λόγος');
  });

  it('falls back to filteredTokenId in the filter banner when surface is not provided', () => {
    render(
      <EnhancedScripturePane
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={[]}
        filteredTokenId="453"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Filter: 453');
  });

  it('removes all applied annotations on unmount', async () => {
    const { unmount } = render(
      <EnhancedScripturePane
        usj={makeTestUsj(2)}
        annotations={[
          {
            usjPath: '$.content[0].content[1]',
            kind: 'word',
            annotationId: 'wg-001',
            metadata: {},
          },
        ]}
        filteredTokenId="wg-001"
        highlightAllResearchTerms
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // Wait for Effect C's chunked apply to register the highlight overlay before unmount,
    // otherwise the cleanup loop has nothing to remove for marble-highlight.
    await vi.waitFor(() => {
      expect(
        setAnnotationSpy.mock.calls.filter(([, type]) => type === 'marble-highlight'),
      ).toHaveLength(1);
    });

    removeAnnotationSpy.mockClear();
    unmount();

    // Each effect's cleanup calls removeAnnotation for its overlay type.
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-word', 'wg-001');
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-filter', 'wg-001');
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-highlight', 'wg-001');
  });
});

describe('marble hover lifecycle', () => {
  function getHoverHandlersForCall(callIndex: number) {
    const callbacks = setAnnotationSpy.mock.calls[callIndex][3] as {
      onClick?: (...args: unknown[]) => void;
      onMouseEnter?: (event: MouseEvent, type: string, id: string, textContent: string) => void;
      onMouseLeave?: (event: MouseEvent, type: string, id: string, textContent: string) => void;
    };
    return callbacks;
  }

  function makeFakeMouseEvent(): MouseEvent {
    const target = document.createElement('span');
    target.getBoundingClientRect = () => ({
      x: 10,
      y: 20,
      width: 30,
      height: 40,
      top: 20,
      left: 10,
      right: 40,
      bottom: 60,
      toJSON: () => '',
    });
    const event = new MouseEvent('mouseenter');
    Object.defineProperty(event, 'currentTarget', { value: target });
    return event;
  }

  // lexicalLinks shape is `NAMESPACE:LEMMA:ID`; the consumer extracts the middle segment as the
  // lemma for hover-time matching. Use simple ASCII namespaces / IDs so tests are readable.
  const wordA: MarbleAnnotation = {
    usjPath: '$.content[0].content[1]',
    kind: 'word',
    annotationId: 'wg-A',
    metadata: { lexicalLinks: ['SDBH:logos:001'] },
  };
  const wordB: MarbleAnnotation = {
    usjPath: '$.content[0].content[2]',
    kind: 'word',
    annotationId: 'wg-B',
    metadata: { lexicalLinks: ['SDBH:logos:002'] },
  };
  const wordC: MarbleAnnotation = {
    usjPath: '$.content[0].content[3]',
    kind: 'word',
    annotationId: 'wg-C',
    metadata: { lexicalLinks: ['SDBH:theos:003'] },
  };

  it('mouseenter on a marble-word triggers showPopover with the anchor rect', async () => {
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA, wordB, wordC]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);
    expect(handlers.onMouseEnter).toBeDefined();

    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');

    expect(mockShowPopover).toHaveBeenCalledTimes(1);
    expect(mockShowPopover).toHaveBeenCalledWith(
      expect.objectContaining({
        anchor: { x: 10, y: 20, width: 30, height: 40 },
        side: 'top',
        content: expect.objectContaining({ type: 'markdown' }),
      }),
      'test-webview',
    );
  });

  // NOTE: A previous integration test asserted `updatePopover` was called with markdown
  // containing the lemma after `buildTooltipData` resolved. That test exercised the runtime
  // wiring of mockUpdatePopover and asserted the OLD markdown shape (Lemma/POS/gloss/Strong/
  // notes). The current emitter produces a different shape (sourceForm / POS / lemma /
  // rendering-status). Markdown-emission behavior is now covered directly by the
  // `renderTooltipMarkdown` describe block at the bottom of this file, which is the right
  // unit-of-test boundary for the emitter. See Task 3a.10.

  it('mouseleave dismisses the popover and removes hover-match annotations', async () => {
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA, wordB, wordC]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);
    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');
    await Promise.resolve();

    removeAnnotationSpy.mockClear();
    handlers.onMouseLeave!(new MouseEvent('mouseleave'), 'marble-word', 'wg-A', 'logos');

    expect(mockDismissPopover).toHaveBeenCalledWith('overlay-1');
    // hover-match annotations applied to wg-A and wg-B (both share lemma 'logos') get removed.
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-hover-match', 'wg-A');
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-hover-match', 'wg-B');
  });

  it('RESOURCE_EXHAUSTED from showPopover is swallowed', async () => {
    mockShowPopover.mockRejectedValueOnce({ code: 'RESOURCE_EXHAUSTED', message: 'debounced' });
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);

    expect(() => {
      handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');
    }).not.toThrow();
  });

  it('buildTooltipData rejection leaves loading markdown without crashing', async () => {
    mockErProxy.buildTooltipData.mockRejectedValueOnce(new Error('backend down'));
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
        erProxy={mockErProxy}
        resourceId="ESV"
        glossLanguage="en"
        scrRef={SCR_REF_JHN_1_1}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);
    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');
    // Flush the showLoadingPopover and the (rejecting) buildTooltipData promises.
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    // Loading popover still anchors; structured updatePopover never fires because the backend
    // fetch rejected. The component logs a warning (mocked) and bails - no throw, no crash.
    expect(mockShowPopover).toHaveBeenCalledTimes(1);
    expect(mockUpdatePopover).not.toHaveBeenCalled();
  });

  it('happy path: hover fires buildTooltipData -> translatePartOfSpeech -> updatePopover with structured markdown', async () => {
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
        erProxy={mockErProxy}
        resourceId="ESV"
        glossLanguage="en"
        scrRef={SCR_REF_JHN_1_1}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);

    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');

    // Wait for showLoadingPopover + buildTooltipData + translatePartOfSpeech + updatePopover.
    await vi.waitFor(() => {
      expect(mockUpdatePopover).toHaveBeenCalled();
    });

    // buildTooltipData received the wire-shaped TooltipInputDto (resourceId, tokenId,
    // currentReference in bookNum form, glossLanguage). bookNum 43 = JHN.
    expect(mockErProxy.buildTooltipData).toHaveBeenCalledWith(
      expect.objectContaining({
        resourceId: 'ESV',
        tokenId: 'wg-A',
        glossLanguage: 'en',
        currentReference: expect.objectContaining({
          bookNum: 43,
          chapterNum: 1,
          verseNum: 1,
        }),
      }),
    );

    // After tooltip data lands, the component calls translatePartOfSpeech with the raw POS code.
    // The source form 'λόγος' is Greek-block, so the language argument is 'Greek'.
    expect(mockErProxy.translatePartOfSpeech).toHaveBeenCalledWith('noun', 'Greek', 'long');

    // updatePopover receives the structured markdown for the resolved tooltip data.
    const updateCall = mockUpdatePopover.mock.calls[0];
    expect(updateCall[0]).toBe('overlay-1');
    expect(updateCall[1]).toEqual(
      expect.objectContaining({
        type: 'markdown',
        // sourceForm bold header, then localized POS, then lemma label, then gloss.
        markdown: expect.stringContaining('**λόγος**'),
      }),
    );
    expect(updateCall[1].markdown).toContain('noun (masculine)');
    expect(updateCall[1].markdown).toContain('word, speech, reason');
  });

  it('lemma-matching annotations sharing the hovered lemma get marble-hover-match overlays', async () => {
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA, wordB, wordC]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);
    setAnnotationSpy.mockClear();

    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');

    // wordA and wordB share 'logos' lemma; wordC has 'theos' (non-matching).
    // The implementation calls editor.setAnnotation with type 'marble-hover-match' for each
    // matching annotation id (including the hovered word itself).
    const matchCalls = setAnnotationSpy.mock.calls.filter(
      ([, type]) => type === 'marble-hover-match',
    );
    const matchIds = matchCalls.map(([, , id]) => id).sort();
    expect(matchIds).toEqual(['wg-A', 'wg-B']);
    // Non-matching word never receives a hover-match overlay.
    expect(matchIds).not.toContain('wg-C');
  });
});

describe('annotationToRange (USJ walker)', () => {
  it('returns explicit text-end range for a marker whose content is a plain string', () => {
    const usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'char',
          marker: 'wg',
          content: ['beginning'],
        },
      ],
    } as unknown as Usj;
    const annotation = {
      annotationId: 'a1',
      kind: 'word',
      usjPath: '$.content[0]',
    } as unknown as MarbleAnnotation;
    const range = annotationToRange(annotation, usj);
    expect(range).toEqual({
      start: { jsonPath: '$.content[0]', offset: 0 },
      end: { jsonPath: '$.content[0].content[0]', offset: 'beginning'.length },
    });
  });

  it('descends into the last child for a marker with nested content', () => {
    const usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'char',
          marker: 'wg',
          content: [{ type: 'char', marker: 'add', content: ['extra'] }, 'tail'],
        },
      ],
    } as unknown as Usj;
    const annotation = {
      annotationId: 'a2',
      kind: 'word',
      usjPath: '$.content[0]',
    } as unknown as MarbleAnnotation;
    const range = annotationToRange(annotation, usj);
    expect(range).toEqual({
      start: { jsonPath: '$.content[0]', offset: 0 },
      end: { jsonPath: '$.content[0].content[1]', offset: 'tail'.length },
    });
  });

  it('returns undefined when the marker content is empty', () => {
    const usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'char',
          marker: 'wg',
          content: [],
        },
      ],
    } as unknown as Usj;
    const annotation = {
      annotationId: 'a3',
      kind: 'word',
      usjPath: '$.content[0]',
    } as unknown as MarbleAnnotation;
    const range = annotationToRange(annotation, usj);
    expect(range).toBeUndefined();
  });

  it('returns undefined when the usjPath does not resolve to a node', () => {
    const usj = {
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'char', marker: 'wg', content: ['x'] }],
    } as unknown as Usj;
    const annotation = {
      annotationId: 'a4',
      kind: 'word',
      usjPath: '$.content[99]',
    } as unknown as MarbleAnnotation;
    const range = annotationToRange(annotation, usj);
    expect(range).toBeUndefined();
  });

  it('descends recursively through nested element-only chains to find the text', () => {
    // Edge case: the marker contains only a nested element which itself contains a string.
    // The walker should descend into the last element child until it finds a string leaf.
    const usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        {
          type: 'char',
          marker: 'wg',
          content: [
            {
              type: 'char',
              marker: 'add',
              content: ['inner'],
            },
          ],
        },
      ],
    } as unknown as Usj;
    const annotation = {
      annotationId: 'a5',
      kind: 'word',
      usjPath: '$.content[0]',
    } as unknown as MarbleAnnotation;
    const range = annotationToRange(annotation, usj);
    expect(range).toEqual({
      start: { jsonPath: '$.content[0]', offset: 0 },
      end: { jsonPath: '$.content[0].content[0].content[0]', offset: 'inner'.length },
    });
  });
});

describe('renderTooltipMarkdown', () => {
  // ScripturePaneLocalizedStringKey is module-private inside scripture-pane.component.tsx;
  // cast through Parameters<> so the test stays decoupled from that internal type while still
  // matching the public signature of `renderTooltipMarkdown`.
  const localizeIdentity = ((key: string) => key) as Parameters<typeof renderTooltipMarkdown>[1];

  it('renders phrase view model with sourceForm + phrase key', () => {
    const vm: TooltipViewModel = { kind: 'phrase', sourceForm: 'ἐν ἀρχῇ' };
    expect(renderTooltipMarkdown(vm, localizeIdentity)).toBe(
      '**ἐν ἀρχῇ**\n\n%enhancedResources_tooltip_phrase%',
    );
  });

  it('renders word view model with localized POS, lemma, gloss', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: 'noun',
      posLocalized: 'noun (feminine)',
      gloss: 'beginning',
    };
    const out = renderTooltipMarkdown(vm, localizeIdentity);
    expect(out).toBe(
      [
        '**רֵאשִׁית**',
        '**noun (feminine)** (noun)',
        '%enhancedResources_tooltip_lemmaLabel% **rēʾšît**',
        'beginning',
      ].join('\n\n'),
    );
  });

  it('falls back to raw POS when posLocalized is undefined', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: 'noun',
      posLocalized: undefined,
      gloss: 'beginning',
    };
    const out = renderTooltipMarkdown(vm, localizeIdentity);
    expect(out).toContain('**noun**\n\n');
    expect(out).not.toContain('(noun)');
  });

  it('emits noGloss placeholder when gloss is undefined', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: 'noun',
      posLocalized: undefined,
      gloss: undefined,
    };
    expect(renderTooltipMarkdown(vm, localizeIdentity)).toContain(
      '%enhancedResources_tooltip_noGloss%',
    );
  });

  it('omits POS line when posRaw is empty', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: '',
      posLocalized: undefined,
      gloss: 'beginning',
    };
    const out = renderTooltipMarkdown(vm, localizeIdentity);
    // No POS line - just sourceForm, lemma, gloss.
    expect(out.split('\n\n')).toHaveLength(3);
  });

  // Mirror the format-string shape from contributions/localizedStrings.json so substitution
  // behavior is actually exercised. localizeIdentity above returns the raw key (no `{0}`),
  // which cannot demonstrate that `{0}`/`{1}` placeholders get replaced.
  const RENDERING_STATUS_TEMPLATES: Record<string, string> = {
    '%enhancedResources_tooltip_noRenderingsForTerm%': 'NO_RENDERINGS_FOR_TERM[{0}]',
    '%enhancedResources_tooltip_deniedRendering%': 'DENIED_RENDERING[{0}]',
    '%enhancedResources_tooltip_missingRendering%': 'MISSING_RENDERING[{0}]',
    '%enhancedResources_tooltip_guessedRenderingFound%': 'GUESSED[{0}|{1}]',
    '%enhancedResources_tooltip_renderingFound%': 'FOUND[{0}|{1}]',
  };
  const localizeWithTemplates = ((key: string) =>
    RENDERING_STATUS_TEMPLATES[key] ?? key) as Parameters<typeof renderTooltipMarkdown>[1];

  it.each([
    ['noRenderingsEntered', 'NO_RENDERINGS_FOR_TERM'],
    ['renderingDeniedInVerse', 'DENIED_RENDERING'],
    ['renderingMissingInVerse', 'MISSING_RENDERING'],
    ['noVerseText', 'MISSING_RENDERING'],
  ] as const)('emits %s rendering-status with project substitution', (code, templateMarker) => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: 'noun',
      posLocalized: undefined,
      gloss: 'beginning',
      renderingStatus: { code, trackedProjectName: 'ESV' },
    };
    const out = renderTooltipMarkdown(vm, localizeWithTemplates);
    // Localized template was picked up.
    expect(out).toContain(templateMarker);
    // {0} placeholder must be substituted with the project name.
    expect(out).toContain('ESV');
    expect(out).not.toContain('{0}');
  });

  it('emits guessedRenderingFound with both substitutions (PT9 order: {0}=project, {1}=rendering)', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: 'noun',
      posLocalized: undefined,
      gloss: 'beginning',
      renderingStatus: {
        code: 'guessedRenderingFound',
        foundRendering: 'start',
        trackedProjectName: 'NIV',
      },
    };
    const out = renderTooltipMarkdown(vm, localizeWithTemplates);
    // PT9 MarbleForm.cs:2737 substitutes (trackedProject.Name, FoundRendering) into MarbleForm_9.
    expect(out).toContain('GUESSED[NIV|start]');
    expect(out).not.toContain('{0}');
    expect(out).not.toContain('{1}');
  });

  it('emits renderingFound with both substitutions (PT9 order: {0}=project, {1}=rendering)', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'רֵאשִׁית',
      lemma: 'rēʾšît',
      posRaw: 'noun',
      posLocalized: undefined,
      gloss: 'beginning',
      renderingStatus: {
        code: 'renderingFound',
        foundRendering: 'beginning',
        trackedProjectName: 'ESV',
      },
    };
    const out = renderTooltipMarkdown(vm, localizeWithTemplates);
    // PT9 MarbleForm.cs:2742 substitutes (trackedProject.Name, FoundRendering) into MarbleForm_10.
    expect(out).toContain('FOUND[ESV|beginning]');
    expect(out).not.toContain('{0}');
    expect(out).not.toContain('{1}');
  });

  it('escapes markdown special chars in user-supplied fields', () => {
    const vm: TooltipViewModel = {
      kind: 'word',
      sourceForm: 'a_b*c',
      lemma: 'x_y',
      posRaw: 'noun',
      posLocalized: undefined,
      gloss: 'foo[bar]',
    };
    const out = renderTooltipMarkdown(vm, localizeIdentity);
    expect(out).toContain('a\\_b\\*c');
    expect(out).toContain('x\\_y');
    expect(out).toContain('foo\\[bar\\]');
  });
});

describe('detectSourceLanguage', () => {
  it('detects Hebrew block (U+0590-U+05FF)', () => {
    expect(detectSourceLanguage('בָּרָא')).toBe('Hebrew');
  });
  it('detects Hebrew Presentation Forms A (U+FB1D-U+FB4F)', () => {
    // U+FB2A = HEBREW LETTER SHIN WITH SHIN DOT (precomposed presentation form)
    expect(detectSourceLanguage('שׁ')).toBe('Hebrew');
  });
  it('detects Greek basic block (U+0370-U+03FF)', () => {
    expect(detectSourceLanguage('λόγος')).toBe('Greek');
  });
  it('detects Greek Extended block (U+1F00-U+1FFF) for polytonic forms', () => {
    // 'Ἁγίῳ' contains U+1F09 (Greek capital alpha with dasia) - Greek Extended block.
    expect(detectSourceLanguage('Ἁγίῳ')).toBe('Greek');
  });
  it('returns undefined for Latin transliteration', () => {
    expect(detectSourceLanguage('logos')).toBeUndefined();
  });
  it('returns undefined for empty string', () => {
    expect(detectSourceLanguage('')).toBeUndefined();
  });
  it('detects whichever language appears first in mixed text', () => {
    // Latin 'logos' first (no detection), then Greek - the loop returns at the first match.
    expect(detectSourceLanguage('logos λόγος')).toBe('Greek');
  });
});
