// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChecklistTool } from './checklist.component';
import type { ChecklistData, ChecklistLocalizedStrings } from './checklist.types';

// jsdom does not implement ResizeObserver; DataTable (rendered by ChecklistTool) queries it. A
// no-op stub keeps the render path from throwing.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // The DOM lib types ResizeObserver as a constructor with browser-only fields; a vi.fn factory
    // satisfies the runtime contract but not the structural typing, so cast through `unknown`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

const NO_RESULTS_TEXT = 'No markers found.';
const IDENTICAL_MARKERS_TEXT = 'Comparative texts have identical markers.';

const localizedStrings: ChecklistLocalizedStrings = {
  '%markersChecklist_noResults%': NO_RESULTS_TEXT,
  '%markersChecklist_emptyResult_identicalMarkers%': IDENTICAL_MARKERS_TEXT,
};

/** Empty-result data with NO backend-supplied empty-result message. */
const emptyDataNoBackendMessage: ChecklistData = {
  rows: [],
  columnHeaders: ['ENGA', 'ENGB'],
  columnProjectIds: ['projectA', 'projectB'],
  excludedCount: 0,
  emptyResultMessage: undefined,
};

describe('ChecklistTool empty-result message', () => {
  it('shows the generic "No markers found." message when the backend supplies no empty-result message', () => {
    render(
      <ChecklistTool
        isLoading={false}
        hideMatches={false}
        showVerseText={false}
        localizedStringsWithLoadingState={[localizedStrings, false]}
        data={emptyDataNoBackendMessage}
      />,
    );

    // Regression for the bug: with no backend message the component must NOT claim the markers are
    // identical (a false positive) — it should fall back to the neutral generic no-results string.
    expect(screen.getByText(NO_RESULTS_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(IDENTICAL_MARKERS_TEXT)).not.toBeInTheDocument();
  });

  it('shows "No markers found." for the "noResults" variant (backend ships an empty message)', () => {
    // The common real empty state: a filtered check that yields no rows. The C# backend emits the
    // "noResults" variant with message: "" (string.Empty) by design, leaving the wording to the UI.
    // An empty string must fall back to the generic string, not render a blank panel.
    render(
      <ChecklistTool
        isLoading={false}
        hideMatches={false}
        showVerseText={false}
        localizedStringsWithLoadingState={[localizedStrings, false]}
        data={{
          ...emptyDataNoBackendMessage,
          emptyResultMessage: { variant: 'noResults', message: '', searchedMarkers: ['p'] },
        }}
      />,
    );

    expect(screen.getByText(NO_RESULTS_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(IDENTICAL_MARKERS_TEXT)).not.toBeInTheDocument();
  });

  it('prefers a non-empty backend-supplied empty-result message over the generic fallback', () => {
    render(
      <ChecklistTool
        isLoading={false}
        hideMatches={false}
        showVerseText={false}
        localizedStringsWithLoadingState={[localizedStrings, false]}
        data={{
          ...emptyDataNoBackendMessage,
          emptyResultMessage: { variant: 'identical', message: IDENTICAL_MARKERS_TEXT },
        }}
      />,
    );

    expect(screen.getByText(IDENTICAL_MARKERS_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(NO_RESULTS_TEXT)).not.toBeInTheDocument();
  });
});
