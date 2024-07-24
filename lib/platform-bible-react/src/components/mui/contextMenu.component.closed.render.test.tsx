import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextMenu from './context-menu.component';
import * as jsonMenu from './sample.composed.full.menu.json';

describe('ContextMenu', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
  });

  // Assert the type that schema validation should have already sorted out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuData = topMenuCombiner.output as PlatformMenus;
  render(
    <ContextMenu menuDefinition={menuData.defaultWebViewContextMenu} commandHandler={() => {}}>
      click me
    </ContextMenu>,
  );

  it('renders no menu items before context menu is displayed', () => {
    expect(screen.queryAllByRole('menuitem').length).toBe(0);
  });
});
