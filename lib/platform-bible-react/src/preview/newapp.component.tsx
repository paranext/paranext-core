import { useState } from 'react';
// import { ScrollArea } from '@/components/shadcn-ui/scroll-area';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { MenuIcon } from 'lucide-react';
import SliderDocs from './newpages/components/slider.docs.component';
import ContactButtons2 from './newpreview-components/contact-buttons.component';
import Nav, { Page } from './newpreview-components/nav.component';
import { Direction, DirToggle } from './preview-components/direction-toggle.component';
import { ThemeButton } from './preview-components/theme-toggle.component';

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
    <div className="tw-flex tw-min-h-screen tw-bg-background">
      <aside
        className={`tw-w-64 tw-border-r tw-bg-background ${sidebarOpen ? 'tw-block' : 'tw-hidden'} lg:tw-block`}
      >
        <div className="tw-flex tw-h-16 tw-items-center tw-justify-center tw-border-b tw-p-4">
          Platform.Bible Design System
        </div>
        <div className="tw-flex tw-gap-1 tw-pt-4">
          <ContactButtons2 />
        </div>
        {/* <ScrollArea className="h-[calc(100vh-4rem)]"> */}
        <div className="tw-p-2 tw-py-4">
          <Input type="search" placeholder="Search..." className="tw-w-full tw-border" />
        </div>
        <Nav pages={pages} />
        {/* </ScrollArea> */}
      </aside>
      <div className="tw-flex-1">
        <header className="tw-flex tw-h-16 tw-items-center tw-justify-between tw-border-b tw-p-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:tw-hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="tw-h-6 tw-w-6" />
            <span className="tw-sr-only">Toggle sidebar</span>
          </Button>
          <div className="tw-fixed tw-right-4 tw-top-6 tw-flex tw-gap-2">
            <DirToggle direction={direction} onChangeDirection={changeDirectionHandler} />
            <ThemeButton />
          </div>
        </header>
        <div className="tw-flex tw-bg-muted/20">
          <SliderDocs />
          {/* <ButtonDocs /> */}
          {/* <NavigationContentSearchDocs direction={direction} /> */}
        </div>
      </div>
    </div>
  );
}
