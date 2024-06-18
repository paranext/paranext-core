import { useState } from 'react';
import './app.component.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '..';
import { ThemeProvider } from './theme-provider.component';
import { ThemeButton } from './theme-toggle.component';
import Basics from './components/basics.component';
import Compositions from './components/compositions.component';
import Examples from './components/examples.component';
import Playground from './components/playground.component';
import { DirToggle, Direction } from './direction-toggle';
import Guide from './components/guide.component';

function App() {
  const [direction, setDirection] = useState<Direction>('ltr');
  const changeDirectionHandler = (dir: Direction) => setDirection(dir);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */}
      <div className="pr-twp pr-p-2 pr-font-sans">
        <div className="pr-fixed pr-right-4 pr-top-4 pr-flex pr-gap-2">
          <DirToggle direction={direction} onChangeDirection={changeDirectionHandler} />
          <ThemeButton />
        </div>
        <h1 className="pr-pb-4 pr-uppercase">platform-bible-react Preview</h1>
        <p>Edit lib/platform-bible-react/src/preview/components/... and save to see updates</p>
        <p>
          Styling variables are defined in styling.css, currently matching the Slate theme, whereas
          ui.shadcn.com uses the Zinc theme (with a deviating --ring 240 5% 64.9%)
        </p>
        <Tabs defaultValue="Playground" className="pr-pt-4" dir={direction}>
          <TabsList>
            <TabsTrigger value="Basics">Basic Components</TabsTrigger>
            <TabsTrigger value="Compositions">Composition Components</TabsTrigger>
            <TabsTrigger value="Examples">Example Layouts</TabsTrigger>
            <TabsTrigger value="Playground">Playground</TabsTrigger>
            <TabsTrigger value="Guide">Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="Basics">
            <Basics direction={direction} />
          </TabsContent>
          <TabsContent value="Compositions">
            <Compositions direction={direction} />
          </TabsContent>
          <TabsContent value="Examples">
            <Examples direction={direction} />
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
