// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContentZoomTextProvider } from 'platform-bible-react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { DictionaryDisplayItem } from './dictionary-tab/dictionary-display-item.component';
import { DictionaryEntryDetail } from './dictionary-tab/dictionary-entry-detail.component';
import { EncyclopediaDisplayItem } from './encyclopedia-tab/encyclopedia-display-item.component';
import { EncyclopediaEntryDetail } from './encyclopedia-tab/encyclopedia-entry-detail.component';

const ENTRIES = '[data-platform-content-zoom-root="entries"]';

function renderInEntriesPanel(element: ReactElement) {
  return render(<ContentZoomTextProvider area="entries">{element}</ContentZoomTextProvider>);
}

function markedTexts(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll(ENTRIES)).map((e) => e.textContent ?? '');
}

function isMarked(container: HTMLElement, element: Element): boolean {
  return Array.from(container.querySelectorAll(ENTRIES)).some((m) => m.contains(element));
}

const dictionaryItem = {
  tokenId: 'tok-1',
  entryId: 'אֱלֹהִים',
  sourceText: 'אֱלֹהִים',
  translit: 'ʾĕlōhîm',
  relevantSenseIndices: [0, 1],
  firstRelevantSensePreview: 'God; gods',
};

const encyclopediaItem = {
  tokenId: 'tok-2',
  lemma: 'בְּכֹר',
  sourceText: 'beker',
  translit: 'beker',
  entries: [
    {
      articleId: 'a1',
      key: 'k1',
      title: 'Camel',
      teaserText: 'A large desert animal.',
      formatVersion: 1 as const,
    },
  ],
  imageIds: [],
  collection: 'FAUNA',
};

describe('Enhanced Resources entries mark their resource text inside the entries provider', () => {
  it('dictionary row: lemma, transliteration and gloss preview, not the +N badge', () => {
    const { container } = renderInEntriesPanel(<DictionaryDisplayItem item={dictionaryItem} />);
    expect(markedTexts(container)).toEqual(['אֱלֹהִים', 'ʾĕlōhîm', 'God; gods']);
    expect(isMarked(container, screen.getByText('+1'))).toBe(false);
  });

  it('dictionary detail: lemma, transliteration, definition and glosses, not the switch, headings, domains or links', () => {
    const { container } = renderInEntriesPanel(
      <DictionaryEntryDetail
        tokenId="tok-1"
        sourceText="אֱלֹהִים"
        transliteration="ʾĕlōhîm"
        senses={[
          {
            id: 's1',
            senseNumber: 1,
            definition: 'the true God',
            glosses: 'God',
            domains: [{ id: 'd1', label: 'Deity' }],
            isRelevant: true,
            occurrencesInAllBooksCount: 3,
          },
        ]}
      />,
    );
    expect(markedTexts(container)).toEqual(['אֱלֹהִים', '(ʾĕlōhîm)', 'the true God', 'God']);
    expect(isMarked(container, screen.getByRole('switch'))).toBe(false);
    expect(isMarked(container, screen.getByText('Deity'))).toBe(false);
    expect(isMarked(container, screen.getByText('1.'))).toBe(false);
    screen.getAllByRole('button').forEach((button) => {
      // Only the lemma's own link carries marked text inside it; no button is itself marked.
      expect(button.hasAttribute('data-platform-content-zoom-root')).toBe(false);
    });
  });

  it('encyclopedia row: transliteration, lemma and teaser', () => {
    const { container } = renderInEntriesPanel(<EncyclopediaDisplayItem item={encyclopediaItem} />);
    expect(markedTexts(container)).toEqual(['beker', 'בְּכֹר', 'A large desert animal.']);
  });

  it('encyclopedia detail: title and article paragraphs, not the View article link', () => {
    const { container } = renderInEntriesPanel(
      <EncyclopediaEntryDetail
        entry={encyclopediaItem.entries[0]}
        articleData={{
          articleId: 'a1',
          title: 'Camel',
          paragraphs: [
            { text: 'Camels carry loads.', verseLinks: [], abbreviations: [], inlineImageIds: [] },
          ],
          crossReferences: [],
          imageIds: [],
        }}
        onArticleLinkClick={() => {}}
      />,
    );
    expect(markedTexts(container)).toEqual(['Camel', 'Camels carry loads.']);
    expect(isMarked(container, screen.getByTestId('encyclopedia-article-link-a1'))).toBe(false);
  });

  it('marks nothing outside the provider (stories, the Semantic Domain dialog)', () => {
    const { container } = render(<DictionaryDisplayItem item={dictionaryItem} />);
    expect(container.querySelectorAll('[data-platform-content-zoom-root]')).toHaveLength(0);
  });
});
