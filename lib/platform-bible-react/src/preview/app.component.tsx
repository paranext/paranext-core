import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '..';
import Compositions from './pages/components/advanced.component';
import Basics from './pages/components/basics.component';
import Guide from './pages/guide.component';
import Layouts from './pages/layouts.component';
import Playground from './pages/playground.component';
import { DirToggle, Direction } from './preview-components/direction-toggle.component';
import { ThemeProvider } from './preview-components/theme-provider.component';
import { ThemeButton } from './preview-components/theme-toggle.component';
import ContactButtons from './preview-components/contact-buttons.component';

function App() {
  const [direction, setDirection] = useState<Direction>('ltr');
  const changeDirectionHandler = (dir: Direction) => setDirection(dir);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="pr-twp tw-p-2">
        <div className="tw-fixed tw-right-4 tw-top-4 tw-flex tw-gap-2">
          <DirToggle direction={direction} onChangeDirection={changeDirectionHandler} />
          <ThemeButton />
        </div>
        <div className="tw-fixed tw-bottom-2 tw-right-4 tw-flex tw-gap-2">
          <ContactButtons />
        </div>
        <h1 className="tw-pb-4 tw-uppercase">platform-bible-react Preview</h1>
        <Tabs defaultValue="Playground" className="tw-pt-4" dir={direction}>
          <TabsList>
            <TabsTrigger value="Basics">Basic Components</TabsTrigger>
            <TabsTrigger value="Advanced">Advanced Components</TabsTrigger>
            <TabsTrigger value="Layouts">Example Layouts</TabsTrigger>
            <TabsTrigger value="Playground">Playground</TabsTrigger>
            <TabsTrigger value="Guide">Guide & Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="Basics">
            <Basics direction={direction} />
          </TabsContent>
          <TabsContent value="Advanced">
            <Compositions direction={direction} />
          </TabsContent>
          <TabsContent value="Layouts">
            <Layouts direction={direction} />
          </TabsContent>
          <TabsContent value="Playground">
            <Playground />
          </TabsContent>
          <TabsContent value="Guide">
            <Guide direction={direction} onChangeDirection={changeDirectionHandler} />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
