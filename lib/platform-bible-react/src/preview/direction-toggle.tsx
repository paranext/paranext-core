import React from 'react';
import { Button } from '..';

export type Direction = 'rtl' | 'ltr';
export type HasDirection = { direction: Direction };
export type DirectionProps = HasDirection & {
  onChangeDirection: (dir: Direction) => void;
  className?: string;
};

export const DirToggle = React.forwardRef<HTMLButtonElement, DirectionProps>(
  ({ className, direction, onChangeDirection: changeDirection, ...props }) => {
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
