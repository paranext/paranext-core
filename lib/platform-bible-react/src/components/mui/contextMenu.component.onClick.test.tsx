import ContextMenu from '@/components/mui/context-menu.component';
import { Command } from '@/components/mui/menu-item.component';
import * as jsonMenu from '@/components/mui/sample.composed.full.menu.json';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';

let lastCommandHandled: string;

function RememberLastMenuCommand(command: Command) {
  lastCommandHandled = command.command;
}

describe('ContextMenu', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
  });

  // Assert the type that schema validation should have already sorted out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuData = topMenuCombiner.output as PlatformMenus;

  it('handles click event correctly', () => {
    render(
      <ContextMenu
        menuDefinition={menuData.defaultWebViewContextMenu}
        commandHandler={RememberLastMenuCommand}
      >
        click me
      </ContextMenu>,
    );

    const contextMenuTarget = screen.getByText('click me');
    fireEvent.contextMenu(contextMenuTarget);

    const insertNoteItem = screen.getByRole('menuitem', { name: '%general_insertNote%' });

    fireEvent.click(insertNoteItem);

    expect(lastCommandHandled).toBe('platform.insertNote');
  });
});
