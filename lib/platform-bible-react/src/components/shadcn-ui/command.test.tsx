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

describe('CommandItem check', () => {
  const renderRows = () =>
    render(
      <Command>
        <CommandList>
          <CommandItem value="checked" data-checked>
            Checked
          </CommandItem>
          <CommandItem value="unchecked" data-checked={false}>
            Unchecked
          </CommandItem>
          <CommandItem value="plain">Plain</CommandItem>
        </CommandList>
      </Command>,
    );
  const rowOf = (name: string) => screen.getByRole('option', { name });
  const checkOf = (row: HTMLElement) => row.querySelector('.tabler-icon-check');

  it('renders the check before the label, on the leading side', () => {
    renderRows();
    const row = rowOf('Checked');
    // firstChild, not firstElementChild: the label is a text node, so only this sees the order
    expect(row.firstChild).toBe(checkOf(row));
  });

  it('passes data-checked through as "true" or "false", and leaves it off when omitted', () => {
    renderRows();
    expect(rowOf('Checked')).toHaveAttribute('data-checked', 'true');
    expect(rowOf('Unchecked')).toHaveAttribute('data-checked', 'false');
    expect(rowOf('Plain')).not.toHaveAttribute('data-checked');
  });

  it('shows the check only when data-checked is true, keeping its space when false', () => {
    renderRows();
    const checked = checkOf(rowOf('Checked'));
    const unchecked = checkOf(rowOf('Unchecked'));
    expect(checked).not.toBeNull();
    expect(checked).not.toHaveClass('tw:opacity-0');
    // Still rendered, so an unchecked label starts where a checked one does
    expect(unchecked).not.toBeNull();
    expect(unchecked).toHaveClass('tw:opacity-0');
  });

  it('renders no check on an item without data-checked, so its own content stays first', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="plain">
            <span>Genesis 1:1</span>
            <span>GEN</span>
          </CommandItem>
        </CommandList>
      </Command>,
    );
    const row = screen.getByRole('option');
    expect(checkOf(row)).toBeNull();
    expect(row.firstElementChild).toHaveTextContent('Genesis 1:1');
  });

  it('announces the check state through aria-checked, and only on checkable items', () => {
    renderRows();
    expect(rowOf('Checked')).toHaveAttribute('aria-checked', 'true');
    expect(rowOf('Unchecked')).toHaveAttribute('aria-checked', 'false');
    expect(rowOf('Plain')).not.toHaveAttribute('aria-checked');
  });

  it("lets a caller's own aria-checked win, for states data-checked cannot express", () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="partial" data-checked aria-checked="mixed">
            Partial
          </CommandItem>
        </CommandList>
      </Command>,
    );
    expect(screen.getByRole('option', { name: 'Partial' })).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });

  it('hides the check from assistive technology, since it is decorative', () => {
    renderRows();
    expect(checkOf(rowOf('Checked'))).toHaveAttribute('aria-hidden', 'true');
  });
});
