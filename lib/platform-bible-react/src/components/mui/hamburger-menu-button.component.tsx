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
import { MultiColumnMenu, Localized } from 'platform-bible-utils';
import { Command, CommandHandler } from './menu-item.component';
import GridMenu from './grid-menu.component';
import usePromise from '../../hooks/use-promise.hook';

export interface MultiColumnMenuProvider {
  (isSupportAndDevelopment: boolean): Promise<Localized<MultiColumnMenu>>;
}

export type HamburgerMenuButtonProps = PropsWithChildren & {
  /** The handler to use for menu commands (and eventually toolbar commands). */
  commandHandler: CommandHandler;

  /**
   * Optional reference to the "div" container that determines the where the menu should appear. If
   * not defined, then (1,1) used.
   */
  containerRef?: MutableRefObject<HTMLDivElement>;

  /**
   * The delegate to use to get the menu data. If not specified or if it returns undefined, the data
   * in normalMenu or fullMenu property will be used.
   */
  menuProvider?: MultiColumnMenuProvider;

  /**
   * The menu data to show when the menu is opened if the menuProvider property is not defined.
   * (This allows for a default or test-only static menu to be used.)
   */
  normalMenu?: Localized<MultiColumnMenu>;

  /**
   * The menu data to show for "full" menu (when opened with the SHIFT key pressed) if the
   * menuProvider property is not defined. (This allows for a default or test-only static menu to be
   * used.)
   */
  fullMenu?: Localized<MultiColumnMenu>;

  /** Additional css class(es) to help with unique styling of the sub-components */
  className?: string;

  /** Value to use as prefix for ARIA labels on interactive sub-components */
  ariaLabelPrefix?: string;
};

export default function HamburgerMenuButton({
  menuProvider,
  normalMenu,
  fullMenu,
  commandHandler,
  containerRef,
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

  const handleMenuButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuOpen((prevIsOpen) => {
      const isOpening = !prevIsOpen;
      if (isOpening && e.shiftKey) setShowFullMenu(true);
      else if (!isOpening) setShowFullMenu(false);
      return isOpening;
    });
  }, []);

  const menuCommandHandler = useCallback(
    (command: Command) => {
      handleMenuItemClick();
      return commandHandler(command);
    },
    [commandHandler, handleMenuItemClick],
  );

  const [offset, setOffset] = useState({ top: 1, left: 1 });

  useEffect(() => {
    if (isMenuOpen) {
      const node = containerRef?.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;
        const top = rect.top + scrollTop + node.clientHeight;
        const left = rect.left + scrollLeft;
        setOffset({ top, left });
      }
    }
  }, [isMenuOpen, containerRef]);

  const [normalMenuData] = usePromise(
    useCallback(async () => {
      return menuProvider?.(false) ?? normalMenu;
      // isMenuOpen needs to be included for the menu contents to reevaluate when reopened
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuProvider, normalMenu, isMenuOpen]),
    normalMenu,
  );

  const [fullMenuData] = usePromise(
    useCallback(async () => {
      return menuProvider?.(true) ?? fullMenu ?? normalMenuData;
      // isMenuOpen needs to be included for the menu contents to reevaluate when reopened
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuProvider, fullMenu, normalMenuData, isMenuOpen]),
    fullMenu ?? normalMenuData,
  );

  const menu = showFullMenu && fullMenuData ? fullMenuData : normalMenuData;

  return (
    <>
      <IconButton
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
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
        variant="temporary"
        open={isMenuOpen}
        onClose={handleMenuItemClick}
        PaperProps={{
          className: 'papi-menu-drawer-paper',
          style: {
            top: offset.top,
            left: offset.left,
          },
        }}
      >
        {menu ? (
          <GridMenu
            className={className}
            id={`${ariaLabelPrefix ?? ''} main menu`}
            commandHandler={menuCommandHandler}
            multiColumnMenu={menu}
          />
        ) : undefined}
      </Drawer>
    </>
  );
}
