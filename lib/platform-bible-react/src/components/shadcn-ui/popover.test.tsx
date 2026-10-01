// @vitest-environment jsdom

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverPortalContainerProvider, PopoverTrigger } from './popover';

// Radix's Popper positioning instantiates a ResizeObserver on mount; jsdom doesn't ship one.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

function PopoverUnderTest() {
  return (
    <Popover>
      <PopoverTrigger>Trigger</PopoverTrigger>
      <PopoverContent>Popover body</PopoverContent>
    </Popover>
  );
}

/**
 * Mirrors the ScopeSelector wiring: a host element captured by a ref callback and handed to the
 * provider, with the popover rendered inside. `container` starts null (before the host mounts) and
 * becomes the element on the second render, exactly as it does in the real consumer.
 */
function HostedPopover() {
  // React ref-callback state must be initialized to null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const [hostEl, setHostEl] = useState<HTMLDivElement | null>(null);
  return (
    <div data-testid="host" ref={setHostEl}>
      <PopoverPortalContainerProvider container={hostEl}>
        <PopoverUnderTest />
      </PopoverPortalContainerProvider>
    </div>
  );
}

async function openPopover() {
  await userEvent.click(screen.getByText('Trigger'));
  return waitFor(() => {
    const content = document.querySelector<HTMLElement>('[data-slot="popover-content"]');
    if (!content) throw new Error('popover content did not open');
    return content;
  });
}

// Pins the popover half of the shared portal-container factory. Both primitives build their own
// context from `createPortalContainerContext`, so a regression there would otherwise only be caught
// by the tooltip tests.
describe('PopoverContent portal target', () => {
  test('portals to document.body when no PopoverPortalContainerProvider is in scope', async () => {
    render(<PopoverUnderTest />);
    const popover = await openPopover();

    expect(document.body).toContainElement(popover);
    expect(screen.getByText('Trigger').parentElement).not.toContainElement(popover);
  });

  // Without this, a popover whose trigger sits inside a focus trap or dismiss layer (a Dialog, a
  // modal DropdownMenu) has its content mounted outside that subtree — the trap pulls focus back
  // out, and a click inside the popover reads as an outside click that dismisses the parent.
  test('portals into the provider container so it stays inside that ancestor', async () => {
    render(<HostedPopover />);
    const popover = await openPopover();

    expect(screen.getByTestId('host')).toContainElement(popover);
  });
});
