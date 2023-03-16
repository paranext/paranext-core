import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParanextDockLayout from '@renderer/components/docking/ParanextDockLayout';
import TestContext from '@renderer/context/papi-context/TestContext';

function Hello() {
  return (
    <TestContext.Provider value="test">
      <ParanextDockLayout />
    </TestContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
