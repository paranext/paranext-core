// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  DOWNLOADING_KEY,
  FAILED_KEY,
  UNAVAILABLE_KEY,
  ResourceCellView,
} from './resource-cell-view.component';

const localizedStrings = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [DOWNLOADING_KEY]: 'Downloading…',
  [FAILED_KEY]: 'Download failed',
};

/** Renders cells in a plain div wrapper — ResourceCellView is now presentational, no role needed. */
function renderCells(cells: React.ReactNode) {
  return render(<div>{cells}</div>);
}

describe('ResourceCellView row smoke', () => {
  it('partial failure: ready, failed, and downloading cells render independently', () => {
    renderCells(
      <>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="failed"
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
        <ResourceCellView
          state="downloading"
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </>,
    );

    // Each resource's label text is visible in its header.
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.getByText('ASV')).toBeInTheDocument();
    expect(screen.getByText('KJV')).toBeInTheDocument();

    // No gridcell role — ResourceCellView is now purely presentational.
    expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

    // Content renders per state.
    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('Download failed')).toBeInTheDocument();
    expect(screen.getByText('Downloading…')).toBeInTheDocument();
    // Both failed and downloading cells show "Resource unavailable" as the primary status text.
    expect(screen.getAllByText('Resource unavailable')).toHaveLength(2);
  });

  it('mixed direction: LTR and RTL cells apply independent dir', () => {
    const { container } = renderCells(
      <>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="ready"
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>אַשְׁרֵי הָאִישׁ</span>}
        />
        <ResourceCellView
          state="ready"
          label="العربية"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>طُوبَى لِلْمَسَاكِينِ</span>}
        />
      </>,
    );

    // No gridcell role — purely presentational.
    expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

    // Scope the direction counts to the rendered subtree (not the whole document).
    expect(container.querySelectorAll('[dir="ltr"]')).toHaveLength(1);
    expect(container.querySelectorAll('[dir="rtl"]')).toHaveLength(2);

    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('אַשְׁרֵי הָאִישׁ')).toBeInTheDocument();
    expect(screen.getByText('طُوبَى لِلْمَسَاكِينِ')).toBeInTheDocument();
  });
});

describe('ResourceCellView name display', () => {
  it('inline mode hangs the name before the verse text in reading order', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'NIV' });
    // Name precedes the verse text in DOM (reading) order — assert via text order in the cell.
    const text = cell.textContent ?? '';
    expect(text.indexOf('NIV')).toBeGreaterThanOrEqual(0);
    expect(text.indexOf('NIV')).toBeLessThan(text.indexOf('In the beginning'));
  });

  it('inline mode puts the name and verse text in one row (name beside text, not a header band)', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'NIV' });
    const name = within(cell).getByText('NIV');
    const verse = within(cell).getByText('In the beginning');
    const row = name.parentElement;
    // Inline: an intermediate flex row wraps the name + content, so the row is NOT the gridcell.
    expect(row).not.toBe(cell);
    expect(row).toContainElement(verse);
  });

  it('inline mode applies the resource dir to the row and puts the name first (inline-start)', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>אַשְׁרֵי</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'עברית' });
    const name = within(cell).getByText('עברית');
    const row = name.parentElement;
    expect(row).toHaveAttribute('dir', 'rtl');
    // Name is the first child; flex + dir=rtl place it on the inline-start (visually right).
    expect(row?.firstElementChild).toBe(name);
  });

  it('inline mode still shows the name while downloading', () => {
    renderGridRow(
      <ResourceCellView
        state="downloading"
        label="KJV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'KJV' });
    expect(within(cell).getByText('KJV')).toBeInTheDocument();
    expect(within(cell).getByText('Downloading…')).toBeInTheDocument();
  });

  it('the visible name is aria-hidden so the gridcell name is not announced twice', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'NIV' });
    expect(cell).toHaveAttribute('aria-label', 'NIV');
    expect(within(cell).getByText('NIV')).toHaveAttribute('aria-hidden', 'true');
  });

  it('defaults to header display: the name is a band directly under the gridcell', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>Blessed</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    const name = within(cell).getByText('WEB');
    // Header mode: no intermediate row — the name band is a direct child of the gridcell.
    expect(name.parentElement).toBe(cell);
  });
});
