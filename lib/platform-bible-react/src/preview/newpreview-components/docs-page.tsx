import { ReactHTMLElement } from 'react';
import QuickNav, { NavEntry } from './quicknav.component';
import { Direction } from '../preview-components/direction-toggle.component';

type DocsPageBaseProps = { sections: NavEntry[]; content: ReactHTMLElement };
export type DocsPageProps = { direction: Direction };

export default function DocsPage({ sections, content }: DocsPageBaseProps) {
  return (
    <>
      <main className="pr-flex-1 pr-p-6">
        <div className="pr-mx-auto pr-max-w-3xl pr-space-y-12">{content}</div>
      </main>

      <QuickNav sections={sections} />
    </>
  );
}
