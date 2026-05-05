// @vitest-environment jsdom
// We pull the click handler out of `setAnnotationSpy.mock.calls[0][3]` (typed `unknown`) and
// must cast it to a callable signature for the test to invoke it. There is no cleaner alternative.
/* eslint-disable no-type-assertion/no-type-assertion */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  EnhancedScripturePane,
  ENHANCED_SCRIPTURE_PANE_STRING_KEYS,
} from './scripture-pane.component';
import type { MarbleAnnotation } from '../../lib/marble-converter';

// Module-scope spies so tests can assert on calls across renders. The mock's
// useImperativeHandle returns a fresh object each render, but the spies it
// references are stable - so assertions stay reliable.
const setAnnotationSpy = vi.fn();
const removeAnnotationSpy = vi.fn();

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

beforeEach(() => {
  setAnnotationSpy.mockClear();
  removeAnnotationSpy.mockClear();
  vi.restoreAllMocks();
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={annotations}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // setAnnotation should be called once per annotation
    expect(setAnnotationSpy).toHaveBeenCalledTimes(2);
    // First call: word annotation
    expect(setAnnotationSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ start: { jsonPath: '$.content[0].content[1]' } }),
      'marble-word',
      'wg-001',
      expect.any(Function),
    );
    // Second call: note annotation
    expect(setAnnotationSpy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ start: { jsonPath: '$.content[0].content[2]' } }),
      'marble-note',
      'note-1',
      expect.any(Function),
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={[annotation]}
        onTokenClick={onTokenClick}
        onTokenContextMenu={onTokenContextMenu}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // Grab the onClick callback the component registered with the editor.
    const setAnnotationCall = setAnnotationSpy.mock.calls[0];
    const clickHandler = setAnnotationCall[3] as (
      event: { button: number },
      type: string,
      id: string,
      textContent: string,
    ) => void;
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={[annotation]}
        onTokenClick={onTokenClick}
        onTokenContextMenu={onTokenContextMenu}
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    const clickHandler = setAnnotationSpy.mock.calls[0][3] as (
      event: { button: number },
      type: string,
      id: string,
      textContent: string,
    ) => void;
    clickHandler({ button: 2 }, 'marble-word', 'wg-001', 'λόγος');
    expect(onTokenContextMenu).toHaveBeenCalledWith('wg-001', annotation, expect.anything());
    expect(onTokenClick).not.toHaveBeenCalled();
  });

  it('applies a marble-filter annotation when filteredTokenId matches a known annotation', () => {
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={annotations}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // Two calls expected: one for the base annotation, one for the filter overlay.
    expect(setAnnotationSpy).toHaveBeenCalledTimes(2);
    expect(setAnnotationSpy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ start: { jsonPath: '$.content[0].content[1]' } }),
      'marble-filter',
      'filter-wg-001',
    );
  });

  it('applies marble-highlight annotations to every word annotation when highlightAllResearchTerms is true', () => {
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
        annotations={annotations}
        highlightAllResearchTerms
        localizedStringsWithLoadingState={[STRINGS_BAG, false]}
      />,
    );
    // Two base annotations + one highlight overlay (only for the word kind).
    expect(setAnnotationSpy).toHaveBeenCalledTimes(3);
    // The third call should be the highlight overlay for the word annotation.
    expect(setAnnotationSpy).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ start: { jsonPath: '$.content[0].content[1]' } }),
      'marble-highlight',
      'highlight-wg-001',
    );
  });

  it('does not re-run the annotation effect when re-rendered with the same props (no fake-dep churn)', () => {
    const annotation: MarbleAnnotation = {
      usjPath: '$.content[0].content[1]',
      kind: 'word',
      annotationId: 'wg-001',
      metadata: {},
    };
    const usj = { type: 'USJ' as const, version: '3.1' as const, content: [] };
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
    const usj = { type: 'USJ' as const, version: '3.1' as const, content: [] };
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
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    expect(setAnnotationSpy).toHaveBeenCalledWith(
      expect.anything(),
      'marble-filter',
      'filter-wg-001',
    );
    setAnnotationSpy.mockClear();

    rerender(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        localizedStringsWithLoadingState={localized}
      />,
    );
    expect(setAnnotationSpy).not.toHaveBeenCalled();
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-filter', 'filter-wg-001');
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
    const usj = { type: 'USJ' as const, version: '3.1' as const, content: [] };
    const { rerender } = render(
      <EnhancedScripturePane
        usj={usj}
        annotations={annotationsArr}
        filteredTokenId="wg-001"
        localizedStringsWithLoadingState={localized}
      />,
    );
    // First render: 1 base + 1 filter = 2 calls.
    expect(setAnnotationSpy).toHaveBeenCalledTimes(2);
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
    expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
    expect(setAnnotationSpy).toHaveBeenCalledWith(
      expect.anything(),
      'marble-highlight',
      'highlight-wg-001',
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
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
        usj={{ type: 'USJ', version: '3.1', content: [] }}
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
    const { unmount } = render(
      <EnhancedScripturePane
        usj={{ type: 'USJ', version: '3.1', content: [] }}
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
    removeAnnotationSpy.mockClear(); // Ignore any pre-unmount removals
    unmount();
    // Cleanup should remove the base word annotation, the filter overlay, and the highlight overlay.
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-word', 'wg-001');
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-filter', 'filter-wg-001');
    expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-highlight', 'highlight-wg-001');
  });
});
