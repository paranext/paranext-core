import { existsSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { rootKeyboardShortcuts } from './keyboard-shortcuts.data';

const REPO_ROOT = path.resolve(__dirname, '../..');

/**
 * The content-zoom chord handlers this file's Zoom category must cite once the chords move from the
 * main-process app-wide zoom to per-pane content zoom: the in-view bootstrap, the window-chrome
 * listener, the macOS View menu items, and the command router they all funnel through.
 */
const CONTENT_ZOOM_CHORD_LOCATIONS = [
  'src/renderer/services/web-view-content-zoom.bootstrap-script.ts',
  'src/renderer/services/web-view-content-zoom.chrome-keys.ts',
  'src/main/platform-macos-menubar.data.ts',
  'src/main/services/web-view.service-router.ts',
];

function zoomEntries() {
  return rootKeyboardShortcuts.filter((entry) => entry.category === 'Zoom');
}

/** All (entry id, location) pairs across the Zoom category, for a per-pair existence check. */
function zoomEntryLocationPairs(): [entryId: string, location: string][] {
  return zoomEntries().flatMap((entry) => entry.locations.map((location) => [entry.id, location]));
}

describe('keyboard-shortcuts.data Zoom category', () => {
  it('has no leftover app-wide zoom entries for the removed main-process chords', () => {
    const ids = zoomEntries().map((entry) => entry.id);
    expect(ids).not.toContain('zoom-in');
    expect(ids).not.toContain('zoom-out');
    expect(ids).not.toContain('reset-zoom');
  });

  it.each(['content-zoom-in', 'content-zoom-out', 'content-zoom-reset'])(
    'documents all four content-zoom chord handlers on %s',
    (id) => {
      const entry = zoomEntries().find((zoomEntry) => zoomEntry.id === id);
      expect(entry?.locations).toEqual(CONTENT_ZOOM_CHORD_LOCATIONS);
    },
  );

  it.each(zoomEntryLocationPairs())('%s location "%s" resolves to a real file', (_id, location) => {
    expect(existsSync(path.join(REPO_ROOT, location))).toBe(true);
  });
});
