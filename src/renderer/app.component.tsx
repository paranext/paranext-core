import { useEffect } from 'react';
import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './app.component.scss';
import { NotificationDisplay } from './components/notification-display';
import { OverlayHost } from './components/overlay-host.component';
import { WorkspaceUpdatingOverlay } from './components/overlays/overlay-workspace-updating.component';
import { PlatformBibleToolbar } from './components/platform-bible-toolbar';
import { initWorkspaceUpdatingService } from './services/workspace-updating-service';

function Main() {
  useEffect(() => initWorkspaceUpdatingService(), []);

  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar />
      <PlatformDockLayout />
      <NotificationDisplay />
      <OverlayHost />
      <WorkspaceUpdatingOverlay />
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
