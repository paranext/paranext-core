import { describe, it, expect } from 'vitest';
import {
  resolveGridBodyState,
  resolveTextCollectionProjectId,
  type GridBodyStateInput,
} from './scripture-text-grid-project.utils';

const CONNECTION_PROJECT = 'text-connection-project';
const OTHER_CONNECTION_PROJECT = 'another-text-connection-project';
const RESOURCE_PROJECT = 'displayed-bible-resource';

describe('resolveTextCollectionProjectId', () => {
  it('always uses an explicit projectId, ignoring the followed candidate', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: CONNECTION_PROJECT,
        candidateProjectId: RESOURCE_PROJECT,
        candidateIsOwnResource: true,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('adopts the candidate when it is not one of the displayed resources', () => {
    expect(
      resolveTextCollectionProjectId(undefined, {
        explicitProjectId: undefined,
        candidateProjectId: CONNECTION_PROJECT,
        candidateIsOwnResource: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('follows the candidate to a different (non-resource) text-collection project', () => {
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: OTHER_CONNECTION_PROJECT,
        candidateIsOwnResource: false,
      }),
    ).toBe(OTHER_CONNECTION_PROJECT);
  });

  it('keeps the latched project when the candidate is one of the grid’s own resources', () => {
    // Navigating from a resource cell makes that resource the scroll group's source project. The
    // grid must keep showing the current project instead of switching to the resource and blanking.
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: RESOURCE_PROJECT,
        candidateIsOwnResource: true,
      }),
    ).toBe(CONNECTION_PROJECT);
  });

  it('keeps the latched project when there is no candidate', () => {
    expect(
      resolveTextCollectionProjectId(CONNECTION_PROJECT, {
        explicitProjectId: undefined,
        candidateProjectId: undefined,
        candidateIsOwnResource: false,
      }),
    ).toBe(CONNECTION_PROJECT);
  });
});

describe('resolveGridBodyState', () => {
  /** A bound project whose sources have resolved to an empty collection. */
  const settled: GridBodyStateInput = {
    hasResources: false,
    hasProject: true,
    areSourcesResolved: true,
    hasSourcesError: false,
    isLoadingCachedResources: false,
    isLoadingLocalizedStrings: false,
  };

  it('renders cells as soon as there are any, even while the cached DBL list loads', () => {
    expect(
      resolveGridBodyState({
        ...settled,
        hasResources: true,
        areSourcesResolved: false,
        isLoadingCachedResources: true,
      }),
    ).toBe('cells');
  });

  it('never spins when no project is bound, however unresolved the sources are', () => {
    // The shipped layout starts here: the tab arrives with no projectId and nothing has set the
    // scroll group's reference yet. With no project there is no textConnectionSettings provider,
    // so the sources can never resolve and a spinner would never end.
    expect(resolveGridBodyState({ ...settled, hasProject: false, areSourcesResolved: false })).toBe(
      'empty',
    );
  });

  it('treats a sources failure as terminal rather than a loading state', () => {
    expect(
      resolveGridBodyState({ ...settled, areSourcesResolved: false, hasSourcesError: true }),
    ).toBe('error');
  });

  it('reports the failure even while other inputs are still in flight', () => {
    expect(
      resolveGridBodyState({
        ...settled,
        areSourcesResolved: false,
        hasSourcesError: true,
        isLoadingCachedResources: true,
        isLoadingLocalizedStrings: true,
      }),
    ).toBe('error');
  });

  it('loads while a bound project is still resolving its sources', () => {
    expect(resolveGridBodyState({ ...settled, areSourcesResolved: false })).toBe('loading');
  });

  it('loads while the cached DBL list is still in flight and there is nothing to show yet', () => {
    expect(resolveGridBodyState({ ...settled, isLoadingCachedResources: true })).toBe('loading');
  });

  it('loads while the strings this body renders are still resolving', () => {
    expect(resolveGridBodyState({ ...settled, isLoadingLocalizedStrings: true })).toBe('loading');
  });

  it('shows the empty state once a bound project resolves to no texts', () => {
    expect(resolveGridBodyState(settled)).toBe('empty');
  });
});
