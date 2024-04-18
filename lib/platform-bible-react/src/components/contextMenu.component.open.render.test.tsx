import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PropsWithChildren } from 'react';
import ContextMenu from './context-menu.component';
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

describe('ContextMenu renders', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
    ignoreDuplicateArrayItems: false,
  });

  // Assert the type that schema validation should have already sorted out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuData = topMenuCombiner.output as PlatformMenus;
  render(
    <ContextMenu menuDefinition={menuData.defaultWebViewContextMenu} commandHandler={() => {}}>
      click me
    </ContextMenu>,
  );

  const contextMenuTarget = screen.getByText('click me');
  fireEvent.contextMenu(contextMenuTarget);
  const allMenuItems = screen.queryAllByRole('menuitem');

  it('the correct total number of items', () => {
    expect(allMenuItems.length).toBe(2);
  });

  it('the correct total number of groups with dividers', () => {
    let cItemsWithDividers = 0;
    allMenuItems.forEach((m) => {
      if (m.outerHTML?.match('hasDivider')) cItemsWithDividers += 1;
    });

    // In the test data, there are two groups in the context menu, so there should be a divider
    // between them.
    expect(cItemsWithDividers).toBe(1);
  });

  it('the last group in a column without a final separator', () => {
    const htmlForWordListItem = allMenuItems
      .map((i) => i.outerHTML)
      .find((html) => html && /%wordList%/.test(html));

    expect(htmlForWordListItem).toBeDefined();
    expect(htmlForWordListItem).not.toMatch('hasDivider');
  });
});
