// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import {
  DOWNLOADING_KEY,
  EMPTY_KEY,
  FAILED_KEY,
  UNAVAILABLE_KEY,
  ResourceCellView,
} from './resource-cell-view.component';

const localizedStrings = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [DOWNLOADING_KEY]: 'Downloading…',
  [FAILED_KEY]: 'Download failed',
  [EMPTY_KEY]: 'No text for this verse',
};

function renderGridRow(cells: React.ReactNode) {
  return render(
    <div role="grid" aria-label="Scripture text grid test">
      <div role="row">{cells}</div>
    </div>,
  );
}

describe('ResourceCellView row smoke', () => {
  it('partial failure: ready, failed, and downloading cells render independently in one row', () => {
    renderGridRow(
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

    const row = screen.getByRole('row');
    const cells = within(row).getAllByRole('gridcell');
    expect(cells).toHaveLength(3);

    const webCell = screen.getByRole('gridcell', { name: 'WEB' });
    expect(within(webCell).getByText('Blessed are the poor in spirit')).toBeInTheDocument();

    const asvCell = screen.getByRole('gridcell', { name: 'ASV' });
    expect(within(asvCell).getByText('Download failed')).toBeInTheDocument();

    const kjvCell = screen.getByRole('gridcell', { name: 'KJV' });
    expect(within(kjvCell).getByText('Downloading…')).toBeInTheDocument();
    expect(within(kjvCell).getByText('Resource unavailable')).toBeInTheDocument();

    // Ready cell still shows content when a neighbor is offline.
    expect(within(webCell).queryByText('Download failed')).not.toBeInTheDocument();
  });

  it('mixed direction: LTR and RTL cells apply independent dir in one row', () => {
    renderGridRow(
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

    const row = screen.getByRole('row');
    expect(within(row).getAllByRole('gridcell')).toHaveLength(3);

    const ltrDirs = row.querySelectorAll('[dir="ltr"]');
    const rtlDirs = row.querySelectorAll('[dir="rtl"]');
    expect(ltrDirs).toHaveLength(1);
    expect(rtlDirs).toHaveLength(2);

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

  it('inline mode scopes the row to the resource dir and puts the name first in DOM order', () => {
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
    // Name is first in DOM order; combined with `dir="rtl"` + flex (which jsdom does not lay out)
    // this renders on the inline-start. Visual placement is verified in Storybook, not here.
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

  it('inline mode still shows the name when the download failed', () => {
    renderGridRow(
      <ResourceCellView
        state="failed"
        label="ASV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'ASV' });
    expect(within(cell).getByText('ASV')).toBeInTheDocument();
    expect(within(cell).getByText('Download failed')).toBeInTheDocument();
  });

  it('inline mode still shows the name for an empty verse', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        isVerseEmpty
        editor={undefined}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    expect(within(cell).getByText('WEB')).toBeInTheDocument();
    expect(within(cell).getByText('No text for this verse')).toBeInTheDocument();
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
    // Header mode routes through the same helper, so it inherits the aria-hidden non-duplication.
    expect(name).toHaveAttribute('aria-hidden', 'true');
  });
});
