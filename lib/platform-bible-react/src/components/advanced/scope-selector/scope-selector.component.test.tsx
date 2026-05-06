// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import type { ScopeWithRange } from '@/components/utils/scripture.util';
import type { SerializedVerseRef } from '@sillsdev/scripture';

// jsdom doesn't ship a ResizeObserver, and `Element.prototype.scrollTo` is unimplemented.
// cmdk (used inside BookChapterControl's popover) instantiates a ResizeObserver on mount,
// and BCV schedules a `scrollTo` after the popover opens to center the selected book —
// either crashes any test that opens a BCV picker. No-op stubs are sufficient since the
// tests don't assert layout / scroll behavior.
class NoopResizeObserver implements ResizeObserver {
  // Touch `this` so the no-op methods don't trip @typescript-eslint/class-methods-use-this.
  // We keep `targets` as an internal record of attached elements so the polyfill behaves
  // like a (very dumb) real ResizeObserver: observe/unobserve mutate the set, disconnect
  // clears it. None of the tests inspect this state — it just satisfies the lint rule
  // without an eslint-disable.
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
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
});

const REF_GEN_1_1: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const REF_GEN_5_30: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 30 };

// Length must match Canon.allBookIds.length (BookSelector validates this).
const ALL_BOOKS_PRESENT = '1'.repeat(123);

const NO_OP_LOCALIZED_STRINGS = {};

interface RenderArgs {
  scope?: ScopeWithRange;
  rangeStart?: SerializedVerseRef;
  rangeEnd?: SerializedVerseRef;
  selectedBookIds?: string[];
}

function renderDropdown(args: RenderArgs = {}) {
  const onScopeChange = vi.fn();
  const onRangeStartChange = vi.fn();
  const onRangeEndChange = vi.fn();
  const onSelectedBookIdsChange = vi.fn();
  // Radix DropdownMenu / Dialog rely on PointerEvent sequences (pointerdown -> click)
  // that fireEvent.click() does not synthesize. userEvent v14 with `pointerEventsCheck: 0`
  // works reliably in jsdom where layout is unavailable. See Radix issue #1822.
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const utils = render(
    <ScopeSelector
      variant="dropdown"
      scope={args.scope ?? 'chapter'}
      onScopeChange={onScopeChange}
      availableBookInfo={ALL_BOOKS_PRESENT}
      selectedBookIds={args.selectedBookIds ?? []}
      onSelectedBookIdsChange={onSelectedBookIdsChange}
      localizedStrings={NO_OP_LOCALIZED_STRINGS}
      rangeStart={args.rangeStart ?? REF_GEN_1_1}
      rangeEnd={args.rangeEnd ?? REF_GEN_5_30}
      onRangeStartChange={onRangeStartChange}
      onRangeEndChange={onRangeEndChange}
      hideLabel
    />,
  );
  return {
    ...utils,
    user,
    onScopeChange,
    onRangeStartChange,
    onRangeEndChange,
    onSelectedBookIdsChange,
  };
}

function renderRadio(args: RenderArgs = {}) {
  const onScopeChange = vi.fn();
  const onRangeStartChange = vi.fn();
  const onRangeEndChange = vi.fn();
  const onSelectedBookIdsChange = vi.fn();
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const utils = render(
    <ScopeSelector
      variant="radio"
      scope={args.scope ?? 'range'}
      onScopeChange={onScopeChange}
      availableBookInfo={ALL_BOOKS_PRESENT}
      selectedBookIds={args.selectedBookIds ?? []}
      onSelectedBookIdsChange={onSelectedBookIdsChange}
      localizedStrings={NO_OP_LOCALIZED_STRINGS}
      rangeStart={args.rangeStart ?? REF_GEN_1_1}
      rangeEnd={args.rangeEnd ?? REF_GEN_5_30}
      onRangeStartChange={onRangeStartChange}
      onRangeEndChange={onRangeEndChange}
      hideLabel
    />,
  );
  return {
    ...utils,
    user,
    onScopeChange,
    onRangeStartChange,
    onRangeEndChange,
    onSelectedBookIdsChange,
  };
}

