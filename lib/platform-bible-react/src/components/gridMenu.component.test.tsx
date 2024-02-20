import { PlatformMenus } from 'platform-bible-utils';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Command, GridMenu } from 'platform-bible-react';
import { PropsWithChildren } from 'react';
import NonValidatingDocumentCombiner from '../test-utils/non-validating-document-combiner';
import * as jsonMenu from './sample.composed.full.menu.json';

// jest.mock('@mui/material', () => ({
//   __esModule: true,
//   // Grid: ({ children }: PropsWithChildren) => <div className='mockedGrid'>{children}</div>,
//   List: ({ children }: PropsWithChildren) => <ul className='mockedList'>{children}</ul>,
//   MenuItem: ({ divider, className, children }: { divider: boolean | undefined, className: string | undefined } & PropsWithChildren) => {
//     const hasDividerStyle = divider ? ' hasDivider' : '';
//     return <li className={`${className}${hasDividerStyle}`} role='menuitem'>{children}</li>;
//   },
//   // Menu: ({ children }: PropsWithChildren) => <ul className='mockedMenu'>{children}</ul>,
//   // ListItemText: ({ primary }: {primary: string} & PropsWithChildren) => <span className='mockedListItemText'>{primary}</span>,
//   // ListItemIcon: ({ className, children }: {className: string} & PropsWithChildren) => <span className={className}>{children}</span>,
// }));

jest.mock('@mui/material', () => {
  const mui = jest.requireActual('@mui/material'); // Import the actual MUI components

  return {
    ...mui, // Spread the actual MUI exports

    // Mocked components
    MenuItem: ({
      divider,
      className,
      children,
    }: { divider: boolean | undefined; className: string | undefined } & PropsWithChildren) => {
      const dividerStyle = divider ? ' hasDivider' : '';
      return (
        <li className={`${className}${dividerStyle}`} role="menuitem">
          {children}
        </li>
      );
    },

    // Add more mocked components as needed
  };
});

/*
jest.spyOn(console, 'error').mockImplementation(() => {});
*/

let lastCommandHandled: string;
let numberOfCommandsHandled: number = 0;

function HandleMenuCommandNoOp(command: Command) {
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
  const { getByText, getAllByRole, container } = render(
    <GridMenu multiColumnMenu={menuData.mainMenu} commandHandler={HandleMenuCommandNoOp} />,
  );
  describe('renders', () => {
    it('column label correctly', () => {
      const expectedColumns = [
        getByText('%mainMenu_Paratext%'),
        getByText('%mainMenu_Window%'),
        getByText('%mainMenu_Layout%'),
        getByText('%mainMenu_Help%'),
      ];

      expectedColumns.forEach((column) => {
        expect(column).toBeInTheDocument();
        expect(column).toHaveAttribute(
          'class',
          expect.stringMatching(/\bpapi-menu-column-header\b/),
        );
      });
    });

    it('some HTML', () => {
      expect(container.innerHTML).toBeDefined();
    });

    const allMenuItems = getAllByRole('menuitem');
    // We expect all the top-level menu items to be laid out in the grid, but not the ones which
    // belong to a submenu.
    // (Note: In our test data, groups that are in submenus have the text "Sub" in them.)
    const expectedMenuItems = jsonMenu.mainMenu.items.filter(
      (i) => 'group' in i && !/sub/i.test(i.group),
    );

    it('the correct total number of items', () => {
      expect(allMenuItems.length).toBe(expectedMenuItems.length);
    });

    it('the correct number of groups in each column', () => {
      let cGroupsWithDividers = 0;
      allMenuItems.forEach((m) => {
        if (!!m.attributes.getNamedItem('class')?.value?.match('hasDivider'))
          cGroupsWithDividers += 1;
      });

      // In the test data, only 4 of the column-level groups contain menu items. They are in two
      // columns and there should be no divider for the final group in each column.
      expect(cGroupsWithDividers).toBe(2);
    });

    it('the last group in a column without a final separator', () => {
      const lastItemInFirstColumn = getByText('%video_AddParatextVideo%');

      expect(lastItemInFirstColumn).toBeInTheDocument();
      expect(lastItemInFirstColumn).toHaveAttribute('hasDivider', 'false');
    });
  });
  describe('handles', () => {
    it('click event correctly', () => {
      fireEvent.click(getByText('%sendReceiveProjects%'));

      expect(lastCommandHandled).toBe('paratext.sendReceiveProjects');
      expect(numberOfCommandsHandled).toBe(1);
    });
  });
});
