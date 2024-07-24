import ContextMenu from '@/components/mui/context-menu.component';
import * as jsonMenu from '@/components/mui/sample.composed.full.menu.json';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';

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
