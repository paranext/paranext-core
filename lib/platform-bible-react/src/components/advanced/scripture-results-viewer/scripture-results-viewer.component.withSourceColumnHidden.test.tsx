import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScriptureResultsViewer } from '@/components/advanced/scripture-results-viewer/scripture-results-viewer.component';

describe('ScriptureResultsViewer with only Scripture ref and details columns', () => {
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
    {
      source: repeatedWordsCheck,
      data: [
        {
          start: { book: 'GEN', chapterNum: 1, verseNum: 1, ...textAnchor },
          detail: frogRepeatedError,
        },
      ],
    },
    {
      source: markersCheck,
      data: [
        {
          start: { book: 'EXO', chapterNum: 2, verseNum: 3, ...textAnchor },
          detail: unknownMarkerError,
        },
        {
          start: { book: 'REV', chapterNum: 10, verseNum: 15, ...textAnchor },
          detail: unclosedMarkerError,
        },
      ],
    },
    {
      source: quotationsCheck,
      data: [
        {
          start: { book: 'MAT', chapterNum: 20, verseNum: 1, ...textAnchor },
          detail: missingEndQuote,
        },
      ],
    },
  ];

  beforeEach(async () => {
    await act(async () => {
      render(
        // By default, it should omit Check Type/source column
        <ScriptureResultsViewer
          sources={sources}
          typeColumnName={checkTypeHeader}
          detailsColumnName={errorDetailsTypeHeader}
          showColumnHeaders
        />,
      );
    });
  });

  it('should render the other headers', () => {
    expect(screen.queryByTitle('Toggle grouping by Scripture Reference')).toBeDefined();
    expect(screen.queryByText(checkTypeHeader)).toBeNull();
    expect(screen.queryByTitle('Toggle grouping by Check Type')).toBeNull();
    expect(screen.queryByText(errorDetailsTypeHeader)).toBeDefined();
  });

  it('should render the other cells in the body', () => {
    const table = screen.getByRole('table');
    if (!table) {
      throw new Error('The table is missing.');
    }
    const body = table.lastElementChild;
    if (!body) {
      throw new Error('The table does have any child elements.');
    }

    expect(body.outerHTML).toMatch(/^<tbody(.*<\/tbody)?>$/);
    expect(body.childElementCount).toBe(4);
    const children = Array.from(body?.childNodes);
    children.forEach((child) => {
      expect(child).toBeDefined();
      expect(child.childNodes.length).toBe(2);
      const cellScrRef = child.childNodes[0];
      if (!(cellScrRef instanceof HTMLElement))
        throw new Error('Each row should have two td elements');
      expect(cellScrRef).toHaveClass('scrRef');
      const cellDetails = child.childNodes[1];
      if (!(cellDetails instanceof HTMLElement))
        throw new Error('Each row should have two td elements');
      expect(cellDetails).toHaveClass('details');
    });
  });
});
