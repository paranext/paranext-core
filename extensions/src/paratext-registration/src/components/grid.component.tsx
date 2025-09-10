import { cn } from 'platform-bible-react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Section } from './section.component';

type GridComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/** Two-column grid layout div */
export function Grid({ children, className, title, ...props }: GridComponentProps) {
  return (
    <Section
      className={cn(
        'tw-grid tw-grid-cols-[1fr_2fr] max-[300px]:tw-grid-cols-1 tw-gap-y-4 tw-gap-x-5 tw-items-center [&>*:nth-child(odd)]:min-[300px]:tw-justify-self-end',
        className,
      )}
      title={title}
      {...props}
    >
      {children}
    </Section>
  );
}
