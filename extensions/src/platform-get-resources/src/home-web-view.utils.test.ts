import { describe, expect, it } from 'vitest';
import type { SavedWebViewDefinition } from '@papi/core';
import { buildHomeWebViewState, shouldReloadHomeForProjectsOnly } from './home-web-view.utils';

const savedHome = (state?: Record<string, unknown>): SavedWebViewDefinition => ({
  id: 'home1',
  webViewType: 'platformGetResources.home',
  ...(state ? { state } : {}),
});

/*
 * `shouldShowProjectsOnly` is a launch parameter, not durable state, and it rides in the persisted
 * web view `state` — so the rule that matters is the scrub: an open that does not ask for a
 * projects-only view must clear one the previous open left behind, including on a layout restore,
 * which calls the provider with no options at all.
 */
describe('buildHomeWebViewState', () => {
  it('scopes the view when the caller asks for projects only', () => {
    expect(buildHomeWebViewState(savedHome(), { shouldShowProjectsOnly: true })).toEqual({
      shouldShowProjectsOnly: true,
    });
  });

  it('clears a projects-only view left by a previous open', () => {
    expect(buildHomeWebViewState(savedHome({ shouldShowProjectsOnly: true }), {})).toEqual({
      shouldShowProjectsOnly: false,
    });
  });

  it('keeps every other key the saved state carries', () => {
    expect(
      buildHomeWebViewState(savedHome({ somethingElse: 'keep me' }), {
        shouldShowProjectsOnly: true,
      }),
    ).toEqual({ somethingElse: 'keep me', shouldShowProjectsOnly: true });
  });
});

/*
 * Reusing an already-open Home brings its tab to the front without calling the provider, so fresh
 * options never reach it — a reload is the only way in. It is also the expensive way in, so it has
 * to be limited to the case where the scoping actually differs.
 */
describe('shouldReloadHomeForProjectsOnly', () => {
  it('reloads a full Home that is being asked for a projects-only view', () => {
    expect(shouldReloadHomeForProjectsOnly(savedHome(), true)).toBe(true);
  });

  it('reloads a projects-only Home that is being opened from a normal entry point', () => {
    // The symmetric case, and the one that keeps the scoping tied to the launch path: without it,
    // a Home opened once from "More projects…" hides resources for the rest of its life.
    expect(
      shouldReloadHomeForProjectsOnly(savedHome({ shouldShowProjectsOnly: true }), false),
    ).toBe(true);
  });

  it('leaves an already projects-only Home alone', () => {
    expect(shouldReloadHomeForProjectsOnly(savedHome({ shouldShowProjectsOnly: true }), true)).toBe(
      false,
    );
  });

  it('leaves an already full Home alone', () => {
    expect(shouldReloadHomeForProjectsOnly(savedHome(), false)).toBe(false);
  });
});
