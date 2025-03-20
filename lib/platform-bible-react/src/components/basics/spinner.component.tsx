import { cn } from '@/utils/shadcn-ui.util';
import { LoaderCircle, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

export type SpinnerProps = LucideProps;

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(({ className, ...props }, ref) => {
  return (
    <LoaderCircle size={35} className={cn('tw-animate-spin', className)} {...props} ref={ref} />
  );
});

Spinner.displayName = 'Spinner';

export default Spinner;
