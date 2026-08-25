// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Section } from 'platform-bible-utils';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import SectionButton from './section-button.component';
import { SelectBooksLocalizedStrings } from './select-books.types';

// Radix's tooltip measures its trigger via ResizeObserver, which jsdom does not ship. A no-op stub
// is enough — these tests assert what the button says and whether it is remounted, not layout.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

const localizedStrings: SelectBooksLocalizedStrings = {
  '%scripture_section_ot_short%': 'OT',
  '%scripture_section_nt_short%': 'NT',
  '%scripture_section_dc_short%': 'DC',
  '%scripture_section_extra_short%': 'Extra',
};

function renderSectionButton({
  availableBookIds,
  disabledExplanation,
}: {
  availableBookIds: string[];
  disabledExplanation?: string;
}) {
  const onToggle = vi.fn();
  const utils = render(
    <SectionButton
      section={Section.Extra}
      availableBookIds={availableBookIds}
      selectedBookIds={[]}
      onToggle={onToggle}
      localizedStrings={localizedStrings}
      disabledExplanation={disabledExplanation}
    />,
  );
  return { ...utils, onToggle };
}

describe('SectionButton — disabledExplanation', () => {
  test('Explains a disabled section on hover so it does not read as "this project has none"', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderSectionButton({
      availableBookIds: ['GEN'],
      disabledExplanation: "Find can't include extra material",
    });

    await user.hover(screen.getByRole('button', { name: 'Extra' }));

    expect(await screen.findAllByText("Find can't include extra material")).not.toHaveLength(0);
  });

  test('Says nothing extra when the section has books', () => {
    renderSectionButton({
      availableBookIds: ['GLO'],
      disabledExplanation: "Find can't include extra material",
    });

    expect(screen.getByRole('button', { name: 'Extra' })).toBeEnabled();
    expect(screen.queryByText("Find can't include extra material")).not.toBeInTheDocument();
  });

  // The wrapper's element type must depend only on whether an explanation was supplied. Keying it
  // on `isDisabled` instead swaps the element at this position when the section gains or loses its
  // books, remounting the Button and dropping keyboard focus mid-interaction.
  test('Keeps the same Button element across a disabled/enabled flip', () => {
    const { rerender } = render(
      <SectionButton
        section={Section.Extra}
        availableBookIds={['GEN']}
        selectedBookIds={[]}
        onToggle={vi.fn()}
        localizedStrings={localizedStrings}
        disabledExplanation="Explanation"
      />,
    );
    const buttonWhileDisabled = screen.getByRole('button', { name: 'Extra' });

    rerender(
      <SectionButton
        section={Section.Extra}
        availableBookIds={['GLO']}
        selectedBookIds={[]}
        onToggle={vi.fn()}
        localizedStrings={localizedStrings}
        disabledExplanation="Explanation"
      />,
    );

    expect(screen.getByRole('button', { name: 'Extra' })).toBe(buttonWhileDisabled);
  });
});
