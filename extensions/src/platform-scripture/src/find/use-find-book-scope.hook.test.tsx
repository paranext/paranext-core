// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FindBookScopeOptions, useFindBookScope } from './use-find-book-scope.hook';

type Overrides = Partial<FindBookScopeOptions>;

/** A saved selection of two Old Testament books against a project whose book list is known. */
function buildOptions(overrides: Overrides = {}): FindBookScopeOptions {
  return {
    savedBookIds: ['GEN', 'EXO'],
    setSavedBookIds: vi.fn(),
    availableBookIds: ['GEN', 'EXO', 'LEV'],
    ...overrides,
  };
}

describe('useFindBookScope — a project that lacks the saved books', () => {
  // Find follows the Simple-mode editor onto read-only projects and published resources. If the
  // narrowed selection were written back, briefly opening a New Testament resource would permanently
  // shrink — usually empty — the saved scope, and returning to the user's own project would not
  // bring it back.
  it('never writes the narrowed selection back to the saved one', () => {
    const setSavedBookIds = vi.fn();
    const savedBookIds = ['GEN', 'EXO'];
    const { result, rerender } = renderHook(
      (props: FindBookScopeOptions) => useFindBookScope(props),
      { initialProps: buildOptions({ savedBookIds, setSavedBookIds }) },
    );

    // Find is re-pointed at a resource that has none of the saved books.
    rerender(
      buildOptions({ savedBookIds, setSavedBookIds, availableBookIds: ['MAT', 'MRK', 'LUK'] }),
    );

    expect(setSavedBookIds).not.toHaveBeenCalled();
    expect(savedBookIds).toEqual(['GEN', 'EXO']);
    expect(result.current.searchableBookIds).toEqual([]);
  });

  it('shows and searches the saved books again once the project has them', () => {
    const savedBookIds = ['GEN', 'EXO'];
    const { result, rerender } = renderHook(
      (props: FindBookScopeOptions) => useFindBookScope(props),
      { initialProps: buildOptions({ savedBookIds, availableBookIds: ['MAT'] }) },
    );
    expect(result.current.searchableBookIds).toEqual([]);

    rerender(buildOptions({ savedBookIds }));

    expect(result.current.searchableBookIds).toEqual(['GEN', 'EXO']);
  });
});

describe('useFindBookScope — what gets searched and shown', () => {
  it('narrows the saved selection to the books the current project has', () => {
    const { result } = renderHook(() =>
      useFindBookScope(
        buildOptions({ savedBookIds: ['GEN', 'MAT', 'EXO'], availableBookIds: ['GEN', 'EXO'] }),
      ),
    );

    expect(result.current.searchableBookIds).toEqual(['GEN', 'EXO']);
  });

  // An unresolved book list must not read as "this project has no books" — narrowing against it
  // would report an unrunnable query for every project while its setting is still loading.
  it('leaves the selection alone while the book list is unknown', () => {
    const savedBookIds = ['GEN', 'MAT'];
    const { result } = renderHook(() =>
      useFindBookScope(buildOptions({ savedBookIds, availableBookIds: undefined })),
    );

    expect(result.current.searchableBookIds).toBe(savedBookIds);
  });

  // Consumers key auto-search and monitored-scope bookkeeping on this array's identity, so a fresh
  // array every render would re-trigger them indefinitely.
  it('keeps the same array across renders when nothing needs narrowing', () => {
    const savedBookIds = ['GEN', 'EXO'];
    const { result, rerender } = renderHook(
      (props: FindBookScopeOptions) => useFindBookScope(props),
      { initialProps: buildOptions({ savedBookIds }) },
    );
    const firstResult = result.current.searchableBookIds;

    rerender(buildOptions({ savedBookIds }));

    expect(result.current.searchableBookIds).toBe(savedBookIds);
    expect(result.current.searchableBookIds).toBe(firstResult);
  });
});

describe('useFindBookScope — editing the selection', () => {
  it('saves exactly what the user picked', () => {
    const setSavedBookIds = vi.fn();
    const { result } = renderHook(() => useFindBookScope(buildOptions({ setSavedBookIds })));

    result.current.selectBookIds(['LEV']);

    expect(setSavedBookIds).toHaveBeenCalledExactlyOnceWith(['LEV']);
  });
});
