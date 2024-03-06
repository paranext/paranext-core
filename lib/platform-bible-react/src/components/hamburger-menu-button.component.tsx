import {
  useCallback,
  useState,
  MouseEvent,
  MutableRefObject,
  useEffect,
  PropsWithChildren,
} from 'react';
import { IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MultiColumnMenu } from 'platform-bible-utils';
import { Command, CommandHandler } from './menu-item.component';
import GridMenu from './grid-menu.component';

export type HamburgerMenuButtonProps = PropsWithChildren & {
  /** The handler to use for menu commands (and eventually toolbar commands). */
  commandHandler: CommandHandler;

  /**
   * Optional reference to the "div" container that determines the top of the area in which the menu
   * should appear. If not defined, then the offsetFromBottomOfMenuToTopOfMenu is used.
   */
  containerRef?: MutableRefObject<HTMLDivElement>;

  /**
   * If containerRef is not defined, this is the desired offset in pixels from the bottom of the
   * button to the top of menu. Defaults to 1.
   */
  offsetFromBottomOfButtonToTopOfMenu?: number;

  /** The menu data to show when the menu is opened. */
  normalMenu: MultiColumnMenu;

  /**
   * The menu data to show when the menu is opened with the SHIFT key pressed. If not defined, the
   * normal menu will display.
   */
  fullMenu?: MultiColumnMenu;

  /** Additional css class(es) to help with unique styling of the sub-components */
  className?: string;

  /** Value to use as prefix for ARIA labels on interactive sub-components */
  ariaLabelPrefix?: string;
};

export default function HamburgerMenuButton({
  normalMenu,
  fullMenu,
  commandHandler,
  containerRef,
  offsetFromBottomOfButtonToTopOfMenu,
  className,
  ariaLabelPrefix,
  children,
}: HamburgerMenuButtonProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);

  const handleMenuItemClick = useCallback(() => {
    if (isMenuOpen) setMenuOpen(false);
    setShowFullMenu(false);
  }, [isMenuOpen]);

  const handleMenuButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setMenuOpen((prevIsOpen) => {
        const isOpening = !prevIsOpen;
        if (isOpening && fullMenu && e.shiftKey) setShowFullMenu(true);
        else if (!isOpening) setShowFullMenu(false);
        return isOpening;
      });
    },
    [fullMenu],
  );

  const menuCommandHandler = useCallback(
    (command: Command) => {
      handleMenuItemClick();
      return commandHandler(command);
    },
    [commandHandler, handleMenuItemClick],
  );

  const menu = showFullMenu && fullMenu ? fullMenu : normalMenu;

  const [topOfMenu, setTopOfMenu] = useState(0);

  useEffect(() => {
    if (isMenuOpen) {
      if (containerRef?.current) {
        setTopOfMenu(containerRef.current.clientHeight);
      } else {
        setTopOfMenu(offsetFromBottomOfButtonToTopOfMenu ?? 1);
      }
    }
  }, [isMenuOpen, containerRef, offsetFromBottomOfButtonToTopOfMenu]);

  return (
    <>
      <IconButton
        edge="start"
        className={`papi-menuButton ${className ?? ''}`}
        color="inherit"
        aria-label={`${ariaLabelPrefix ?? ''} menu button`}
        onClick={handleMenuButtonClick}
      >
        {children ?? <MenuIcon />}
      </IconButton>
      <Drawer
        className={`papi-menu-drawer ${className ?? ''}`}
        anchor="left"
        variant="persistent"
        open={isMenuOpen}
        onClose={handleMenuItemClick}
        PaperProps={{
          className: 'papi-menu-drawer-paper',
          style: {
            top: topOfMenu,
          },
        }}
      >
        <GridMenu
          className={className}
          id={`${ariaLabelPrefix ?? ''} main menu`}
          commandHandler={menuCommandHandler}
          multiColumnMenu={menu}
        />
      </Drawer>
    </>
  );
}
