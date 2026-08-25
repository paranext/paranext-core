// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Section } from 'platform-bible-utils';
import { Command, CommandList } from '@/components/shadcn-ui/command';
import { BookItem } from './book-item.component';

// jsdom doesn't ship a ResizeObserver, and cmdk (used by CommandItem) instantiates one on
// mount, crashing any test that renders it. A no-op stub is sufficient since these tests
// don't assert layout behavior.
class NoopResizeObserver implements ResizeObserver {
  // Touch `this` so the no-op methods don't trip @typescript-eslint/class-methods-use-this.
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
  // cmdk also calls `scrollIntoView` on the active item, which jsdom doesn't implement.
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

/** BookItem renders a cmdk CommandItem, which throws outside a Command ancestor. */
function renderBookItem(props: Partial<Parameters<typeof BookItem>[0]> = {}) {
  return render(
    <Command>
      <CommandList>
        <BookItem bookId="REV" section={Section.NT} {...props} />
      </CommandList>
    </Command>,
  );
}

describe('BookItem dimmed state', () => {
  test('is not dimmed by default', () => {
    renderBookItem();
    expect(screen.getByRole('option')).not.toHaveClass('tw:opacity-70');
  });

  test('applies the dimmed classes when a dimmed reason is given', () => {
    renderBookItem({ dimmedReason: 'not in this project' });
    const option = screen.getByRole('option');
    expect(option).toHaveClass('tw:opacity-70');
    // The row the user is actually on reads at full contrast, like any other book
    expect(option).toHaveClass('tw:data-selected:opacity-100');
  });

  // A dimmed item is selectable, so it must not read as less available than a disabled one
  test('a dimmed item is less dimmed than a disabled one', () => {
    const { unmount } = renderBookItem({ dimmedReason: 'not in this project' });
    expect(screen.getByRole('option')).toHaveClass('tw:opacity-70');
    unmount();

    renderBookItem({ disabled: true });
    expect(screen.getByRole('option')).toHaveClass('tw:opacity-50');
  });

  test('a dimmed item is still selectable', async () => {
    const onSelect = vi.fn();
    renderBookItem({ dimmedReason: 'not in this project', onSelect });

    await userEvent.click(screen.getByRole('option'));

    expect(onSelect).toHaveBeenCalledWith('REV');
  });

  test('a dimmed item is not marked disabled to assistive tech', () => {
    renderBookItem({ dimmedReason: 'not in this project' });
    // cmdk's CommandPrimitive.Item always renders an explicit aria-disabled="true"/"false"
    // reflecting the `disabled` prop, regardless of what BookItem passes through — even the
    // plain, non-dimmed case renders aria-disabled="false" rather than omitting the attribute.
    // The behavior that matters is that dimmed never flips it to "true".
    expect(screen.getByRole('option')).not.toHaveAttribute('aria-disabled', 'true');
  });

  test('dimmed does not apply the disabled cursor', () => {
    renderBookItem({ dimmedReason: 'not in this project' });
    expect(screen.getByRole('option')).not.toHaveClass('tw:cursor-not-allowed');
  });

  test('disabled wins over dimmed so the two styles do not stack', () => {
    renderBookItem({ dimmedReason: 'not in this project', disabled: true });
    const option = screen.getByRole('option');
    expect(option).toHaveClass('tw:cursor-not-allowed');
    expect(option).not.toHaveClass('tw:opacity-70');
  });

  test('appends the dimmed reason to the accessible name', () => {
    renderBookItem({ dimmedReason: 'not in this project' });
    expect(
      screen.getByRole('option', { name: 'Revelation (REV), not in this project' }),
    ).toBeInTheDocument();
  });

  test('omits the reason when no dimmed reason is given', () => {
    renderBookItem();
    expect(screen.getByRole('option', { name: 'Revelation (REV)' })).toBeInTheDocument();
  });

  // The reason arrives localized, so the name it is appended to has to be localized too
  test('announces a localized name and reason in one language', () => {
    renderBookItem({
      dimmedReason: 'no está en este proyecto',
      localizedBookNames: new Map([['REV', { localizedId: 'APO', localizedName: 'Apocalipsis' }]]),
    });

    expect(
      screen.getByRole('option', { name: 'Apocalipsis (APO), no está en este proyecto' }),
    ).toBeInTheDocument();
  });

  test('a disabled item does not announce the dimmed reason', () => {
    renderBookItem({ dimmedReason: 'not in this project', disabled: true });
    expect(screen.getByRole('option', { name: 'Revelation (REV)' })).toBeInTheDocument();
  });

  // Radix opens its tooltip from a pointermove carrying a non-touch pointerType, which
  // userEvent.hover does not produce under jsdom — these have to be fired directly.
  function hoverWithPointer(element: HTMLElement) {
    fireEvent.pointerEnter(element, { pointerType: 'mouse' });
    fireEvent.pointerMove(element, { pointerType: 'mouse' });
  }

  // Without this the greying is a colour-only signal for a sighted user
  test('shows the dimmed reason in a tooltip on hover', async () => {
    renderBookItem({ dimmedReason: 'not in this project' });

    hoverWithPointer(screen.getByRole('option'));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('not in this project');
  });

  test('shows no tooltip when the item is not dimmed', async () => {
    renderBookItem();

    hoverWithPointer(screen.getByRole('option'));

    await expect(screen.findByRole('tooltip')).rejects.toThrow();
  });

  test('shows no tooltip on a disabled item', async () => {
    renderBookItem({ dimmedReason: 'not in this project', disabled: true });

    hoverWithPointer(screen.getByRole('option'));

    await expect(screen.findByRole('tooltip')).rejects.toThrow();
  });
});
