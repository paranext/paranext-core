// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { SearchBar } from './search-bar.component';

// Radix positions an open tooltip with a ResizeObserver, which jsdom lacks
beforeAll(() => {
  installNoopResizeObserver();
});

describe('SearchBar clear button', () => {
  it('is named by the localized label and shows it as a hover tooltip', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<SearchBar value="genesis" onSearch={vi.fn()} clearButtonLabel="Suche löschen" />);

    const clearButton = screen.getByRole('button', { name: 'Suche löschen' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(clearButton);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Suche löschen');
  });

  it('falls back to English while the label is an unresolved localize key', () => {
    render(
      <SearchBar value="genesis" onSearch={vi.fn()} clearButtonLabel="%general_clearSearch%" />,
    );

    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clears the query when clicked', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSearch = vi.fn();
    render(<SearchBar value="genesis" onSearch={onSearch} />);

    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onSearch).toHaveBeenCalledWith('');
  });
});
