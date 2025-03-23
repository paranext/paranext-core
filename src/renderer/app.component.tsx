import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './app.component.scss';
import PlatformDockLayout from '@renderer/components/docking/platform-dock-layout.component';
import TestContext from '@renderer/context/papi-context/test.context';
import PlatformBibleToolbar from './components/platform-bible-toolbar';
import NotificationDisplay from './components/notification-display';

function Main() {
  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar />
      <PlatformDockLayout />
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
