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

    const container = screen.getByText('WEB').closest('div')?.parentElement;
    const ltrDirs = document.querySelectorAll('[dir="ltr"]');
    const rtlDirs = document.querySelectorAll('[dir="rtl"]');
    expect(ltrDirs).toHaveLength(1);
    expect(rtlDirs).toHaveLength(2);

    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('אַשְׁרֵי הָאִישׁ')).toBeInTheDocument();
    expect(screen.getByText('طُوبَى لِلْمَسَاكِينِ')).toBeInTheDocument();
    // Suppress unused variable lint
    expect(container).toBeDefined();
  });
});
