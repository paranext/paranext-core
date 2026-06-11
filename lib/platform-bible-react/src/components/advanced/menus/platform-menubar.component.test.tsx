import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { vi } from 'vitest';
import { PlatformMenubar } from './platform-menubar.component';

const menuData: Localized<MultiColumnMenu> = {
  columns: { 'test.column': { label: 'TestColumn', order: 1 } },
  groups: { 'test.group': { column: 'test.column', order: 1 } },
  items: [
    {
      label: 'Enabled Item',
      group: 'test.group',
      order: 1,
      command: 'test.enabled',
      localizeNotes: '',
    },
    {
      label: 'Disabled Item',
      group: 'test.group',
      order: 2,
      command: 'test.disabled',
      localizeNotes: '',
      disabled: true,
    },
    {
      label: 'Checked Item',
      group: 'test.group',
      order: 3,
      command: 'test.checked',
      localizeNotes: '',
      checked: true,
    },
    {
      label: 'Unchecked Item',
      group: 'test.group',
      order: 4,
      command: 'test.unchecked',
      localizeNotes: '',
      checked: false,
    },
  ],
};

describe('PlatformMenubar dynamic item states', () => {
  it('renders disabled and checkbox menu items', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={menuData} onSelectMenuItem={vi.fn()} />);

    await user.click(screen.getByText('TestColumn'));

    const disabledItem = await screen.findByText('Disabled Item');
    expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('data-disabled');

    const checkedItem = screen.getByText('Checked Item');
    expect(checkedItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute(
      'aria-checked',
      'true',
    );

    const uncheckedItem = screen.getByText('Unchecked Item');
    expect(uncheckedItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute(
      'aria-checked',
      'false',
    );

    const enabledItem = screen.getByText('Enabled Item');
    expect(enabledItem.closest('[role="menuitem"]')).not.toHaveAttribute('data-disabled');
  });

  it('calls onSelectMenuItem when clicking an enabled checkbox item', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelectMenuItem = vi.fn();
    render(<PlatformMenubar menuData={menuData} onSelectMenuItem={onSelectMenuItem} />);

    await user.click(screen.getByText('TestColumn'));
    await user.click(await screen.findByText('Checked Item'));

    expect(onSelectMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({ command: 'test.checked' }),
    );
  });

  it('does not call onSelectMenuItem when clicking a disabled item', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelectMenuItem = vi.fn();
    render(<PlatformMenubar menuData={menuData} onSelectMenuItem={onSelectMenuItem} />);

    await user.click(screen.getByText('TestColumn'));
    await user.click(await screen.findByText('Disabled Item'));

    expect(onSelectMenuItem).not.toHaveBeenCalled();
  });
});
