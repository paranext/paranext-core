import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScriptureRefKeyedList from '@/components/scripture-ref-keyed-list.component';
import ResultsSource from './results-source.class';

describe('ScriptureRefKeyedList with all three column headers (showing Check Type/source column)', () => {
  const repeatedWordsCheck = { id: 'testCheck1', displayName: 'Repeated Words' };
  const markersCheck = { id: 'testCheck2', displayName: 'Markers' };
  const quotationsCheck = { id: 'testCheck3', displayName: 'Quotations' };
  const frogRepeatedError = "Word 'frog' repeated twice";
  const unknownMarkerError = 'Undefined marker';
  const unclosedMarkerError = 'Marker not closed';
  const missingEndQuote = 'First-level quote opened but never closed';
  const checkTypeHeader = 'Check Type';
  const errorDetailsTypeHeader = 'Error Details';
  const textAnchor = { jsonPath: '', offset: 3 };

  const sources = [
    new ResultsSource(
      [
        {
          start: { bookNum: 1, chapterNum: 1, verseNum: 1, ...textAnchor },
          detail: frogRepeatedError,
        },
      ],
      undefined,
      repeatedWordsCheck,
    ),
    new ResultsSource(
      [
        {
          start: { bookNum: 2, chapterNum: 2, verseNum: 3, ...textAnchor },
          detail: unknownMarkerError,
        },
        {
          start: { bookNum: 66, chapterNum: 10, verseNum: 15, ...textAnchor },
          detail: unclosedMarkerError,
        },
      ],
      undefined,
      markersCheck,
    ),
    new ResultsSource(
      [
        {
          start: { bookNum: 40, chapterNum: 20, verseNum: 1, ...textAnchor },
          detail: missingEndQuote,
        },
      ],
      undefined,
      quotationsCheck,
    ),
  ];

  beforeEach(() => {
    render(
      <ScriptureRefKeyedList
        sources={sources}
        typeColumnName={checkTypeHeader}
        detailsColumnName={errorDetailsTypeHeader}
        showColumnHeaders
        showSourceColumn
      />,
    );
  });

  it('should render column headers', () => {
    const scrRefHeaderElement = screen.getByText('Scripture Reference');
    const scrRefButton = screen.getByTitle('Toggle grouping by Scripture Reference');
    expect(scrRefHeaderElement).toBe(scrRefButton.parentNode);
    const checkTypeHeaderElement = screen.getByText(checkTypeHeader);
    const checkTypeButton = screen.getByTitle('Toggle grouping by Check Type');
    expect(checkTypeHeaderElement).toBe(checkTypeButton.parentNode);
    const headerRow = scrRefHeaderElement.closest('tr');
    expect(headerRow).toBe(checkTypeHeaderElement.closest('tr'));
    expect(headerRow).toBe(screen.getByText(errorDetailsTypeHeader).closest('tr'));
  });

  it('should render body with no grouping', () => {
    const table = screen.getByRole('table');
    if (!table) {
      throw new Error('The table is missing.');
    }
    const body = table.lastElementChild;
    if (!body) {
      throw new Error('The table does have any child elements.');
    }

    expect(body.outerHTML).toMatch(/^<tbody>/);
    expect(body.childElementCount).toBe(4);
    const children = Array.from(body?.childNodes);
    children.forEach((child) => {
      expect(child).toBeDefined();
      expect(child.childNodes.length).toBe(3);
      const cellScrRef = child.childNodes[0];
      if (!(cellScrRef instanceof HTMLElement))
        throw new Error('Each row should have three td elements');
      expect(cellScrRef).toHaveClass('scrRef');
      const cellSource = child.childNodes[1];
      if (!(cellSource instanceof HTMLElement))
        throw new Error('Each row should have three td elements');
      expect(cellSource).toHaveClass('source');
      const cellDetails = child.childNodes[2];
      if (!(cellDetails instanceof HTMLElement))
        throw new Error('Each row should have three td elements');
      expect(cellDetails).toHaveClass('details');
    });
  });
});
