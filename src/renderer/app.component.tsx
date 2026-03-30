import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { SimpleModeLayout } from '@renderer/components/simple-mode/simple-mode-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './app.component.scss';
import { NotificationDisplay } from './components/notification-display';
import { PlatformBibleToolbar } from './components/platform-bible-toolbar';

function Main() {
  const [interfaceMode] = useSetting('platform.interfaceMode', 'simple');

  return (
    <TestContext.Provider value="test">
      {interfaceMode === 'simple' ? (
        <SimpleModeLayout />
      ) : (
        <>
          <PlatformBibleToolbar />
          <PlatformDockLayout />
        </>
      )}
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
