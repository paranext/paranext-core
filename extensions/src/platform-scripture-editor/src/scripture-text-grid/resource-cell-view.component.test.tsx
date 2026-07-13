// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    const { container } = renderCells(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    // Name precedes the verse text in DOM (reading) order — assert via text order in the subtree.
    const text = container.textContent ?? '';
    expect(text.indexOf('NIV')).toBeGreaterThanOrEqual(0);
    expect(text.indexOf('NIV')).toBeLessThan(text.indexOf('In the beginning'));
  });

  it('inline mode puts the name and verse text in one row (name beside text, not a header band)', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const name = screen.getByText('NIV');
    const verse = screen.getByText('In the beginning');
    // Inline: an intermediate flex row wraps the name + content beside each other.
    const row = name.parentElement;
    expect(row).toContainElement(verse);
  });

  it('inline mode scopes the row to the resource dir and puts the name first in DOM order', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>אַשְׁרֵי</span>}
      />,
    );
    const name = screen.getByText('עברית');
    const row = name.parentElement;
    expect(row).toHaveAttribute('dir', 'rtl');
    // Name is first in DOM order; combined with `dir="rtl"` + flex (which jsdom does not lay out)
    // this renders on the inline-start. Visual placement is verified in Storybook, not here.
    expect(row?.firstElementChild).toBe(name);
  });

  it('inline mode still shows the name while downloading', () => {
    renderCells(
      <ResourceCellView
        state="downloading"
        label="KJV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    expect(screen.getByText('KJV')).toBeInTheDocument();
    expect(screen.getByText('Downloading…')).toBeInTheDocument();
  });

  it('inline mode still shows the name when the download failed', () => {
    renderCells(
      <ResourceCellView
        state="failed"
        label="ASV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    expect(screen.getByText('ASV')).toBeInTheDocument();
    expect(screen.getByText('Download failed')).toBeInTheDocument();
  });

  it('inline mode still shows the name for an empty verse', () => {
    renderCells(
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
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.getByText('No text for this verse')).toBeInTheDocument();
  });

  it('the visible name is aria-hidden so the parent listitem name is not announced twice', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    // ResourceCellView is presentational (no role/aria-label of its own); the parent verse
    // `listitem` owns the accessible name, so the visible copy must be hidden from the a11y tree.
    expect(screen.getByText('NIV')).toHaveAttribute('aria-hidden', 'true');
  });

  it('defaults to header display: the name band is a direct child of the cell root', () => {
    const { container } = renderCells(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>Blessed</span>}
      />,
    );
    // The cell root is the presentational div ResourceCellView renders (our wrapper's only child).
    const cell = container.firstElementChild?.firstElementChild;
    const name = screen.getByText('WEB');
    // Header mode: no intermediate row — the name band is a direct child of the cell root.
    expect(name.parentElement).toBe(cell);
    // Header mode routes through the same helper, so it inherits the aria-hidden non-duplication.
    expect(name).toHaveAttribute('aria-hidden', 'true');
  });
});
