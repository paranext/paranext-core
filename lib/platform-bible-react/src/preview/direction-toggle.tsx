import React, { Dispatch, SetStateAction } from 'react';
import { Button, ButtonProps } from '..';

export type Direction = 'rtl' | 'ltr';
export type HasDirection = { direction: Direction };
export type DirectionProps = HasDirection & {
  setDirection: Dispatch<SetStateAction<Direction>>;
};

export const DirToggle = React.forwardRef<HTMLButtonElement, ButtonProps & DirectionProps>(
  ({ className, direction, setDirection, ...props }) => {
    const oppositeDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    return (
      <Button
        className={className}
        onClick={() => {
          setDirection(oppositeDirection);
        }}
        {...props}
      >
        {oppositeDirection}
      </Button>
    );
  },
);
