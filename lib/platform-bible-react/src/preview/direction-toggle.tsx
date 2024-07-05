import React from 'react';
import { Button, type ButtonProps } from '..';

export type Direction = 'rtl' | 'ltr';
export type HasDirection = { direction: Direction };
export type DirectionProps = HasDirection & {
  onChangeDirection: (dir: Direction) => void;
};

export const DirToggle = React.forwardRef<HTMLButtonElement, ButtonProps & DirectionProps>(
  ({ className, direction, onChangeDirection: changeDirection, ...props }) => {
    const oppositeDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    return (
      <Button
        variant="outline"
        className={className}
        onClick={() => {
          changeDirection(oppositeDirection);
        }}
        {...props}
      >
        {direction}
      </Button>
    );
  },
);
