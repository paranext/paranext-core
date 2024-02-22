import { PlatformMenus } from 'platform-bible-utils';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridMenu from './grid-menu.component';
import { MouseEventHandler, PropsWithChildren } from 'react';
import NonValidatingDocumentCombiner from '../test-utils/non-validating-document-combiner';
import * as jsonMenu from './sample.composed.full.menu.json';

jest.mock('@mui/material', () => {
  const mui = jest.requireActual('@mui/material'); // Import the actual MUI components

  return {
    ...mui, // Spread the actual MUI exports

    // Mocked components
    MenuItem: ({
      divider,
      className,
      children,
    }: {
      divider: boolean | undefined;
      className: string | undefined;
      onClick?: MouseEventHandler<HTMLLIElement> | undefined;
    } & PropsWithChildren) => {
      const dividerStyle = divider ? ' hasDivider' : '';
      return (
        <li className={`${className || ''}${dividerStyle}`} role="menuitem">
          {children}
        </li>
      );
    },
  };
});

function HandleMenuCommandNoOp() {
}

describe('GridMenu renders', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
  });

  // Assert the type that schema validation should have already sorted out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuData = topMenuCombiner.output as PlatformMenus;
  render(
    <GridMenu multiColumnMenu={menuData.mainMenu} commandHandler={HandleMenuCommandNoOp} />,
  );

  it('column label correctly', () => {
    const expectedColumns = [
      screen.queryByText('%mainMenu_Paratext%'),
      screen.queryByText('%mainMenu_Window%'),
      screen.queryByText('%mainMenu_Layout%'),
      screen.queryByText('%mainMenu_Help%'),
    ];

    expectedColumns.forEach((column) => {
      expect(column).toBeInTheDocument();
      expect(column).toHaveAttribute(
        'class',
        expect.stringMatching(/\bpapi-menu-column-header\b/),
      );
    });
  });

  const allMenuItems = screen.queryAllByRole('menuitem');

  // We expect all the top-level menu items to be laid out in the grid, but not the ones which
  // belong to a submenu.
  // (Note: In our test data, groups that are in submenus have the text "Sub" in them.)
  const expectedMenuItems = jsonMenu.mainMenu.items.filter(
    (i) => 'group' in i && !/sub/i.test(i.group),
  );

  it('the correct total number of items', () => {
    expect(allMenuItems.length).toBe(expectedMenuItems.length);
  });

  it('the correct total number of groups with dividers', () => {
    let cGroupsWithDividers = 0;
    allMenuItems.forEach((m) => {
      if (m.outerHTML?.match('hasDivider')) cGroupsWithDividers += 1;
    });

    // In the test data, only 4 of the column-level groups contain menu items. They are in two
    // columns and there should be no divider for the final group in each column.
    expect(cGroupsWithDividers).toBe(2);
  });

  it('the last group in a column without a final separator', () => {
    const htmlForAddParatextVideoItem = allMenuItems.map((i) => i.outerHTML).find((html) => html &&
      /%video_AddParatextVideo%/.test(html),
    );

    expect(htmlForAddParatextVideoItem).toBeDefined();
    expect(htmlForAddParatextVideoItem).not.toMatch('hasDivider');
  });
});
