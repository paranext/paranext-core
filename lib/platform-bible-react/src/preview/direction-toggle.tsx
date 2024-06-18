import React from 'react';
import { Button, ButtonProps } from '..';

export type Direction = 'rtl' | 'ltr';
export type HasDirection = { direction: Direction };
export type DirectionProps = HasDirection & {
  changeDirection: (dir: Direction) => void;
};

export const DirToggle = React.forwardRef<HTMLButtonElement, ButtonProps & DirectionProps>(
  ({ className, direction, changeDirection, ...props }) => {
    const oppositeDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    return (
      <Button
        className={className}
        onClick={() => {
          changeDirection(oppositeDirection);
        }}
        {...props}
      >
        {oppositeDirection}
      </Button>
    );
  },
);
