import { PropsWithChildren } from 'react';

export type PButtonProps = PropsWithChildren<{
  onClick?: () => void;
  onContextMenu?: () => void;
}>;

export function PButton({
  onClick,
  onContextMenu,
  children = 'Click me!',
}: PButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        if (onClick) {
          console.log('PButton clicked!');
          e.preventDefault();
          onClick();
        }
      }}
      onContextMenu={(e) => {
        if (onContextMenu) {
          e.preventDefault();
          onContextMenu();
        }
      }}
    >
      {children}
    </button>
  );
}
