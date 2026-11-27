// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { Filter } from './filter.component';

// Radix positions an open tooltip with a ResizeObserver, which jsdom lacks
beforeAll(() => {
  installNoopResizeObserver();
});

const ENTRIES = [
  { value: 'scripture', label: 'Scripture' },
  { value: 'commentary', label: 'Commentary' },
];

function renderFilter(props: Partial<Parameters<typeof Filter>[0]> = {}) {
  const onChange = vi.fn();
  render(
    <Filter
      entries={ENTRIES}
      selected={['scripture', 'commentary']}
      onChange={onChange}
      placeholder="Types"
      badgesPlaceholder="Any type"
      {...props}
    />,
  );
  return { onChange };
}

describe('Filter badge remove button', () => {
  it('names each button after the entry it removes and shows that as a hover tooltip', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderFilter({ removeItemLabel: 'Quitar {item}' });

    const removeScripture = screen.getByRole('button', { name: 'Quitar Scripture' });
    expect(screen.getByRole('button', { name: 'Quitar Commentary' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(removeScripture);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Quitar Scripture');
  });

  it('falls back to English when no label is given', () => {
    renderFilter();

    expect(screen.getByRole('button', { name: 'Remove Scripture' })).toBeInTheDocument();
  });

  it('removes only the entry whose button is clicked', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { onChange } = renderFilter();

    await user.click(screen.getByRole('button', { name: 'Remove Scripture' }));
    expect(onChange).toHaveBeenCalledWith(['commentary']);
  });
});
