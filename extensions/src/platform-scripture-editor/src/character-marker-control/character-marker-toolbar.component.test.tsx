// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MarkerMenuItem } from 'platform-bible-react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Mutable mock so one test can flip interface mode and assert both directions.
const mockMode: { isPowerMode: boolean | undefined } = { isPowerMode: false };
vi.mock('../use-is-power-mode.hook', () => ({
  useIsPowerMode: () => mockMode.isPowerMode,
}));

// Imported after the mock so the component picks up the mocked `useIsPowerMode`.
/* eslint-disable import/first */
import { CharacterMarkerControl } from './character-marker-control.component';
import { CharacterMarkerToolbar } from './character-marker-toolbar.component';
/* eslint-enable import/first */

const STRINGS = {
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%': 'Character marker',
  '%webView_platformScriptureEditor_characterMarkerControl_none%': '(none)',
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel_format%': '{name}: {value}',
};

const ITEMS: MarkerMenuItem[] = [
  { marker: 'bd', title: 'Bold', selectionState: 'partial', action: vi.fn() },
  { marker: 'it', title: 'Italic', selectionState: 'none', action: vi.fn() },
];

function renderControl() {
  return render(
    <CharacterMarkerToolbar>
      <CharacterMarkerControl
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={vi.fn()}
        onClose={vi.fn()}
        localizedStrings={STRINGS}
      />
    </CharacterMarkerToolbar>,
  );
}

afterEach(() => {
  vi.clearAllMocks();
  mockMode.isPowerMode = false;
});

describe('CharacterMarkerToolbar', () => {
  it('renders nothing in Power mode and everything in Simple mode', () => {
    mockMode.isPowerMode = true;
    const { unmount } = renderControl();
    // Absent from the tree, not merely hidden — a hidden control would still affect layout.
    expect(screen.queryByRole('button')).toBeNull();
    unmount();

    mockMode.isPowerMode = false;
    renderControl();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders nothing until the interface mode resolves', () => {
    // `undefined` is "not known yet". Painting on it would flash Simple-only UI into a Power
    // session for a frame — the behavior change this feature must not make.
    mockMode.isPowerMode = undefined;
    renderControl();

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders additional slot children without any change to the control', () => {
    // U1: a second action button must be addable without editing this component's internals.
    render(
      <CharacterMarkerToolbar>
        <CharacterMarkerControl
          isMixed={false}
          isSyncBlocked={false}
          markerMenuItems={ITEMS}
          onOpen={vi.fn()}
          onClose={vi.fn()}
          localizedStrings={STRINGS}
        />
        <button type="button">Second action</button>
      </CharacterMarkerToolbar>,
    );

    expect(screen.getByRole('button', { name: 'Second action' })).toBeInTheDocument();
  });
});
