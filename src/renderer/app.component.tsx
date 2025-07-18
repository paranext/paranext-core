import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { UsersnapProvider } from '@renderer/components/usersnap';
// import { UsersnapIntegrationExample } from '@renderer/components/usersnap/usersnap-integration-example';
import './app.component.scss';
import { NotificationDisplay } from './components/notification-display';
import { PlatformBibleToolbar } from './components/platform-bible-toolbar';

function Main() {
  return (
    <UsersnapProvider>
      <TestContext.Provider value="test">
        <PlatformBibleToolbar />
        <PlatformDockLayout />
        <NotificationDisplay />
        {/* <UsersnapIntegrationExample /> */}
      </TestContext.Provider>
    </UsersnapProvider>
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
