// @vitest-environment jsdom
// G7 (M5): regression coverage for the contextual sense preview + relevant-sense badge that
// replaced the old first-sense.definition lookup. PT9 ref: DictionaryTab.cs:283-284 relevantString
// (`<span class='relevantCount'>+N</span>`).
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DictionaryDisplayItem,
  type DictionaryDisplayItemData,
} from './dictionary-display-item.component';

const BASE_ITEM: DictionaryDisplayItemData = {
  tokenId: 'tok-1',
  entryId: 'אֱלֹהִים',
  sourceText: 'אֱלֹהִים',
  translit: 'ʾĕlōhîm',
  relevantSenseIndices: [0],
  firstRelevantSensePreview: 'The supreme deity of Israel; the one true God.',
};

const localizedStrings = {
  '%enhancedResources_dictionary_additionalRelevantSenses%':
    '{count} additional relevant senses for this word',
};

describe('DictionaryDisplayItem', () => {
  it('renders firstRelevantSensePreview as the body preview', () => {
    render(<DictionaryDisplayItem item={BASE_ITEM} />);
    expect(screen.getByText('The supreme deity of Israel; the one true God.')).toBeInTheDocument();
  });

  it('does not render preview when firstRelevantSensePreview is empty', () => {
    render(<DictionaryDisplayItem item={{ ...BASE_ITEM, firstRelevantSensePreview: '' }} />);
    expect(screen.queryByText(/supreme deity/)).not.toBeInTheDocument();
  });

  it('does NOT render the +N badge when there is exactly one relevant sense', () => {
    render(<DictionaryDisplayItem item={BASE_ITEM} />);
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });

  it('does NOT render the +N badge when there are zero relevant senses', () => {
    render(
      <DictionaryDisplayItem
        item={{ ...BASE_ITEM, relevantSenseIndices: [], firstRelevantSensePreview: '' }}
      />,
    );
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });

  it('renders +N badge when relevantSenseIndices.length > 1 (PT9 relevantString parity)', () => {
    render(
      <DictionaryDisplayItem
        item={{ ...BASE_ITEM, relevantSenseIndices: [0, 2, 4] }}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />,
    );
    // 3 relevant senses => +2 additional beyond the first.
    const badge = screen.getByText('+2');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('title', '2 additional relevant senses for this word');
  });

  it('renders the source-text button with the lemma text', () => {
    render(<DictionaryDisplayItem item={BASE_ITEM} />);
    // The button's accessible name is the localized aria-label; assert that the lemma
    // is rendered as button text content (regardless of which fallback the aria-label uses).
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('אֱלֹהִים');
  });
});
