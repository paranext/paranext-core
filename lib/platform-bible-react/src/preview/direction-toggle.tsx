import React, { Dispatch, SetStateAction } from 'react';
import { Button, ButtonProps } from '..';

export type Direction = 'rtl' | 'ltr';
export type HasDirection = { direction: Direction };

export const DirToggle = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { direction: Direction; setDirection: Dispatch<SetStateAction<Direction>> }
>(({ className, direction, setDirection, ...props }) => {
  const oppositeDirection = direction === 'rtl' ? 'ltr' : 'rtl';
  return (
    // eslint-disable-next-line no-alert
    <Button
      className={className}
      onClick={() => {
        setDirection(oppositeDirection);
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {oppositeDirection}
    </Button>
  );
});
