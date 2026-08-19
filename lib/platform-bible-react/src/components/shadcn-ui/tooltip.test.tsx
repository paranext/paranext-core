// @vitest-environment jsdom

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipPortalContainerProvider,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { queryVisibleTooltips } from './tooltip.test-utils';

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

function TooltipUnderTest() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Tooltip body</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Mirrors the FirstRunGate wiring: a host element captured by a ref callback and handed to the
 * provider, with the tooltip rendered inside. `container` starts null (before the host mounts) and
 * becomes the element on the second render, exactly as it does in the real consumer.
 */
function HostedTooltip() {
  // React ref-callback state must be initialized to null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const [hostEl, setHostEl] = useState<HTMLDivElement | null>(null);
  return (
    <div data-testid="host" ref={setHostEl}>
      <TooltipPortalContainerProvider container={hostEl}>
        <TooltipUnderTest />
      </TooltipPortalContainerProvider>
    </div>
  );
}

/** Opens the tooltip and returns its visible content element (see `queryVisibleTooltips`). */
async function openTooltip() {
  await userEvent.hover(screen.getByText('Trigger'));
  return waitFor(() => {
    const [content] = queryVisibleTooltips();
    if (!content) throw new Error('tooltip content did not open');
    return content;
  });
}

describe('TooltipContent portal target', () => {
  test('portals to document.body when no TooltipPortalContainerProvider is in scope', async () => {
    render(<TooltipUnderTest />);
    const tooltip = await openTooltip();

    expect(document.body).toContainElement(tooltip);
    // Radix portals to a direct child of body, outside whatever subtree rendered the trigger.
    expect(screen.getByText('Trigger').parentElement).not.toContainElement(tooltip);
  });

  // Without this, a tooltip inside an ancestor that stacks above Z_INDEX_TOOLTIP (550) — such as
  // the first-run wizard gate at Z_INDEX_FIRST_RUN (700), which paints an opaque full-viewport
  // dialog — portals to document.body as a positioned sibling and is painted behind it.
  test('portals into the provider container so it stacks inside that ancestor', async () => {
    render(<HostedTooltip />);
    const tooltip = await openTooltip();

    expect(screen.getByTestId('host')).toContainElement(tooltip);
  });
});
