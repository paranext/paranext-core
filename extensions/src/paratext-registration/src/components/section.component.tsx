import { cn } from 'platform-bible-react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type SectionComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/** Just a div with some margins to give some space around parts of the web view */
export function Section({ children, className, title, ...props }: SectionComponentProps) {
  return (
    // Making a wrapper component and passing all props down
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cn('tw-m-2', className)} title={title} {...props}>
      {children}
    </div>
  );
}
