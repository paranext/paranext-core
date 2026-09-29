import { describe, expect, it } from 'vitest';
import type { SavedWebViewDefinition } from '@papi/core';
import { buildHomeWebViewState, shouldReloadHomeForFilterPreset } from './home-web-view.utils';

const savedHome = (state?: Record<string, unknown>): SavedWebViewDefinition => ({
  id: 'home1',
  webViewType: 'platformGetResources.home',
  ...(state ? { state } : {}),
});

/*
 * The filter answers the question the opener asked, not a preference of the tab, and it rides in
 * the persisted web view `state` — so the rule that matters is the reset: an open that does not ask
 * for a preset must clear the filter the previous open (or the user) left behind, including on a
 * layout restore, which calls the provider with no options at all.
 */
describe('buildHomeWebViewState', () => {
  it('presets the filter the caller asks for', () => {
    expect(
      buildHomeWebViewState(savedHome(), { initialProjectResourceFilter: 'paratextProject' }),
    ).toEqual({ projectResourceFilter: 'paratextProject' });
  });

  it('clears a filter left by a previous open', () => {
    expect(buildHomeWebViewState(savedHome({ projectResourceFilter: 'resource' }), {})).toEqual({
      projectResourceFilter: 'all',
    });
  });

  it('keeps every other key the saved state carries', () => {
    expect(
      buildHomeWebViewState(savedHome({ somethingElse: 'keep me' }), {
        initialProjectResourceFilter: 'resource',
      }),
    ).toEqual({ somethingElse: 'keep me', projectResourceFilter: 'resource' });
  });

  it('drops the projects-only flag that layouts saved before the filter still carry', () => {
    expect(buildHomeWebViewState(savedHome({ shouldShowProjectsOnly: true }), {})).toEqual({
      projectResourceFilter: 'all',
    });
  });
});

/*
 * Reusing an already-open Home brings its tab to the front without calling the provider, so fresh
 * options never reach it — a reload is the only way in. It is also the expensive way in, and drops
 * the user's search, so it is limited to an opener asking for a specific filter Home is not showing.
 */
describe('shouldReloadHomeForFilterPreset', () => {
  it('reloads an unfiltered Home that is being asked for projects only', () => {
    expect(shouldReloadHomeForFilterPreset(savedHome(), 'paratextProject')).toBe(true);
  });

  it('raises a filtered Home as the user left it when opened from a normal entry point', () => {
    // An opener with no preset is just asking for Home. The filter is on screen and one click to
    // change, so reloading to reset it would only cost the user their search.
    expect(
      shouldReloadHomeForFilterPreset(
        savedHome({ projectResourceFilter: 'paratextProject' }),
        'all',
      ),
    ).toBe(false);
    expect(
      shouldReloadHomeForFilterPreset(savedHome({ projectResourceFilter: 'resource' }), 'all'),
    ).toBe(false);
  });

  it('reloads a Home the user changed when "More projects…" asks for projects again', () => {
    // Launched on projects, then switched to everything by the user. The launch preset alone would
    // say nothing changed, and "More projects…" would raise a list full of resources.
    expect(
      shouldReloadHomeForFilterPreset(
        savedHome({ projectResourceFilter: 'all' }),
        'paratextProject',
      ),
    ).toBe(true);
  });

  it('leaves a Home already showing the asked-for filter alone', () => {
    expect(
      shouldReloadHomeForFilterPreset(
        savedHome({ projectResourceFilter: 'paratextProject' }),
        'paratextProject',
      ),
    ).toBe(false);
  });

  it('leaves an unfiltered Home alone when asked for no preset', () => {
    expect(shouldReloadHomeForFilterPreset(savedHome(), 'all')).toBe(false);
  });
});
