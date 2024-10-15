import { Button } from '@/components/shadcn-ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn-ui/collapsible';
import { ChevronDown, ChevronsDownUp, ChevronsUpDown, LinkIcon } from 'lucide-react';
import React, { ReactHTMLElement } from 'react';
import Link from './link';

export type SectionProps = {
  id: string;
  header: string | ReactHTMLElement;
  description?: string;
  content?: ReactHTMLElement;
  api?: { updateIsOpen?: (open: boolean) => void };
};

export default function Section({ id, header, description, content, api }: SectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  function updateIsOpen(open: boolean) {
    setIsOpen(open);
  }
  if (api) api.updateIsOpen = updateIsOpen;

  return (
    <section id={id}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="pr-mb-4 pr-flex pr-items-center pr-justify-between">
          <div className="pr-flex pr-items-center pr-gap-1">
            <Link href={`#${id}`} text={<LinkIcon className="pr-h-4" />} newTab={false} />{' '}
            <CollapsibleTrigger className="pr-contents">
              <h2 className="pr-text-2xl pr-font-semibold">{header}</h2>
              <ChevronDown />
            </CollapsibleTrigger>
          </div>
          <div>
            <Button size="icon" variant="link">
              <ChevronsUpDown />
            </Button>
            <Button size="icon" variant="link">
              <ChevronsDownUp />
            </Button>
          </div>
        </div>
        <CollapsibleContent>
          <p className="pr-mb-4 pr-text-muted-foreground">{description}</p>
          {content}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
