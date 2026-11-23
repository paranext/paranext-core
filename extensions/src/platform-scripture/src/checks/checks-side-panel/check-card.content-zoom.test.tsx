// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { CheckRunResult } from 'platform-scripture';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CheckCard, CheckStates } from './check-card.component';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
});

const VERSE_REF = { book: 'GEN', chapterNum: 1, verseNum: 3 };
const RESULT: CheckRunResult = {
  checkId: 'repeatedWords',
  checkResultType: 'repeatedWords',
  projectId: 'P1',
  verseText: '',
  itemText: 'light light',
  messageFormatString: 'Repeated word "{word}"',
  isDenied: false,
  verseRef: VERSE_REF,
  start: VERSE_REF,
  end: VERSE_REF,
};

describe('CheckCard content zoom', () => {
  it('marks only the item text; reference, description and badges stay fixed', () => {
    const { container, getByText } = render(
      <CheckCard
        localizedStrings={{}}
        checkResult={RESULT}
        checkId="repeatedWords"
        isSelected
        checkState={CheckStates.Checking}
        handleSelectCheck={vi.fn()}
        handleAllowCheck={vi.fn(async () => true)}
        handleDenyCheck={vi.fn(async () => true)}
        checkCardDescription="Repeated word description"
        handleOpenSettingsAndInventories={vi.fn()}
        showBadge
        checkName="Repeated words"
      />,
    );
    const markers = container.querySelectorAll(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`);
    expect(markers).toHaveLength(1);
    expect(markers[0]).toHaveTextContent('light light');
    expect(markers[0]).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, '');
    expect(
      getByText('Repeated word description').closest(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`),
    ).toBeNull();
  });
});
