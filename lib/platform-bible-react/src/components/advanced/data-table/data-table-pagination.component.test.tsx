// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { DataTable } from './data-table.component';

// Radix positions an open tooltip with a ResizeObserver, which jsdom lacks
beforeAll(() => {
  installNoopResizeObserver();
});

type Row = { name: string };

const ROWS: Row[] = Array.from({ length: 25 }, (_, index) => ({ name: `Row ${index + 1}` }));

describe('DataTablePagination page buttons', () => {
  it('shows the button label as a hover tooltip', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <DataTable<Row, unknown>
        columns={[{ accessorKey: 'name', header: 'Name' }]}
        data={ROWS}
        enablePagination
        showPaginationControls
        noResultsMessage="No results"
      />,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(screen.getByRole('button', { name: 'Go to next page' }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Go to next page');
  });
});
