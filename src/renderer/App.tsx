import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="Hello">
        <h1>Paranext</h1>
      </div>
      <div className="Hello">
        <button
          type="button"
          onClick={() => {
            window.electronAPI.edge
              .invoke('EdgeMethods.UseDynamicInput', 'Node!')
              .then((result) => console.log(result))
              .catch((e) => console.error(e));
          }}
        >
          Test Edge
        </button>
      </div>
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
