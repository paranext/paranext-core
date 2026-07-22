import { useEffect } from 'react';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './app.component.scss';
// PT-3920: emit Tailwind `tw:` utilities from core's own source. See src/renderer/styles/tailwind.css.
import './styles/tailwind.css';
import { NotificationDisplay } from './components/notification-display';
import { OverlayHost } from './components/overlay-host.component';
import { WorkspaceUpdatingOverlay } from './components/overlays/overlay-workspace-updating.component';
import { PlatformBibleToolbar } from './components/platform-bible-toolbar';
import { FirstRunOverlay } from './components/first-run/first-run-overlay.component';
import { initWorkspaceUpdatingService } from './services/workspace-updating-service';
import { resolveFirstRunState } from './services/first-run-store';

function Main() {
  useEffect(() => initWorkspaceUpdatingService(), []);
  useEffect(() => {
    // Fire-and-forget; resolveFirstRunState is idempotent so a StrictMode double-invoke is safe.
    resolveFirstRunState();
  }, []);

  const isPowerMode = useIsPowerMode();
  useEffect(() => {
    document.body.setAttribute('data-interface-mode', isPowerMode ? 'power' : 'simple');
    // Main never unmounts during the app's actual lifetime, so this cleanup is inert in
    // production; it exists so the attribute doesn't leak past test teardown/StrictMode
    // double-invoke, matching the general rule of pairing a DOM side effect with its cleanup.
    return () => document.body.removeAttribute('data-interface-mode');
  }, [isPowerMode]);

  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar />
      <PlatformDockLayout />
      <NotificationDisplay />
      <OverlayHost />
      <WorkspaceUpdatingOverlay />
      <FirstRunOverlay />
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
