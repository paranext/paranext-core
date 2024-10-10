import Docs from './newapp.component';
import OldApp from './oldapp.component';
import { ThemeProvider } from './preview-components/theme-provider.component';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="tw-p-2 pr-twp">
        <OldApp />
        <Docs />
      </div>
    </ThemeProvider>
  );
}

export default App;
