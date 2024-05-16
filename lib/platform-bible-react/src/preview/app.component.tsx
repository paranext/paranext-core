import './app.component.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '..';
import { ThemeProvider } from './theme-provider';
import ThemeToggle from './theme-toggle';
import Basics from './components/basics';
import Compositions from './components/compositions';
import Examples from './components/examples';
import Playground from './components/playground';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="pr-twp pr-p-2">
        <ThemeToggle className="pr-fixed pr-right-4 pr-top-4" />
        <h1 className="pr-pb-4 pr-uppercase">platform-bible-react Preview</h1>
        <p>
          Edit <code>lib\platform-bible-react\src\preview\components</code> and save to see updates
        </p>
        <p>
          Caution, things will look distorted if <i>scopedPreflightStyles</i> is activated in&nbsp;
          <code>tailwind.config.ts</code>
        </p>
        <Tabs defaultValue="Playground" className="pr-pt-4">
          <TabsList>
            <TabsTrigger value="Basics">Basic Components</TabsTrigger>
            <TabsTrigger value="Compositions">Composition Components</TabsTrigger>
            <TabsTrigger value="Examples">Example Layouts</TabsTrigger>
            <TabsTrigger value="Playground">Playground</TabsTrigger>
          </TabsList>
          <hr />
          <TabsContent value="Basics">
            <Basics />
          </TabsContent>
          <TabsContent value="Compositions">
            <Compositions />
          </TabsContent>
          <TabsContent value="Examples">
            <Examples />
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
