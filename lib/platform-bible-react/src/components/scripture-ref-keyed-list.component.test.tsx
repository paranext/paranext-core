import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScriptureRefKeyedList from '@/components/scripture-ref-keyed-list.component';
import ResultsSource from './results-source.class';

describe('ScriptureRefKeyedList', () => {
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

  describe('renders correctly when table headers are displayed', () => {
    const { getByText, getByTitle, getByRole } = render(
      <ScriptureRefKeyedList
        sources={sources}
        typeColumnName={checkTypeHeader}
        detailsColumnName={errorDetailsTypeHeader}
        showColumnHeaders
        showSourceColumn
      />,
    );
    it('renders headers', () => {
      const scrRefHeaderElement = getByText('Scripture Reference');
      const scrRefButton = getByTitle('Toggle grouping by Scripture Reference');
      expect(scrRefHeaderElement).toBe(scrRefButton.parentNode);
      const checkTypeHeaderElement = getByText(checkTypeHeader);
      const checkTypeButton = getByTitle('Toggle grouping by Check Type');
      expect(checkTypeHeaderElement).toBe(checkTypeButton.parentNode);
      const headerRow = scrRefHeaderElement.closest('tr');
      expect(headerRow).toBe(checkTypeHeaderElement.closest('tr'));
      expect(headerRow).toBe(getByText(errorDetailsTypeHeader).closest('tr'));
    });

    it('renders body with no grouping', () => {
      const table = getByRole('table');
      const body = table.lastElementChild;
      if (!body) {
        throw new Error('The table does have any child elements.');
      }

      expect(body.outerHTML).toMatch(/^<tbody>/);
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

  it('Omits Check Type header by default', () => {
    const { queryByText, queryByTitle } = render(
      <ScriptureRefKeyedList
        sources={sources}
        typeColumnName={checkTypeHeader}
        detailsColumnName={errorDetailsTypeHeader}
        showColumnHeaders
      />,
    );
    expect(queryByText('Scripture Reference')).toBeDefined();
    expect(queryByTitle('Toggle grouping by Scripture Reference')).toBeDefined();
    expect(queryByText(checkTypeHeader)).toBeNull();
    expect(queryByTitle('Toggle grouping by Check Type')).toBeNull();
    expect(queryByText(errorDetailsTypeHeader)).toBeDefined();
  });

  it('Shows grouping drop-down instead of headers by default', () => {
    const { getByRole, getByText } = render(
      <ScriptureRefKeyedList
        sources={sources}
        typeColumnName={checkTypeHeader}
        detailsColumnName={errorDetailsTypeHeader}
      />,
    );
    const dropDown = getByRole('combobox');
    expect(dropDown.childElementCount).toBe(5);
    const noGroupingOption = getByText('No Grouping');
    expect(noGroupingOption.attributes.getNamedItem('value')?.value).toBe('[]');
    const groupByScrBookOption = getByText('Group by Scripture Book');
    expect(groupByScrBookOption.attributes.getNamedItem('value')?.value).toBe('["scrBook"]');
    const groupByCheckTypeOption = getByText(`Group by ${checkTypeHeader}`);
    expect(groupByCheckTypeOption.attributes.getNamedItem('value')?.value).toBe('["source"]');
    const groupByScrBookAndCheckTypeOption = getByText(
      `Group by Scripture Book and ${checkTypeHeader}`,
    );
    expect(groupByScrBookAndCheckTypeOption.attributes.getNamedItem('value')?.value).toBe(
      '["scrBook","source"]',
    );
    const groupByCheckTypeAndScrBookOption = getByText('Group by Check Type and Scripture Book');
    expect(groupByCheckTypeAndScrBookOption.attributes.getNamedItem('value')?.value).toBe(
      '["source","scrBook"]',
    );
    expect(dropDown.childNodes[0]).toBe(noGroupingOption);
    expect(dropDown.childNodes[1]).toBe(groupByScrBookOption);
    expect(dropDown.childNodes[2]).toBe(groupByCheckTypeOption);
    expect(dropDown.childNodes[3]).toBe(groupByScrBookAndCheckTypeOption);
    expect(dropDown.childNodes[4]).toBe(groupByCheckTypeAndScrBookOption);

    const table = getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.innerHTML).not.toMatch(/<thead/);
    expect(table.innerHTML).toMatch(/<tbody/);
  });
});
