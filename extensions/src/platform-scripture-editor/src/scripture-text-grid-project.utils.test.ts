import { describe, it, expect } from 'vitest';
import {
  resolveGridBodyAnnouncement,
  resolveGridBodyState,
  resolveIsGridBodyWaiting,
  resolveHasSourcesError,
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
    hasWaitedTooLong: false,
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

  it('reports the failure regardless of what else is still in flight, once the strings are in', () => {
    expect(
      resolveGridBodyState({
        ...settled,
        areSourcesResolved: false,
        hasSourcesError: true,
        isLoadingCachedResources: true,
      }),
    ).toBe('error');
  });

  it('loads while a bound project is still resolving its sources', () => {
    expect(resolveGridBodyState({ ...settled, areSourcesResolved: false })).toBe('loading');
  });

  it('gives up on a cached-resource list that never settles, not just on sources', () => {
    // The caller folds this wait into the timeout too, so a getCachedResources that never settles
    // is bounded rather than spinning forever the way an unresolved sources read used to.
    expect(
      resolveGridBodyState({ ...settled, isLoadingCachedResources: true, hasWaitedTooLong: true }),
    ).toBe('error');
  });

  it('loads while the cached DBL list is still in flight and there is nothing to show yet', () => {
    expect(resolveGridBodyState({ ...settled, isLoadingCachedResources: true })).toBe('loading');
  });

  it('loads while the strings this body renders are still resolving', () => {
    expect(resolveGridBodyState({ ...settled, isLoadingLocalizedStrings: true })).toBe('loading');
  });

  it('waits for the strings rather than showing the empty state with no project bound', () => {
    // The shipped startup state. `useLocalizedStrings` seeds each key with the key itself, so
    // returning 'empty' here renders a literal %webView_scriptureTextGrid_emptyState_prompt%.
    expect(
      resolveGridBodyState({
        ...settled,
        hasProject: false,
        areSourcesResolved: false,
        isLoadingLocalizedStrings: true,
      }),
    ).toBe('loading');
  });

  it('waits for the strings rather than showing the empty state for a settled project', () => {
    expect(resolveGridBodyState({ ...settled, isLoadingLocalizedStrings: true })).toBe('loading');
  });

  it('waits for the strings before reporting a failure, which also renders prose', () => {
    // The error branch shares the empty state's localized message, so reporting it early puts a
    // raw %key% on screen just as the empty branch would.
    expect(
      resolveGridBodyState({ ...settled, hasSourcesError: true, isLoadingLocalizedStrings: true }),
    ).toBe('loading');
  });

  it('reports a failure once the strings have arrived', () => {
    expect(resolveGridBodyState({ ...settled, hasSourcesError: true })).toBe('error');
  });

  it('gives up on a wait that has outlasted its allowance rather than spinning forever', () => {
    expect(
      resolveGridBodyState({ ...settled, areSourcesResolved: false, hasWaitedTooLong: true }),
    ).toBe('error');
  });

  it('does not give up before the strings arrive, which would render a raw key', () => {
    expect(
      resolveGridBodyState({
        ...settled,
        areSourcesResolved: false,
        hasWaitedTooLong: true,
        isLoadingLocalizedStrings: true,
      }),
    ).toBe('loading');
  });

  it('keeps the no-project steady state rather than calling it a timeout', () => {
    expect(
      resolveGridBodyState({
        ...settled,
        hasProject: false,
        areSourcesResolved: false,
        hasWaitedTooLong: true,
      }),
    ).toBe('empty');
  });

  it('shows the empty state once a bound project resolves to no texts', () => {
    expect(resolveGridBodyState(settled)).toBe('empty');
  });
});

describe('resolveHasSourcesError', () => {
  const loaded = {
    isReferencedLoading: false,
    adminReferencedError: undefined,
    adminReferenced: [],
  };

  it('reports no failure while the setting is still being read', () => {
    // Must stay false here, or a wait in progress would be rendered as a terminal failure.
    expect(
      resolveHasSourcesError({
        ...loaded,
        isReferencedLoading: true,
        adminReferencedError: 'boom',
      }),
    ).toBe(false);
  });

  it('reports a failure carried on the separate error channel', () => {
    expect(resolveHasSourcesError({ ...loaded, adminReferencedError: new Error('boom') })).toBe(
      true,
    );
  });

  it('reports a failure carried as a PlatformError in the value itself', () => {
    // useBufferedLayoutSetting leaves its held copy armed rather than applying the error, so past
    // the initial load this is the only channel that reports it.
    expect(
      resolveHasSourcesError({
        ...loaded,
        adminReferenced: { platformErrorVersion: 1, message: 'boom' },
      }),
    ).toBe(true);
  });

  it('reports no failure once the setting reads cleanly', () => {
    expect(resolveHasSourcesError(loaded)).toBe(false);
  });
});

describe('resolveIsGridBodyWaiting', () => {
  const waiting = {
    hasProject: true,
    hasSourcesError: false,
    areSourcesResolved: false,
    isLoadingCachedResources: false,
  };

  it('waits while the sources have not arrived', () => {
    expect(resolveIsGridBodyWaiting(waiting)).toBe(true);
  });

  it('waits while the cached resource list is still in flight', () => {
    // Narrowing this to the sources alone is what left a never-settling getCachedResources able to
    // spin forever.
    expect(
      resolveIsGridBodyWaiting({
        ...waiting,
        areSourcesResolved: true,
        isLoadingCachedResources: true,
      }),
    ).toBe(true);
  });

  it('stops waiting once a failure arrives, since a failure is an answer', () => {
    expect(resolveIsGridBodyWaiting({ ...waiting, hasSourcesError: true })).toBe(false);
  });

  it('is not waiting when no project is bound', () => {
    expect(resolveIsGridBodyWaiting({ ...waiting, hasProject: false })).toBe(false);
  });

  it('is not waiting once everything has settled', () => {
    expect(resolveIsGridBodyWaiting({ ...waiting, areSourcesResolved: true })).toBe(false);
  });
});

describe('resolveGridBodyAnnouncement', () => {
  const base = {
    loadingLabel: 'Loading…',
    terminalMessage: 'No texts to display.',
    announcement: 'Chapter view opened',
  };

  it('announces the wait while loading', () => {
    expect(resolveGridBodyAnnouncement({ ...base, bodyState: 'loading' })).toBe('Loading…');
  });

  it('announces the outcome when the wait ends with nothing to show', () => {
    // Reverting to the caller's message here would end an announced wait in silence.
    expect(resolveGridBodyAnnouncement({ ...base, bodyState: 'empty' })).toBe(
      'No texts to display.',
    );
  });

  it('announces the outcome when the wait ends in a failure', () => {
    expect(resolveGridBodyAnnouncement({ ...base, bodyState: 'error' })).toBe(
      'No texts to display.',
    );
  });

  it("leaves the view's own message alone once there are cells", () => {
    // The grid is navigable and self-describing, so it has nothing to announce of its own — and
    // clobbering here would swallow the chapter-context message.
    expect(resolveGridBodyAnnouncement({ ...base, bodyState: 'cells' })).toBe(
      'Chapter view opened',
    );
  });

  it('announces nothing rather than a raw key while the loading string resolves', () => {
    expect(resolveGridBodyAnnouncement({ ...base, bodyState: 'loading', loadingLabel: '' })).toBe(
      '',
    );
  });
});
