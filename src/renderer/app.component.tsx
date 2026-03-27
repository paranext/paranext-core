import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { SimpleModeProvider } from '@renderer/components/simple-mode/simple-mode-context';
import SimpleModeLayout from '@renderer/components/simple-mode/simple-mode-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { isPlatformError } from 'platform-bible-utils';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './app.component.scss';
import { NotificationDisplay } from './components/notification-display';
import { PlatformBibleToolbar, InterfaceMode } from './components/platform-bible-toolbar';

function Main() {
  const [interfaceMode] = useSetting('platform.interfaceMode', 'simple');
  const effectiveMode: InterfaceMode = isPlatformError(interfaceMode) ? 'simple' : interfaceMode;
  const isSimple = effectiveMode === 'simple';

  const content = isSimple ? (
    <SimpleModeProvider>
      <PlatformBibleToolbar mode="simple" />
      <SimpleModeLayout />
    </SimpleModeProvider>
  ) : (
    <>
      <PlatformBibleToolbar mode="power" />
    </>
  );

  return (
    <TestContext.Provider value="test">
      {content}
      {/* PlatformDockLayout stays mounted so webview service registration persists.
          Hidden in simple mode to avoid rendering the dock UI. */}
      <div style={isSimple ? { display: 'none' } : undefined}>
        <PlatformDockLayout />
      </div>
      <NotificationDisplay />
    </TestContext.Provider>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
