import { cva } from 'class-variance-authority';
import { createContext, useContext } from 'react';

export type MenuContextProps = {
  variant?: 'default' | 'muted';
};

export const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuContext.Provider.');
  }

  return context;
}

export const menuVariants = cva('', {
  variants: {
    variant: {
      default: '',
      muted:
        'tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
