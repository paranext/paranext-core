import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './app.component.css';
import ParanextDockLayout from '@renderer/components/docking/paranext-dock-layout.component';
import TestContext from '@renderer/context/papi-context/test.context';
import PlatformBibleToolbar from './components/platform-bible-toolbar';

function Main() {
  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar />
      <ParanextDockLayout />
    </TestContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
