import { Button } from '@/components/shadcn-ui/button';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { SectionApi } from './section.component';

export type NavEntry = { id: string; name: string; api?: SectionApi };
type QuickNavProps = { sections: NavEntry[] };

const defaultSections = [{ id: '', name: '↑' }];

function expandAll(sections: NavEntry[], expand: boolean) {
  sections.forEach((section) => section.api?.updateIsOpen && section.api?.updateIsOpen(expand));
}

export default function QuickNav({ sections = [] }: QuickNavProps) {
  return (
    <nav className="tw-hidden tw-w-64 tw-p-6 sm:tw-block">
      <div className="tw-sticky tw-top-20">
        <h3 className="tw-mb-2 tw-text-sm tw-font-medium">On This Page</h3>
        <div className="tw-flex tw-justify-start tw-gap-1 tw-pb-2">
          <Button
            size="icon"
            variant="secondary"
            title="Collapse all sections"
            className="tw-h-8"
            onClick={() => expandAll(sections, false)}
          >
            <ChevronsDownUp className="tw-h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            title="Expand all sections"
            className="tw-h-8"
            onClick={() => expandAll(sections, true)}
          >
            <ChevronsUpDown className="tw-h-4" />
          </Button>
        </div>
        <ul className="tw-space-y-2 tw-text-sm">
          {[...sections, ...defaultSections].map((section: NavEntry) => {
            return (
              <li>
                <a
                  href={`#${section.id}`}
                  className="tw-text-muted-foreground hover:tw-text-primary"
                >
                  {section.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
