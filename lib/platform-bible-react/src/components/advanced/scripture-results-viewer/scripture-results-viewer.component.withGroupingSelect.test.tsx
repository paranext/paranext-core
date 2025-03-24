import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ScriptureResultsViewer,
  ScriptureSrcItemDetail,
} from '@/components/advanced/scripture-results-viewer/scripture-results-viewer.component';

let lastSelectedItem: ScriptureSrcItemDetail | undefined;
let numberOfRowSelectsHandled: number = 0;

function RememberSelectedRow(item?: ScriptureSrcItemDetail) {
  lastSelectedItem = item;
  numberOfRowSelectsHandled += 1;
}

function EnsureHTMLElement(node: Node): HTMLElement {
  if (!(node instanceof HTMLElement))
    throw new Error('We checked this previously. This error is impossible.');
  return node;
}

describe('ScriptureResultsViewer default display mode (with combobox for grouping option)', () => {
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
        <ScriptureResultsViewer
          sources={sources}
          typeColumnName={checkTypeHeader}
          detailsColumnName={errorDetailsTypeHeader}
          onRowSelected={RememberSelectedRow}
        />,
      );
    });
  });

  // TODO (https://github.com/paranext/paranext-core/issues/923) More unit tests needed.
  // it should show grouping drop-down when clicked
  // it should change the grouping option to the selected one

  it('should not have column headers in the table', () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.innerHTML).not.toMatch(/<thead/);
  });

  it('should have the rows sorted canonically', () => {
    const table = screen.getByRole('table');
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
      if (!(cellScrRef instanceof HTMLElement) || cellScrRef.nodeName.toUpperCase() !== 'TD')
        throw new Error('Each row should have two td elements');
      expect(cellScrRef).toHaveClass('scrRef');
      const cellDetails = child.childNodes[1];
      if (!(cellDetails instanceof HTMLElement) || cellScrRef.nodeName.toUpperCase() !== 'TD')
        throw new Error('Each row should have two td elements');
      expect(cellDetails).toHaveClass('details');
    });

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(body.childElementCount);

    rows.forEach((row) => {
      expect(row.className).toMatch(/\bbanded-row\b/);
    });

    const [firstRow, secondRow, thirdRow, fourthRow] = rows;

    // UX has now said they don't think they want banding. I'm leaving in the code to
    // set even and odd styles, but there's nothing in the CSS to style them differently.

    let [scrRefCell, detailsCell] = firstRow.childNodes;
    expect(firstRow.className).toMatch(/\beven\b/);
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('GEN 1:1');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(frogRepeatedError);

    [scrRefCell, detailsCell] = secondRow.childNodes;
    expect(secondRow.className).toMatch(/\bodd\b/);
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('EXO 2:3');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(unknownMarkerError);

    [scrRefCell, detailsCell] = thirdRow.childNodes;
    expect(firstRow.className).toMatch(/\beven\b/);
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('MAT 20:1');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(missingEndQuote);

    [scrRefCell, detailsCell] = fourthRow.childNodes;
    expect(secondRow.className).toMatch(/\bodd\b/);
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('REV 10:15');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(unclosedMarkerError);
  });

  it('Selects a detail row when clicked', () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const firstRow = screen.getByText(frogRepeatedError).closest('tr');
    expect(firstRow).toBeInTheDocument();

    if (!firstRow) throw new Error('First row is null');

    const dataState = firstRow.attributes.getNamedItem('data-state');
    expect(dataState?.value).toBe('');

    // Simulate clicking the first row
    fireEvent.click(firstRow);

    // Check if the row is selected
    // Assuming there's a class or attribute change on selection
    // Replace 'selected' with the actual class or attribute used
    expect(dataState?.value).toBe('selected');

    expect(numberOfRowSelectsHandled).toBe(1);
    expect(lastSelectedItem?.source).toBe(sources[0].source);
    expect(lastSelectedItem?.detail).toBe(sources[0].data[0].detail);
    expect(lastSelectedItem?.start).toBe(sources[0].data[0].start);
    expect(lastSelectedItem?.end).toBeUndefined();
  });
});
