// @vitest-environment jsdom
import type React from 'react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';

// cmdk instantiates a ResizeObserver on mount and schedules scrollIntoView; jsdom ships neither.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  Element.prototype.scrollIntoView = vi.fn();
});

/**
 * A minimal cmdk palette. cmdk auto-highlights the first non-disabled item, so `Alpha` is the item
 * a Space-commit would pick.
 */
function TestPalette({
  spaceSelectsHighlightedItem,
  onSelect,
  onKeyDown,
}: {
  spaceSelectsHighlightedItem?: boolean;
  onSelect: (id: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <Command>
      <CommandInput
        placeholder="Search"
        spaceSelectsHighlightedItem={spaceSelectsHighlightedItem}
        onKeyDown={onKeyDown}
      />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
        <CommandItem value="alpha" onSelect={() => onSelect('alpha')}>
          Alpha
        </CommandItem>
        <CommandItem value="beta" onSelect={() => onSelect('beta')}>
          Beta
        </CommandItem>
      </CommandList>
    </Command>
  );
}

describe('CommandInput — Space-selects-highlighted-item is OPT-IN', () => {
  it('does NOT select the highlighted item on Space by default', async () => {
    // The default must be inert: this patch is shared by every CommandInput in the app, and a
    // palette that owns its own Space semantics (the marker palettes) must never have Space
    // taken from it behind its back.
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TestPalette onSelect={onSelect} />);

    const input = screen.getByPlaceholderText('Search');
    await user.click(input);
    await user.keyboard(' ');

    expect(onSelect).not.toHaveBeenCalled();
    // The space is ordinary text when nobody claims it.
    expect(input).toHaveValue(' ');
  });

  it('selects the highlighted item on Space when opted in', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TestPalette spaceSelectsHighlightedItem onSelect={onSelect} />);

    const input = screen.getByPlaceholderText('Search');
    await user.click(input);
    await user.keyboard(' ');

    expect(onSelect).toHaveBeenCalledWith('alpha');
    expect(input).toHaveValue('');
  });

  it('leaves Space alone once the input is non-empty, even when opted in', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TestPalette spaceSelectsHighlightedItem onSelect={onSelect} />);

    const input = screen.getByPlaceholderText('Search');
    await user.click(input);
    await user.keyboard('al ');

    expect(onSelect).not.toHaveBeenCalled();
    expect(input).toHaveValue('al ');
  });

  it("composes with a caller's own onKeyDown, which can veto the patch", async () => {
    // The caller handler runs first and a default-prevented event stops the patch — the
    // composition every consumer with its own key contract relies on.
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <TestPalette
        spaceSelectsHighlightedItem
        onSelect={onSelect}
        onKeyDown={(event) => {
          if (event.key === ' ') event.preventDefault();
        }}
      />,
    );

    const input = screen.getByPlaceholderText('Search');
    await user.click(input);
    await user.keyboard(' ');

    expect(onSelect).not.toHaveBeenCalled();
  });
});
