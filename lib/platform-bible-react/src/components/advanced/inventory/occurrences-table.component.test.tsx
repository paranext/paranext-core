// @vitest-environment jsdom
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import {
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  ContentZoomTextProvider,
} from '@/context/content-zoom-text.context';
import { OccurrencesTable } from './occurrences-table.component';

const OCCURRENCES = [
  { reference: { book: 'GEN', chapterNum: 1, verseNum: 1 }, text: 'In the \\\\beginning\\\\ God' },
];
const STRINGS = {
  '%webView_inventory_occurrences_table_header_reference%': 'Reference',
  '%webView_inventory_occurrences_table_header_occurrence%': 'Occurrence',
};

function renderTable(withProvider: boolean) {
  const table = (
    <OccurrencesTable
      occurrenceData={OCCURRENCES}
      setScriptureReference={vi.fn()}
      localizedStrings={STRINGS}
      classNameForText="scripture-font"
    />
  );
  return render(withProvider ? <ContentZoomTextProvider>{table}</ContentZoomTextProvider> : table);
}

describe('OccurrencesTable content zoom', () => {
  it('marks only the occurrence text cell inside a provider', () => {
    const { container } = renderTable(true);
    const [referenceCell, textCell] = container.querySelectorAll('tbody td');
    expect(textCell).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, '');
    expect(referenceCell).not.toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE);
    // Headers are controls: exactly one marker in the whole table.
    expect(container.querySelectorAll(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`)).toHaveLength(1);
  });

  it('marks nothing outside a provider', () => {
    const { container } = renderTable(false);
    expect(container.querySelectorAll(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`)).toHaveLength(0);
  });
});
