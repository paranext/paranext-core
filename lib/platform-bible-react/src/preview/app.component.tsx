import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '..';
import Compositions from './components/advanced.component';
import Basics from './components/basics.component';
import Guide from './components/guide.component';
import Layouts from './components/layouts.component';
import Playground from './components/playground.component';
import { DirToggle, Direction } from './preview-components/direction-toggle';
import { ThemeProvider } from './preview-components/theme-provider.component';
import { ThemeButton } from './preview-components/theme-toggle.component';

function App() {
  const [direction, setDirection] = useState<Direction>('ltr');
  const changeDirectionHandler = (dir: Direction) => setDirection(dir);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="pr-twp pr-p-2">
        <div className="pr-fixed pr-right-4 pr-top-4 pr-flex pr-gap-2">
          <DirToggle direction={direction} onChangeDirection={changeDirectionHandler} />
          <ThemeButton />
        </div>
        <h1 className="pr-pb-4 pr-uppercase">platform-bible-react Preview</h1>
        <p>Edit lib/platform-bible-react/src/preview/components/... and save to see updates</p>
        <Tabs defaultValue="Playground" className="pr-pt-4" dir={direction}>
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
