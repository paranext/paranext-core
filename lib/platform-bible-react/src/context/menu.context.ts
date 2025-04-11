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
        'hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
