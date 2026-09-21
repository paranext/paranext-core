import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import type { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { DialogDescription, DialogTitle } from 'platform-bible-react';
import { OverlayModalDialog } from './overlay-modal-dialog.component';

// Mock the overlay store
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  resolveAndRemoveOverlay: vi.fn(),
}));

function createMockOverlay(
  componentContent: string,
  overrides?: Partial<Extract<OverlayEntry, { type: 'modalDialog' }>>,
): Extract<OverlayEntry, { type: 'modalDialog' }> {
  return {
    type: 'modalDialog',
    id: 'test-overlay',
    webViewId: 'test-webview',
    Component: () => <div data-testid="mock-component">{componentContent}</div>,
    props: {},
    resolve: vi.fn(),
    reject: vi.fn(),
    ...overrides,
  };
}

describe('OverlayModalDialog', () => {
  it('renders the provided component', () => {
    const overlay = createMockOverlay('Hello from component');
    render(<OverlayModalDialog overlay={overlay} />);
    expect(screen.getByTestId('mock-component')).toHaveTextContent('Hello from component');
  });

  it('renders inside a dialog with modal backdrop', () => {
    const overlay = createMockOverlay('Content');
    render(<OverlayModalDialog overlay={overlay} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // Radix derives both ids from the one `Dialog.Root` context, so a hosted component that renders
  // its own title and description ships each id twice: a `duplicate-id-aria` violation, and
  // `aria-labelledby`/`aria-describedby` resolving to whichever comes first in document order —
  // this shell's generic fallback rather than the component's own localized text.
  //
  // Asserted by id rather than by text: the shell's fallback text is `title` when no `prompt` is
  // given, so a component whose own title says the same thing would make a text-based assertion
  // ambiguous.
  describe('when the hosted dialog provides its own title and description', () => {
    function renderWithOwnPair(
      providesOwnTitle: boolean,
      providesOwnDescription = providesOwnTitle,
    ) {
      const overlay = createMockOverlay('Content', {
        props: { title: 'Shell fallback title', providesOwnTitle, providesOwnDescription },
        Component: () => (
          <>
            <DialogTitle>Component title</DialogTitle>
            <DialogDescription>Component description</DialogDescription>
          </>
        ),
      });
      render(<OverlayModalDialog overlay={overlay} />);
      const dialog = screen.getByRole('dialog');
      return {
        dialog,
        titleIds: Array.from(
          document.querySelectorAll(`[id="${dialog.getAttribute('aria-labelledby')}"]`),
        ),
        descriptionIds: Array.from(
          document.querySelectorAll(`[id="${dialog.getAttribute('aria-describedby')}"]`),
        ),
      };
    }

    it('renders neither of its own, so each id stays unique', () => {
      const { titleIds, descriptionIds } = renderWithOwnPair(true);

      expect(titleIds).toHaveLength(1);
      expect(descriptionIds).toHaveLength(1);
      expect(titleIds[0]).toHaveTextContent('Component title');
      expect(descriptionIds[0]).toHaveTextContent('Component description');
    });

    // The positive control for the assertions above: without the flag the shell still adds its
    // pair, so the ids really are duplicated and really do resolve to the shell's text. Without
    // this, "one element carries the id" would pass against a shell that had stopped rendering a
    // fallback for every dialog, silently dropping the accessible name from the ones that need it.
    it('still renders its own fallback pair when neither flag is set', () => {
      const { titleIds, descriptionIds } = renderWithOwnPair(false);

      expect(titleIds).toHaveLength(2);
      expect(descriptionIds).toHaveLength(2);
      expect(titleIds[0]).toHaveTextContent('Shell fallback title');
    });

    // The two flags are suppressed independently, which is the whole reason the field is split:
    // a dialog that renders a title and no description (Project Picker) must keep the shell's
    // description rather than being left with none. A combined flag passes the tests above and
    // fails this one.
    it('suppresses only the half its flag names', () => {
      const { titleIds, descriptionIds } = renderWithOwnPair(true, false);

      expect(titleIds).toHaveLength(1);
      expect(titleIds[0]).toHaveTextContent('Component title');
      // The component's own description plus the shell's, because only the title was suppressed.
      expect(descriptionIds).toHaveLength(2);
    });
  });
});
