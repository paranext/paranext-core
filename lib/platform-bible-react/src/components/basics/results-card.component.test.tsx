// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DropdownMenuItem } from '@/components/shadcn-ui/dropdown-menu';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { ResultsCard } from './results-card.component';

// Radix positions an open tooltip with a ResizeObserver, which jsdom lacks
beforeAll(() => {
  installNoopResizeObserver();
});

function renderCard(localizedStrings?: { '%general_moreOptions%'?: string }) {
  render(
    <ResultsCard
      cardKey="card"
      isSelected
      onSelect={vi.fn()}
      dropdownContent={<DropdownMenuItem>Copy</DropdownMenuItem>}
      localizedStrings={localizedStrings}
    >
      Result
    </ResultsCard>,
  );
}

describe('ResultsCard dropdown trigger', () => {
  it('is named by the localized label and shows it as a hover tooltip', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderCard({ '%general_moreOptions%': 'Más opciones' });

    const trigger = screen.getByRole('button', { name: 'Más opciones' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Más opciones');
  });

  it('falls back to English when no localized strings are given', () => {
    renderCard();

    expect(screen.getByRole('button', { name: 'More options' })).toBeInTheDocument();
  });
});
