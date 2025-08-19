import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';

export type DirectionProps = {
  direction: 'ltr' | 'rtl';
  onChangeDirection: (direction: 'ltr' | 'rtl') => void;
};

export function DirToggle({ direction, onChangeDirection }: DirectionProps) {
  const toggleDirection = () => {
    onChangeDirection(direction === 'ltr' ? 'rtl' : 'ltr');
  };

  return (
    <Button variant="outline" onClick={toggleDirection}>
      {direction === 'ltr' ? 'Switch to RTL' : 'Switch to LTR'} (Current: {direction.toUpperCase()})
    </Button>
  );
}

export function useDirection() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  return { direction, setDirection };
}
