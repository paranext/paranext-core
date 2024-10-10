import { ReactHTMLElement } from 'react';

type LinkProps = { href: string; text: ReactHTMLElement; newTab: boolean };

export default function Link({ href, text, newTab }: LinkProps) {
  return (
    <a
      target={newTab ? '_blank' : ''}
      rel="noreferrer"
      className="pr-text-blue-600 hover:pr-underline"
      href={href}
    >
      {text}
    </a>
  );
}
