import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn-ui/collapsible';
import { ChevronDown, ChevronUp, LinkIcon } from 'lucide-react';
import React, { ReactHTMLElement } from 'react';
import Link from './link.component';

export type SectionApi = { updateIsOpen?: (open: boolean) => void };

export type SectionProps = {
  id: string;
  header: string | ReactHTMLElement;
  description?: string;
  content?: ReactHTMLElement;
};
export type SectionPropsWithApi = SectionProps & {
  api: SectionApi;
};

export default function Section({ id, header, description, content, api }: SectionPropsWithApi) {
  const [isOpen, setIsOpen] = React.useState(false);

  function updateIsOpen(open: boolean) {
    setIsOpen(open);
  }
  if (api) api.updateIsOpen = updateIsOpen;

  return (
    <section id={id}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="tw-flex tw-items-center tw-gap-1">
          <Link href={`#${id}`} text={<LinkIcon className="tw-h-4" />} newTab={false} />{' '}
          <CollapsibleTrigger className="tw-contents">
            <h2 className="tw-text-2xl tw-font-semibold">{header}</h2>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <p className="tw-mb-4 tw-text-muted-foreground">{description}</p>
          {content}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
