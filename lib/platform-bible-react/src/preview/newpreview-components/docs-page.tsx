import { ReactHTMLElement } from 'react';
import QuickNav, { NavEntry } from './quicknav.component';

type ComponentPageProps = { sections: NavEntry[]; content: ReactHTMLElement };

export default function DocsPage({ sections, content }: ComponentPageProps) {
  return (
    <>
      <main className="pr-flex-1 pr-p-6">
        <div className="pr-mx-auto pr-max-w-3xl pr-space-y-12">{content}</div>
      </main>

      <QuickNav sections={sections} />
    </>
  );
}
