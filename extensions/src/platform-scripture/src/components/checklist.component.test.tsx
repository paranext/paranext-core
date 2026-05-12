// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChecklistTool } from './checklist.component';
import type { ChecklistData, ChecklistRow } from './checklist.types';

// UX-2 regression tests for two of the WP2 fixes that are practical to assert in unit tests:
//   - #19: character-style text items render inside a `<span className="usfm_{marker}">` rather
//     than as literal "(\nd Lord)" text.
//   - #16: verse-number items render as click-to-navigate buttons when `onGotoLinkClick` is
//     provided, falling back to plain `<sup>` superscripts otherwise.
//
// We skip RTL tests for #15 (visual is the more direct assertion) and #17 (jsdom focus assertions
// are flaky against Radix's focus-trap timing — the visual verification step covers it).

const makeRow = (overrides: Partial<ChecklistRow> = {}): ChecklistRow => ({
  cells: [
    {
      paragraphs: [
        {
          marker: 'p',
          items: [
            { type: 'text', text: 'Then the ' },
            { type: 'text', text: 'Lord', characterStyle: 'nd' },
            { type: 'verse', verseNumber: '5' },
            { type: 'text', text: ' planted.' },
          ],
        },
      ],
      reference: 'GEN 2:8',
      displayedReference: 'GEN 2:8',
      language: 'en',
      error: undefined,
    },
  ],
  isMatch: false,
  includeEditLink: false,
  firstRef: 'GEN 2:8',
  ...overrides,
});

const baseData: ChecklistData = {
  rows: [makeRow()],
  columnHeaders: ['ESVUS16'],
  columnProjectIds: ['esvus16-id'],
  excludedCount: 0,
  truncated: false,
  emptyResultMessage: undefined,
};

describe('ChecklistTool — character-style rendering (UX-2 #19)', () => {
  it('renders character-style text in a <span className="usfm_nd">, not as literal "(\\nd ...)"', () => {
    render(
      <ChecklistTool
        data={baseData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
      />,
    );

    const lord = screen.getByText('Lord');
    expect(lord.className).toContain('usfm_nd');
    expect(lord.getAttribute('data-character-style')).toBe('nd');
    // Negative assertion: no parenthesised "(\nd Lord)" text anywhere — that was the old behavior.
    expect(screen.queryByText((text) => text.includes('(\\nd'))).toBeNull();
  });

  it('renders plain text items in a neutral foreground span (no usfm class)', () => {
    render(
      <ChecklistTool
        data={baseData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
      />,
    );

    // RTL's getByText normalizes whitespace by default, so match the trimmed text.
    const planted = screen.getByText('planted.');
    expect(planted.className).not.toMatch(/usfm_/);
    // The neutral span should still carry the tw-text-foreground class (not a usfm_* class).
    expect(planted.className).toContain('tw-text-foreground');
  });
});

describe('ChecklistTool — match-row coloring (UX-2 #15)', () => {
  it('applies a subtle tw-bg-primary/20 tint to the row <tr> when row.isMatch is true', () => {
    // The first fix attempt (3b8b99b8c2) put the bg on inner cell containers and tried to bleed
    // it past TableCell's `tw-p-4` with negative margins — visually the bg only covered the
    // text area, not the full cell rectangle (Rolf-reported). This iteration applies the bg
    // class to the `<tr>` via DataTable's `getRowClassName` prop, so every `<td>` inherits the
    // tint via the row-level paint. tw-bg-primary/20 (down from /30) reads as a subtle hint
    // without competing with content. No text-color override — inner spans keep their default
    // colors so contrast stays readable in both light and dark modes.
    const matchRowData: ChecklistData = {
      ...baseData,
      rows: [makeRow({ isMatch: true })],
    };
    render(
      <ChecklistTool
        data={matchRowData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
        onGotoLinkClick={() => {}}
      />,
    );

    // The bg is on the `<tr>` itself (via DataTable's getRowClassName). We locate the row by
    // walking up from the reference cell's testid (the cell content lives inside that row).
    const refCell = screen.getByTestId('checklist-reference-cell');
    const row = refCell.closest('tr');
    expect(row).not.toBeNull();
    expect(row?.className).toContain('tw-bg-primary/20');
    // The inner cell content should NOT carry the bg (single source of truth — the row).
    expect(refCell.className).not.toContain('tw-bg-primary');
    // And the obsolete text-color override from WP2 should be absent everywhere.
    expect(row?.className).not.toContain('tw-text-primary-foreground');
    expect(refCell.className).not.toContain('tw-text-primary-foreground');
  });

  it('does NOT apply tw-bg-primary/20 to the row <tr> when row.isMatch is false', () => {
    render(
      <ChecklistTool
        data={baseData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
        onGotoLinkClick={() => {}}
      />,
    );

    const refCell = screen.getByTestId('checklist-reference-cell');
    const row = refCell.closest('tr');
    expect(row).not.toBeNull();
    expect(row?.className).not.toContain('tw-bg-primary');
    expect(refCell.className).not.toContain('tw-bg-primary');
  });
});

describe('ChecklistTool — verse-number goto links (UX-2 #16)', () => {
  it('renders verse items as buttons when onGotoLinkClick is provided', () => {
    const onGotoLinkClick = vi.fn();
    render(
      <ChecklistTool
        data={baseData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
        onGotoLinkClick={onGotoLinkClick}
      />,
    );

    const verseBtn = screen.getByTestId('checklist-verse-goto');
    expect(verseBtn.tagName).toBe('BUTTON');
  });

  it('calls onGotoLinkClick with the reconstructed "GEN 2:5" verse ref when clicked', async () => {
    const onGotoLinkClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ChecklistTool
        data={baseData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
        onGotoLinkClick={onGotoLinkClick}
      />,
    );

    await user.click(screen.getByTestId('checklist-verse-goto'));
    expect(onGotoLinkClick).toHaveBeenCalledTimes(1);
    expect(onGotoLinkClick.mock.calls[0][1]).toBe('GEN 2:5');
  });

  it('falls back to plain <sup> when no onGotoLinkClick is provided', () => {
    render(
      <ChecklistTool
        data={baseData}
        isLoading={false}
        hideMatches={false}
        showVerseText
        onHideMatchesChange={() => {}}
        onShowVerseTextChange={() => {}}
      />,
    );

    expect(screen.queryByTestId('checklist-verse-goto')).toBeNull();
    // The verse number still renders as text — it's now a plain superscript.
    expect(screen.getByText('5').tagName).toBe('SUP');
  });
});
