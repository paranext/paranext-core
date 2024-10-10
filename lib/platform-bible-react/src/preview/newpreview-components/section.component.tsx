import { ReactHTMLElement } from 'react';
import Link from './link';

export type SectionProps = {
  id: string;
  header: string;
  description?: string;
  content?: ReactHTMLElement;
};

export default function Section({ id, header, description, content }: SectionProps) {
  return (
    <section id={id}>
      <h1 className="pr-mb-4 pr-text-2xl pr-font-semibold">
        <Link href={`#${id}`} text="#" newTab={false} /> {header}
      </h1>
      <p className="pr-mb-4 pr-text-muted-foreground">{description}</p>
      {content}
    </section>
  );
}