describe('ScopeSelector — dialog staging', () => {
  it('clicking a simple scope (chapter) fires onScopeChange immediately', async () => {
    const { user, onScopeChange, getByRole } = renderDropdown({ scope: 'verse' });
    await user.click(getByRole('combobox'));
    // Localized strings empty → component falls back to the localize key itself.
    const item = await screen.findByText(/scope_selector_current_chapter/i);
    await user.click(item);
    expect(onScopeChange).toHaveBeenCalledWith('chapter');
  });

  it('opening the Range dialog does not fire any callbacks', async () => {
    const { user, onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown(
      { scope: 'chapter' },
    );
    await user.click(getByRole('combobox'));
    // Match the launcher item text. The "Range…" launcher renders the rangeText
    // followed by an ellipsis. The Range Start / Range End labels only render
    // inside the dialog (after the launcher is clicked), so a /scope_selector_range/i
    // match here is unambiguous.
    const rangeLauncher = await screen.findByText(/scope_selector_range/i);
    await user.click(rangeLauncher);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onRangeStartChange).not.toHaveBeenCalled();
    expect(onRangeEndChange).not.toHaveBeenCalled();
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('Range dialog Cancel button discards drafts: no callbacks fire', async () => {
    const { user, onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown(
      { scope: 'chapter' },
    );
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_range/i));
    const dialog = await screen.findByRole('dialog');
    const cancelBtn = within(dialog).getByRole('button', { name: /scope_selector_cancel/i });
    await user.click(cancelBtn);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onRangeStartChange).not.toHaveBeenCalled();
    expect(onRangeEndChange).not.toHaveBeenCalled();
  });

  it('Range dialog OK commits scope + start + end together', async () => {
    const { user, onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown(
      {
        scope: 'chapter',
        rangeStart: REF_GEN_1_1,
        rangeEnd: REF_GEN_5_30,
      },
    );
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_range/i));
    const dialog = await screen.findByRole('dialog');
    const okBtn = within(dialog).getByRole('button', { name: /scope_selector_ok/i });
    await user.click(okBtn);
    // Without picker interaction, drafts equal the seeded values from props.
    expect(onRangeStartChange).toHaveBeenCalledWith(REF_GEN_1_1);
    expect(onRangeEndChange).toHaveBeenCalledWith(REF_GEN_5_30);
    expect(onScopeChange).toHaveBeenCalledWith('range');
  });

  it('selectedBooks dialog Cancel discards: no onSelectedBookIdsChange', async () => {
    const { user, onScopeChange, onSelectedBookIdsChange, getByRole } = renderDropdown({
      scope: 'chapter',
      selectedBookIds: ['GEN'],
    });
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_choose_books/i));
    const dialog = await screen.findByRole('dialog');
    const cancelBtn = within(dialog).getByRole('button', { name: /scope_selector_cancel/i });
    await user.click(cancelBtn);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onSelectedBookIdsChange).not.toHaveBeenCalled();
  });

  it('re-clicking the active simple scope re-fires onScopeChange (D4 fix)', async () => {
    const { user, onScopeChange, getByRole } = renderDropdown({ scope: 'chapter' });
    await user.click(getByRole('combobox'));
    const chapterItem = await screen.findByText(/scope_selector_current_chapter/i);
    await user.click(chapterItem);
    expect(onScopeChange).toHaveBeenCalledWith('chapter');
  });
});

