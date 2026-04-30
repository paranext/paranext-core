// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import type { Scope } from '@/components/utils/scripture.util';
import type { SerializedVerseRef } from '@sillsdev/scripture';

const REF_GEN_1_1: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const REF_GEN_5_30: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 30 };

// Length must match Canon.allBookIds.length (BookSelector validates this).
const ALL_BOOKS_PRESENT = '1'.repeat(123);

const NO_OP_LOCALIZED_STRINGS = {};

interface RenderArgs {
  scope?: Scope;
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
