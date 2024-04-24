import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridMenu from '@/components/grid-menu.component';
import { Command } from '@/components/menu-item.component';
import * as jsonMenu from '@/components/sample.composed.full.menu.json';

let lastCommandHandled: string;
let numberOfCommandsHandled: number = 0;

function RememberLastMenuCommand(command: Command) {
  lastCommandHandled = command.command;
  numberOfCommandsHandled += 1;
}

describe('GridMenu', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
  });

  // Assert the type that schema validation should have already sorted out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuData = topMenuCombiner.output as PlatformMenus;

  it('handles click event correctly', () => {
    render(
      <GridMenu multiColumnMenu={menuData.mainMenu} commandHandler={RememberLastMenuCommand} />,
    );

    const sendReceiveProjectsItem = screen.getByRole('menuitem', { name: '%sendReceiveProjects%' });

    fireEvent.click(sendReceiveProjectsItem);

    expect(numberOfCommandsHandled).toBe(1);
    expect(lastCommandHandled).toBe('paratext.sendReceiveProjects');
  });
});
