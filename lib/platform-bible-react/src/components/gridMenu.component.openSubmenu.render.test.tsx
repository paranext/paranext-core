import { NonValidatingDocumentCombiner, PlatformMenus } from 'platform-bible-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import GridMenu from './grid-menu.component';
import * as jsonMenu from './sample.composed.full.menu.json';

describe('GridMenu', () => {
  const topMenuCombiner = new NonValidatingDocumentCombiner(jsonMenu, {
    copyDocuments: false,
    ignoreDuplicateProperties: true,
    ignoreDuplicateArrayItems: false,
  });

  // Assert the type that schema validation should have already sorted out
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuData = topMenuCombiner.output as PlatformMenus;
  render(<GridMenu multiColumnMenu={menuData.mainMenu} commandHandler={() => {}} />);

  it('renders submenu when parent menu is clicked', async () => {
    const parentMenuItem = screen.getByRole('menuitem', { name: '%paratext_help%' });

    const rightArrowIcon = parentMenuItem.querySelector('.MuiListItemIcon-root > .MuiSvgIcon-root');
    expect(rightArrowIcon).toHaveAttribute('data-testid', 'ArrowRightIcon');

    fireEvent.click(parentMenuItem);

    screen.getByRole('menuitem', { name: '%paratext_helpVideos%' });
    const helpGuideMenuItem = screen.getByRole('menuitem', { name: '%paratext_helpGuide%' });
    await userEvent.hover(helpGuideMenuItem);
    const tip = await screen.findByRole('tooltip');
    expect(tip).toBeInTheDocument();
    expect(tip.textContent).toBe('%paratext_helpGuide_tooltip%');
  });
});
