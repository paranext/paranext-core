import './app.component.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '..';
import { ThemeProvider } from './theme-provider.component';
import ThemeToggle from './theme-toggle.component';
import Basics from './components/basics.component';
import Compositions from './components/compositions.component';
import Examples from './components/examples.component';
import Playground from './components/playground.component';
import ScriptureItemListPreview from './components/scripture-item-list-preview.component';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */}
      <div className="pr-twp pr-p-2 pr-font-sans">
        <ThemeToggle className="pr-fixed pr-right-4 pr-top-4" />
        <h1 className="pr-pb-4 pr-uppercase">platform-bible-react Preview</h1>
        <p>Edit lib/platform-bible-react/src/preview/components/... and save to see updates</p>
        <p>
          Styling variables are defined in styling.css, currently matching the Slate theme, whereas
          ui.shadcn.com uses the Zinc theme (with a deviating --ring 240 5% 64.9%)
        </p>
        <Tabs defaultValue="Playground" className="pr-pt-4">
          <TabsList>
            <TabsTrigger value="Basics">Basic Components</TabsTrigger>
            <TabsTrigger value="Compositions">Composition Components</TabsTrigger>
            <TabsTrigger value="Examples">Example Layouts</TabsTrigger>
            <TabsTrigger value="Scripture Item List">Scripture Item List</TabsTrigger>
            <TabsTrigger value="Playground">Playground</TabsTrigger>
          </TabsList>

          <TabsContent value="Basics">
            <Basics />
          </TabsContent>
          <TabsContent value="Compositions">
            <Compositions />
          </TabsContent>
          <TabsContent value="Examples">
            <Examples />
          </TabsContent>
          <TabsContent value="Scripture Item List">
            <ScriptureItemListPreview />
          </TabsContent>
          <TabsContent value="Playground">
            <Playground />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
