// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// Hidden, so the character-marker bar overlay measures nothing: these tests are about where
// things sit in the tree, not about geometry jsdom does not have.
vi.mock('platform-bible-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-react')>()),
  useViewVisibility: () => false,
}));

// The paragraph-marker tooltip overlay reads its marker names through this hook.
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
}));

// Imported after the mocks so the overlays pick up the mocked hooks.
// eslint-disable-next-line import/first
import { EditorSurface } from './editor-surface.component';

beforeAll(() => {
  // jsdom ships no ResizeObserver; the character-marker bar overlay observes the editor.
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(function ResizeObserverStub() {
      return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
    }),
  );
});

afterAll(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  cleanup();
});

const MARKER = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`;

function renderSurface(props: Partial<Parameters<typeof EditorSurface>[0]> = {}) {
  return render(
    <EditorSurface
      editor={<div data-testid="editor">In the beginning</div>}
      characterMarkerBar={<div data-testid="bar">Bar</div>}
      areParagraphMarkerTooltipsEnabled
      {...props}
    />,
  );
}

describe('EditorSurface content zoom', () => {
  it('marks one area, holding the editor and nothing else', () => {
    renderSurface();

    const markers = document.querySelectorAll(MARKER);
    expect(markers).toHaveLength(1);
    const [marker] = markers;
    const editor = screen.getByTestId('editor');
    expect(marker).toContainElement(editor);
    // The overlays around the editor (the Backspace/Delete hint, the paragraph-marker tooltips,
    // the character-marker bar) position their UI from their own wrappers, which must stay at
    // interface scale: nothing but the editor may sit inside the marker.
    Array.from(marker.querySelectorAll('*')).forEach((element) =>
      expect(element === editor || editor.contains(element)).toBe(true),
    );
  });

  it('keeps the character-marker bar at interface scale', () => {
    renderSurface();

    expect(screen.getByTestId('bar').closest(MARKER)).toBeNull();
  });

  it('shows the empty-chapter view at interface scale and hides the editor without unmounting it', () => {
    renderSurface({ emptyChapterView: <p>This chapter is empty</p> });

    expect(screen.getByText('This chapter is empty').closest(MARKER)).toBeNull();
    const editor = screen.getByTestId('editor');
    expect(editor.closest('.tw\\:hidden')).not.toBeNull();
  });
});
