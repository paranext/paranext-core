import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParanextDockLayout from './components/docking/ParanextDockLayout';

const Hello = () => {
  return (
    <div>
      <ParanextDockLayout />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