describe('ScopeSelector — range mode', () => {
  it('radio variant with scope="range" renders Range Start + Range End labels and two BCV triggers', () => {
    renderRadio({ scope: 'range' });
    // Both labels appear inline below the radio chooser.
    expect(screen.getByText(/scope_selector_range_start/i)).toBeInTheDocument();
    expect(screen.getByText(/scope_selector_range_end/i)).toBeInTheDocument();
    // BCV triggers carry aria-label="book-chapter-trigger". The radio variant renders the
    // rangeBlock inline (no outer dropdown trigger), so exactly two BCV triggers are present.
    const bcvTriggers = screen.getAllByLabelText('book-chapter-trigger');
    expect(bcvTriggers).toHaveLength(2);
    bcvTriggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('dropdown variant: opening the Range dialog renders both BCV controls inside the dialog', async () => {
    const { user, getByRole } = renderDropdown({ scope: 'chapter' });
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_range/i));
    const dialog = await screen.findByRole('dialog');
    // Both BCV triggers render inside the dialog (the only BCV instances on the page in
    // this scenario, since the outer trigger is a button-not-BCV and the navigate footer
    // is gated on `onCurrentScrRefChange`).
    const bcvTriggers = within(dialog).getAllByLabelText('book-chapter-trigger');
    expect(bcvTriggers).toHaveLength(2);
    expect(within(dialog).getByText(/scope_selector_range_start/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/scope_selector_range_end/i)).toBeInTheDocument();
  });

  it('radio variant: clicking the start BCV trigger toggles aria-expanded — confirms picker is wired', async () => {
    const { user } = renderRadio({ scope: 'range' });
    const [startTrigger] = screen.getAllByLabelText('book-chapter-trigger');
    expect(startTrigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(startTrigger);
    // After click, Radix Popover sets aria-expanded="true" on the trigger. This verifies
    // the BCV is mounted and reactive — a sanity check on the range-mode wiring without
    // requiring the popover content to fully render in jsdom.
    expect(startTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('Range dialog Esc-style close (onOpenChange(false)) discards drafts: no callbacks fire', async () => {
    const { user, onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown(
      { scope: 'chapter' },
    );
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_range/i));
    const dialog = await screen.findByRole('dialog');
    // The dialog renders an X close button (DialogContent's built-in close). Click it to
    // simulate the Esc / outside-click path through `onOpenChange(false)` →
    // `handleDialogOpenChange(false)`. We use getByRole on the close button which carries
    // an sr-only "Close" label from shadcn's DialogContent.
    const closeBtn = within(dialog).getByRole('button', { name: /close/i });
    await user.click(closeBtn);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onRangeStartChange).not.toHaveBeenCalled();
    expect(onRangeEndChange).not.toHaveBeenCalled();
  });

  it('selectedBooks dialog OK commits the seeded selection exactly once', async () => {
    const { user, onScopeChange, onSelectedBookIdsChange, getByRole } = renderDropdown({
      scope: 'chapter',
      selectedBookIds: ['GEN', 'EXO'],
    });
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_choose_books/i));
    const dialog = await screen.findByRole('dialog');
    const okBtn = within(dialog).getByRole('button', { name: /scope_selector_ok/i });
    await user.click(okBtn);
    // Without picker interaction, the draft equals the seeded prop. OK should commit
    // once — both the books AND the scope (so consumers see the matched scope+books).
    expect(onSelectedBookIdsChange).toHaveBeenCalledTimes(1);
    expect(onSelectedBookIdsChange).toHaveBeenCalledWith(['GEN', 'EXO']);
    expect(onScopeChange).toHaveBeenCalledWith('selectedBooks');
  });

  it('selectedBooks dialog X-close (onOpenChange(false)) discards drafts: no callbacks fire', async () => {
    const { user, onScopeChange, onSelectedBookIdsChange, getByRole } = renderDropdown({
      scope: 'chapter',
      selectedBookIds: ['GEN'],
    });
    await user.click(getByRole('combobox'));
    await user.click(await screen.findByText(/scope_selector_choose_books/i));
    const dialog = await screen.findByRole('dialog');
    const closeBtn = within(dialog).getByRole('button', { name: /close/i });
    await user.click(closeBtn);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onSelectedBookIdsChange).not.toHaveBeenCalled();
  });
});
