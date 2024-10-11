import { useState } from 'react';
// import { ScrollArea } from '@/components/shadcn-ui/scroll-area';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { MenuIcon } from 'lucide-react';
import NavigationContentSearchDocs from './newpages/components/navigation-content-search.docs.component';
import ContactButtons2 from './newpreview-components/contact-buttons.component';
import Nav, { Page } from './newpreview-components/nav.component';
import { Direction, DirToggle } from './preview-components/direction-toggle.component';
import { ThemeButton } from './preview-components/theme-toggle.component';
import ButtonDocs from './newpages/components/button.docs.component';
import SliderDocs from './newpages/components/slider.docs.component';

function makePageObject(page: string) {
  return {
    name: page,
  };
}

const guidePages: Page[] = ['Word smithing', 'Sizing'].map(makePageObject);
const componentPages: Page[] = ['Button', 'Slider', 'Dialog', '1', '2', '3', '4', '5'].map(
  makePageObject,
);
const pages: Page[] = [
  { name: 'Overview' },
  { name: 'Patterns and Recommendation', children: guidePages },
  { name: 'Basic components', children: componentPages },
  { name: 'Advanced components', children: componentPages },
  { name: 'Example layouts', children: componentPages },
  { name: 'Installation' },
];

export default function Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [direction, setDirection] = useState<Direction>('ltr');
  const changeDirectionHandler = (dir: Direction) => setDirection(dir);

  return (
    <div className="pr-flex pr-min-h-screen pr-bg-background">
      <aside
        className={`pr-w-64 pr-border-r pr-bg-background ${sidebarOpen ? 'pr-block' : 'pr-hidden'} lg:pr-block`}
      >
        <div className="pr-flex pr-h-16 pr-items-center pr-justify-center pr-border-b pr-p-4">
          Platform.Bible Design System
        </div>
        <div className="pr-flex pr-gap-1 pr-pt-4">
          <ContactButtons2 />
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
            className="lg:pr-hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="pr-h-6 pr-w-6" />
            <span className="pr-sr-only">Toggle sidebar</span>
          </Button>
          <div className="pr-fixed pr-right-4 pr-top-6 pr-flex pr-gap-2">
            <DirToggle direction={direction} onChangeDirection={changeDirectionHandler} />
            <ThemeButton />
          </div>
        </header>
        <div className="pr-flex pr-bg-muted/20">
          <SliderDocs />
          {/* <ButtonDocs /> */}
          {/* <NavigationContentSearchDocs direction={direction} /> */}
        </div>
      </div>
    </div>
  );
}
