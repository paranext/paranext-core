// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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
