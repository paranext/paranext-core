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
  '%enhancedResources_scripturePane_footnotesHeader%': 'Footnotes',
};

beforeEach(() => {
  setAnnotationSpy.mockClear();
  removeAnnotationSpy.mockClear();
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
    ) => void;
    clickHandler({ button: 0 }, 'marble-word', 'wg-001');
    expect(onTokenClick).toHaveBeenCalledWith('wg-001', annotation);
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
    ) => void;
    clickHandler({ button: 2 }, 'marble-word', 'wg-001');
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
