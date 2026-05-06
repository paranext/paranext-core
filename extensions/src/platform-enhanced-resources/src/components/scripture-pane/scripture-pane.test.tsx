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
} from './scripture-pane.component';
import type { MarbleAnnotation } from '../../lib/marble-converter';

// Module-scope spies so tests can assert on calls across renders. The mock's
// useImperativeHandle returns a fresh object each render, but the spies it
// references are stable - so assertions stay reliable.
const setAnnotationSpy = vi.fn();
const removeAnnotationSpy = vi.fn();

// papi.overlays / papi.commands are external boundaries; mock them so unit tests can assert on
// hover-lifecycle calls without spinning up the real overlay service or PAPI WebSocket.
const mockShowPopover = vi.fn();
const mockUpdatePopover = vi.fn();
const mockDismissPopover = vi.fn();
const mockSendCommand = vi.fn();

vi.mock('@papi/frontend', () => ({
  default: {
    overlays: {
      showPopover: (...args: unknown[]) => mockShowPopover(...args),
      updatePopover: (...args: unknown[]) => mockUpdatePopover(...args),
      dismissPopover: (...args: unknown[]) => mockDismissPopover(...args),
    },
    commands: {
      sendCommand: (...args: unknown[]) => mockSendCommand(...args),
    },
  },
  logger: { warn: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

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
  mockSendCommand.mockReset();
  mockSendCommand.mockResolvedValue({
    lemma: 'logos',
    gloss: 'word, message',
    partOfSpeech: 'noun',
    strongNumber: 'G3056',
    notes: [],
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

  it('applies er-marble-filter CSS class when filteredTokenId matches a known annotation', () => {
    // Effect B now uses DOM class manipulation instead of editor.setAnnotation for the filter
    // overlay. The annotationId-{id} class on the mark element is the selector target.
    const annotations: MarbleAnnotation[] = [
      {
        usjPath: '$.content[0].content[1]',
        kind: 'word',
        annotationId: 'wg-001',
        metadata: {},
      },
    ];

    // Simulate a mark element with the annotationId class that Effect A would produce in
    // the real editor. jsdom doesn't run the actual editor, so we create it manually.
    const markEl = document.createElement('mark');
    markEl.className = 'editor-typed-mark-external-marble-word annotationId-wg-001';
    document.body.appendChild(markEl);

    render(
      <EnhancedScripturePane
        usj={makeTestUsj(2)}
        annotations={annotations}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );

    // Only one setAnnotation call: the base marble-word annotation.
    // No second setAnnotation call for the filter overlay (was the old approach).
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    expect(setAnnotationSpy).not.toHaveBeenCalledWith(
      expect.anything(),
      'marble-filter',
      expect.any(String),
      expect.anything(),
    );
    // The er-marble-filter CSS class should be on the mark element.
    expect(markEl.classList).toContain('er-marble-filter');

    document.body.removeChild(markEl);
  });

  it('adds er-highlight-all-research-terms body class when highlightAllResearchTerms is true', () => {
    // Effect C now uses a single body-level CSS class instead of per-annotation editor.setAnnotation.
    // The class drives highlight paint via _marble-overrides.scss specificity.
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
    // Only one setAnnotation call: base marble-word annotation.
    // No setAnnotation calls for marble-highlight (was the old approach).
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    expect(setAnnotationSpy).not.toHaveBeenCalledWith(
      expect.anything(),
      'marble-highlight',
      expect.any(String),
      expect.anything(),
    );
    // Body class should be set.
    expect(document.body.classList).toContain('er-highlight-all-research-terms');
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

  it('toggling filteredTokenId does not re-set base annotations', () => {
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    const annotationsArr = [annotation];
    const localized: [Record<string, string>, boolean] = [STRINGS_BAG, false];
    const usj = makeTestUsj(2);

    // Create a mark element with the annotationId class that the editor would add in production.
    const markEl = document.createElement('mark');
    markEl.className = 'editor-typed-mark-external-marble-word annotationId-wg-001';
    document.body.appendChild(markEl);

    const { rerender } = render(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    setAnnotationSpy.mockClear();

    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={localized}
      />,
    );
    // No setAnnotation for filter (Effect B now uses DOM class).
    expect(setAnnotationSpy).not.toHaveBeenCalled();
    // The mark element should have received er-marble-filter.
    expect(markEl.classList).toContain('er-marble-filter');
    setAnnotationSpy.mockClear();

    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    // No setAnnotation and no removeAnnotation for marble-filter type (DOM cleanup only).
    expect(setAnnotationSpy).not.toHaveBeenCalled();
    expect(removeAnnotationSpy).not.toHaveBeenCalledWith('marble-filter', expect.any(String));
    // The CSS class should be removed after Effect B cleanup.
    expect(markEl.classList).not.toContain('er-marble-filter');

    document.body.removeChild(markEl);
  });

  it('toggling highlightAllResearchTerms does not re-set base annotations or filter overlay', () => {
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
    // First render: 1 base annotation only (filter and highlight are CSS-based now).
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
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
    // Toggling highlight adds the body class — no setAnnotation calls for marble-highlight.
    expect(setAnnotationSpy).not.toHaveBeenCalled();
    expect(setAnnotationSpy).not.toHaveBeenCalledWith(
      expect.anything(),
      'marble-highlight',
      expect.any(String),
      expect.anything(),
    );
    expect(document.body.classList).toContain('er-highlight-all-research-terms');
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

  it('removes all applied annotations on unmount', () => {
    // Create a mark element so Effect B can apply and then clean up er-marble-filter.
    const markEl = document.createElement('mark');
    markEl.className = 'editor-typed-mark-external-marble-word annotationId-wg-001';
    document.body.appendChild(markEl);

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
    // Verify CSS state before unmount.
    expect(markEl.classList).toContain('er-marble-filter');
    expect(document.body.classList).toContain('er-highlight-all-research-terms');

    removeAnnotationSpy.mockClear(); // Ignore any pre-unmount removals
    unmount();

    // Effect A cleanup: base word annotation removed via editor.removeAnnotation.
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-word', 'wg-001');
    // Effects B and C are CSS-based: no removeAnnotation calls for filter/highlight types.
    expect(removeAnnotationSpy).not.toHaveBeenCalledWith('marble-filter', expect.any(String));
    expect(removeAnnotationSpy).not.toHaveBeenCalledWith('marble-highlight', expect.any(String));
    // CSS classes cleaned up by their respective effect cleanup functions.
    expect(markEl.classList).not.toContain('er-marble-filter');
    expect(document.body.classList).not.toContain('er-highlight-all-research-terms');

    document.body.removeChild(markEl);
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

  it('updatePopover called with full markdown after buildTooltipData resolves', async () => {
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);
    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');

    // Two microtask flushes: one for showPopover.then setting activePopoverIdRef,
    // and one for sendCommand.then -> updatePopover.
    await Promise.resolve();
    await Promise.resolve();

    expect(mockUpdatePopover).toHaveBeenCalledWith(
      'overlay-1',
      expect.objectContaining({
        type: 'markdown',
        markdown: expect.stringContaining('logos'),
      }),
    );
  });

  it('mouseleave dismisses the popover and clears the CSS hover state', async () => {
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

    handlers.onMouseLeave!(new MouseEvent('mouseleave'), 'marble-word', 'wg-A', 'logos');

    expect(mockDismissPopover).toHaveBeenCalledWith('overlay-1');
    // Dim/match state is now CSS-based (er-marble-hover-active body class + er-marble-hover-match
    // per-mark class) instead of editor-based annotations, so removeAnnotation is NOT called for
    // hover types. The editor removeAnnotation is only called on base annotation cleanup.
    expect(removeAnnotationSpy).not.toHaveBeenCalledWith('marble-hover-match', expect.any(String));
    expect(removeAnnotationSpy).not.toHaveBeenCalledWith('marble-hover-dim', expect.any(String));
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
    mockSendCommand.mockRejectedValueOnce(new Error('network'));
    render(
      <EnhancedScripturePane
        usj={makeTestUsj(4)}
        annotations={[wordA]}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    await Promise.resolve();
    const handlers = getHoverHandlersForCall(0);
    handlers.onMouseEnter!(makeFakeMouseEvent(), 'marble-word', 'wg-A', 'logos');
    await Promise.resolve();
    await Promise.resolve();

    expect(mockShowPopover).toHaveBeenCalledTimes(1);
    expect(mockUpdatePopover).not.toHaveBeenCalled();
  });

  it('lemma-matching annotations sharing the hovered lemma apply CSS hover state', async () => {
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

    const fakeEvent = makeFakeMouseEvent();
    handlers.onMouseEnter!(fakeEvent, 'marble-word', 'wg-A', 'logos');

    // Hover state is now CSS-based: no setAnnotation calls for hover types.
    // wordA and wordB share 'logos' lemma; wordC has 'theos' (non-matching).
    // The implementation adds 'er-marble-hover-active' to the body and 'er-marble-hover-match'
    // to matching mark elements via DOM queries. setAnnotation is NOT called for hover types.
    const { calls } = setAnnotationSpy.mock;
    const matchCalls = calls.filter((c) => c[1] === 'marble-hover-match');
    const dimCalls = calls.filter((c) => c[1] === 'marble-hover-dim');
    expect(matchCalls.length).toBe(0);
    expect(dimCalls.length).toBe(0);
    // Body-level hover class should be set (jsdom environment supports classList).
    expect(fakeEvent.currentTarget).toBeInstanceOf(Element);
    expect((fakeEvent.currentTarget as Element).ownerDocument.body.classList).toContain(
      'er-marble-hover-active',
    );
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
