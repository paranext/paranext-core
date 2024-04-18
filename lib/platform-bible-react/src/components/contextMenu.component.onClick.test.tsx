import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextMenu from './context-menu.component';
import { Command } from './menu-item.component';
import * as jsonMenu from './sample.composed.full.menu.json';

let lastCommandHandled: string;

function RememberLastMenuCommand(command: Command) {
  lastCommandHandled = command.command;
}

describe('ContextMenu', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
    ignoreDuplicateArrayItems: false,
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

    const insertNoteItem = screen.getByRole('menuitem', { name: '%insertNote%' });

    fireEvent.click(insertNoteItem);

    expect(lastCommandHandled).toBe('platform.insertNote');
  });
});
