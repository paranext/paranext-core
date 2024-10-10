import { useState } from 'react';
// import { ScrollArea } from '@/components/shadcn-ui/scroll-area';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { MenuIcon } from 'lucide-react';
import ButtonDocs from './newpages/components/button.docs';
import SliderDocs from './newpages/components/slider.docs.component';
import ContactButtons2 from './newpreview-components/contact-buttons.component';
import Nav, { Page } from './newpreview-components/nav.component';

const componentPages: Page[] = ['Button', 'Slider', 'Dialog', '1', '2', '3', '4', '5'].map(
  (it: string) => {
    return {
      name: it,
    };
  },
);
const pages: Page[] = [
  { name: 'Overview' },
  { name: 'Installation' },
  { name: 'Components', children: componentPages },
];

export default function Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pr-flex pr-min-h-screen pr-bg-background">
      <aside
        className={`pr-w-64 pr-border-r pr-bg-background ${sidebarOpen ? 'pr-block' : 'pr-hidden'} md:pr-block`}
      >
        <div className="pr-flex pr-h-16 pr-items-center pr-justify-center pr-border-b pr-p-4">
          Platform.Bible Design System
        </div>
        {/* <ScrollArea className="h-[calc(100vh-4rem)]"> */}
        <div className="pr-p-2 pr-py-4">
          <Input type="search" placeholder="Search..." className="pr-w-full pr-border" />
        </div>
        <Nav pages={pages} />
        {/* </ScrollArea> */}
      </aside>
      <div className="pr-flex-1">
        <header className="pr-flex pr-h-16 pr-items-center pr-justify-between pr-border-b pr-p-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:pr-hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="pr-h-6 pr-w-6" />
            <span className="pr-sr-only">Toggle sidebar</span>
          </Button>
          <div className="pr-flex-1" />
          <nav className="pr-flex pr-space-x-2">
            <ContactButtons2 />
          </nav>
        </header>
        <div className="pr-flex">
          <SliderDocs />
          <ButtonDocs />
        </div>
      </div>
    </div>
  );
}
