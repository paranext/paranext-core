import { cn } from '@/utils/shadcn-ui.util';
import { LoaderCircle, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

export type SpinnerProps = LucideProps;

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, direction, ...props }, ref) => {
    return (
      <LoaderCircle
        size={35}
        className={cn(
          'tw-animate-spin',
          { 'tw-direction-reverse': direction === 'rtl' },
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
