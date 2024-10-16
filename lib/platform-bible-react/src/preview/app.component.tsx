import Docs from './newapp.component';
import OldApp from './oldapp.component';
import { ThemeProvider } from './preview-components/theme-provider.component';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="pr-twp tw-p-2">
        <OldApp />
        <Docs />
      </div>
    </ThemeProvider>
  );
}

export default App;
