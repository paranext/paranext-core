// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
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
    expect(screen.getByRole('option')).not.toHaveClass('tw:bg-muted/50');
  });

  // Same tokens as NumberedItemGrid, so book rows and chapter/verse cells grey identically
  test('applies the dimmed classes when a dimmed reason is given', () => {
    renderBookItem({ dimmedReason: 'Not in project' });
    const option = screen.getByRole('option');
    expect(option).toHaveClass('tw:bg-muted/50');
    expect(option).toHaveClass('tw:text-muted-foreground/50');
  });

  // Otherwise the id keeps full strength beside a dimmed name and the row reads half-dimmed
  test('the book id inherits the dimmed colour instead of setting its own', () => {
    renderBookItem({ dimmedReason: 'Not in project' });
    expect(screen.getByText('REV')).not.toHaveClass('tw:text-muted-foreground');
  });

  test('the book id keeps its own muted colour when not dimmed', () => {
    renderBookItem();
    expect(screen.getByText('REV')).toHaveClass('tw:text-muted-foreground');
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
    renderBookItem({ dimmedReason: 'Not in project', disabled: true });
    const option = screen.getByRole('option');
    expect(option).toHaveClass('tw:cursor-not-allowed');
    expect(option).not.toHaveClass('tw:bg-muted/50');
  });

  test('omits the reason when no dimmed reason is given', () => {
    renderBookItem();
    expect(screen.getByRole('option', { name: 'Revelation (REV)' })).toBeInTheDocument();
  });

  // The undimmed name is built from localized display values, so it is never half English
  test('announces a localized name when localized names are given', () => {
    renderBookItem({
      localizedBookNames: new Map([['REV', { localizedId: 'APO', localizedName: 'Apocalipsis' }]]),
    });

    expect(screen.getByRole('option', { name: 'Apocalipsis (APO)' })).toBeInTheDocument();
  });

  // cmdk never moves DOM focus onto an item, so a hover-only tooltip is invisible to a keyboard
  // user arrowing through the list. The label has to be rendered.
  test('renders the dimmed reason as visible text', () => {
    renderBookItem({ dimmedReason: 'Not in project' });

    expect(screen.getByText('Not in project')).toBeVisible();
  });

  test('renders no reason text when the item is not dimmed', () => {
    renderBookItem();

    expect(screen.queryByText('Not in project')).not.toBeInTheDocument();
  });

  test('renders no reason text on a disabled item', () => {
    renderBookItem({ dimmedReason: 'Not in project', disabled: true });

    expect(screen.queryByText('Not in project')).not.toBeInTheDocument();
  });

  // The whole sentence comes from one localized template, so a translation controls word order
  test('announces the localized description in place of an appended fragment', () => {
    renderBookItem({
      dimmedReason: 'No en el proyecto',
      dimmedDescription: 'Apocalipsis no está en este proyecto',
      localizedBookNames: new Map([['REV', { localizedId: 'APO', localizedName: 'Apocalipsis' }]]),
    });

    expect(
      screen.getByRole('option', { name: 'Apocalipsis no está en este proyecto' }),
    ).toBeInTheDocument();
  });

  test('falls back to the short label when no description is given', () => {
    renderBookItem({ dimmedReason: 'Not in project' });

    expect(
      screen.getByRole('option', { name: 'Revelation (REV), Not in project' }),
    ).toBeInTheDocument();
  });

  test('a disabled item announces neither the label nor the description', () => {
    renderBookItem({
      dimmedReason: 'Not in project',
      dimmedDescription: 'Revelation is not in this project',
      disabled: true,
    });

    expect(screen.getByRole('option', { name: 'Revelation (REV)' })).toBeInTheDocument();
  });
});
