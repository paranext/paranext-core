import { ReactHTMLElement } from 'react';
import QuickNav, { NavEntry } from './quicknav.component';
import { Direction } from '../preview-components/direction-toggle.component';

type DocsPageBaseProps = { sections: NavEntry[]; content: ReactHTMLElement };
export type DocsPageProps = { direction: Direction };

export default function DocsPage({ sections, content }: DocsPageBaseProps) {
  return (
    <>
      <main className="tw-flex-1 tw-p-6">
        <div className="tw-mx-auto tw-max-w-3xl tw-space-y-12">{content}</div>
      </main>

      <QuickNav sections={sections} />
    </>
  );
}
