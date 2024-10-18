import { cn } from '@/utils/shadcn-ui.util';
import { ReactHTMLElement } from 'react';

type LinkProps = { href: string; text: ReactHTMLElement; newTab: boolean; className?: string };

export default function Link({ href, text, newTab, className }: LinkProps) {
  return (
    <a
      target={newTab ? '_blank' : ''}
      rel="noreferrer"
      className={cn('tw-text-blue-600 hover:tw-underline', className)}
      href={href}
    >
      {text}
    </a>
  );
}
