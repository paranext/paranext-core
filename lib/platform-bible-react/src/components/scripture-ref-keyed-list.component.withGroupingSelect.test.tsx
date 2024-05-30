import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScriptureRefKeyedList, {
  ScriptureSrcItemDetail,
} from '@/components/scripture-ref-keyed-list.component';
import ResultsSource from './results-source.class';

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

describe('ScriptureRefKeyedList default display mode (with combobox for grouping option)', () => {
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
        onRowSelected={RememberSelectedRow}
      />,
    );
  });

  it('should show grouping drop-down', () => {
    const dropDown = screen.getByRole('combobox');
    expect(dropDown.childElementCount).toBe(5);
    const noGroupingOption = screen.getByText('No Grouping');
    expect(noGroupingOption.attributes.getNamedItem('value')?.value).toBe('[]');
    const groupByScrBookOption = screen.getByText('Group by Scripture Book');
    expect(groupByScrBookOption.attributes.getNamedItem('value')?.value).toBe('["scrBook"]');
    const groupByCheckTypeOption = screen.getByText(`Group by ${checkTypeHeader}`);
    expect(groupByCheckTypeOption.attributes.getNamedItem('value')?.value).toBe('["source"]');
    const groupByScrBookAndCheckTypeOption = screen.getByText(
      `Group by Scripture Book and ${checkTypeHeader}`,
    );
    expect(groupByScrBookAndCheckTypeOption.attributes.getNamedItem('value')?.value).toBe(
      '["scrBook","source"]',
    );
    const groupByCheckTypeAndScrBookOption = screen.getByText(
      'Group by Check Type and Scripture Book',
    );
    expect(groupByCheckTypeAndScrBookOption.attributes.getNamedItem('value')?.value).toBe(
      '["source","scrBook"]',
    );
    expect(dropDown.childNodes[0]).toBe(noGroupingOption);
    // Use a type guard to ensure the element is an HTMLSelectElement
    if (dropDown instanceof HTMLSelectElement) {
      // Check the default selected option
      // eslint-disable-next-line jest/no-conditional-expect
      expect(dropDown.selectedIndex).toBe(0);
    } else {
      throw new Error('Drop-down is not an HTMLSelectElement');
    }
    expect(dropDown.childNodes[1]).toBe(groupByScrBookOption);
    expect(dropDown.childNodes[2]).toBe(groupByCheckTypeOption);
    expect(dropDown.childNodes[3]).toBe(groupByScrBookAndCheckTypeOption);
    expect(dropDown.childNodes[4]).toBe(groupByCheckTypeAndScrBookOption);
  });

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
    expect(table.innerHTML).toMatch(/<tbody/);
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

    const [firstRow, secondRow, thirdRow, fourthRow] = rows;

    let [scrRefCell, detailsCell] = firstRow.childNodes;
    expect(firstRow.className).toBe('banded-row-even');
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('GEN 1:1');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(frogRepeatedError);

    [scrRefCell, detailsCell] = secondRow.childNodes;
    expect(secondRow.className).toBe('banded-row-odd');
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('EXO 2:3');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(unknownMarkerError);

    [scrRefCell, detailsCell] = thirdRow.childNodes;
    expect(thirdRow.className).toBe('banded-row-even');
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('MAT 20:1');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(missingEndQuote);

    [scrRefCell, detailsCell] = fourthRow.childNodes;
    expect(fourthRow.className).toBe('banded-row-odd');
    expect(EnsureHTMLElement(scrRefCell).innerHTML).toBe('REV 10:15');
    expect(EnsureHTMLElement(detailsCell).innerHTML).toBe(unclosedMarkerError);
  });

  it('Selects a detail row when clicked', () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const firstRow = screen.getByText(frogRepeatedError).closest('tr');
    expect(firstRow).toBeInTheDocument();

    if (!firstRow) throw new Error('First row is null');

    // Simulate clicking the first row
    fireEvent.click(firstRow);

    // Check if the row is selected
    // Assuming there's a class or attribute change on selection
    // Replace 'selected' with the actual class or attribute used
    expect(firstRow).toHaveClass('selected');

    expect(numberOfRowSelectsHandled).toBe(1);
    expect(lastSelectedItem?.source).toBe(sources[0].checkDefinition);
    expect(lastSelectedItem?.detail).toBe(sources[0].data[0].detail);
    expect(lastSelectedItem?.start).toBe(sources[0].data[0].start);
    expect(lastSelectedItem?.end).toBe(sources[0].data[0].end);
  });
});
