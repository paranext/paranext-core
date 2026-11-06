// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createPortal } from 'react-dom';
import { vi } from 'vitest';
import { Table, TableBody, TableCell, TableRow } from './table';

// `getFocusableElements` skips elements with no layout, and jsdom lays nothing out, so give every
// element a box for the table's keyboard navigation to find.
const originalGetClientRects = HTMLElement.prototype.getClientRects;
beforeAll(() => {
  HTMLElement.prototype.getClientRects = function getClientRects() {
    // jsdom stub: one non-empty entry is all `isVisible` checks for
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return [new DOMRect(0, 0, 10, 10)] as unknown as DOMRectList;
  };
});
afterAll(() => {
  HTMLElement.prototype.getClientRects = originalGetClientRects;
});

/** Waits out the animation frame the row navigation focuses in. */
const nextFrame = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

function TableWithPortalledMenu({ onRowKeyDown }: { onRowKeyDown?: () => void }) {
  return (
    <Table aria-label="Projects">
      <TableBody>
        <TableRow data-testid="row-1" onKeyDown={onRowKeyDown}>
          <TableCell>
            Row 1{createPortal(<button type="button">Menu item</button>, document.body)}
          </TableCell>
        </TableRow>
        <TableRow data-testid="row-2">
          <TableCell>Row 2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe('Table keyboard navigation', () => {
  it('moves focus to the first row on ArrowDown in the table (positive control)', async () => {
    render(<TableWithPortalledMenu />);
    screen.getByRole('table').focus();

    await userEvent.keyboard('{ArrowDown}');
    await nextFrame();

    expect(screen.getByTestId('row-1')).toHaveFocus();
  });

  it('moves focus to the next row on ArrowDown in a row (positive control)', async () => {
    render(<TableWithPortalledMenu />);
    screen.getByTestId('row-1').focus();

    await userEvent.keyboard('{ArrowDown}');
    await nextFrame();

    expect(screen.getByTestId('row-2')).toHaveFocus();
  });

  it('leaves focus alone for keys pressed in content portalled out of a row', async () => {
    const onRowKeyDown = vi.fn();
    render(<TableWithPortalledMenu onRowKeyDown={onRowKeyDown} />);
    const menuItem = screen.getByRole('button', { name: 'Menu item' });
    menuItem.focus();

    await userEvent.keyboard('{ArrowDown}');
    await nextFrame();

    expect(menuItem).toHaveFocus();
    // The caller's own handler still sees the key
    expect(onRowKeyDown).toHaveBeenCalledTimes(1);
  });

  it('does not throw on ArrowDown in a table with no focusable row', async () => {
    const onError = vi.fn();
    window.addEventListener('error', onError);
    render(
      <Table aria-label="Empty">
        <TableBody />
      </Table>,
    );
    screen.getByRole('table').focus();

    await userEvent.keyboard('{ArrowDown}');
    window.removeEventListener('error', onError);

    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole('table')).toHaveFocus();
  });
});
