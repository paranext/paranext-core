import { useCallback, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import usePromise from './hooks/usePromise';

const Hello = () => {
  const [edgeReturn, setEdgeReturn] = useState('');

  const [EDGE_USE_CORECLR] = usePromise(
    useCallback(() => window.electronAPI.env.getVar('EDGE_USE_CORECLR'), []),
    'retrieving',
  );

  const [EDGE_APP_ROOT] = usePromise(
    useCallback(() => window.electronAPI.env.getVar('EDGE_APP_ROOT'), []),
    'retrieving',
  );

  const [EDGE_BOOTSTRAP_DIR] = usePromise(
    useCallback(() => window.electronAPI.env.getVar('EDGE_BOOTSTRAP_DIR'), []),
    'retrieving',
  );

  const edgeInvoke = useCallback(
    (name: string) => {
      return window.electronAPI.edge
        .invoke(name, 'Node!')
        .then((result) => {
          console.log(result);
          setEdgeReturn(result);
          return undefined;
        })
        .catch((e) => {
          console.error(e);
          console.error('TEST!');
          setEdgeReturn(e.message);
          return undefined;
        });
    },
    [setEdgeReturn],
  );

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
          onClick={() => edgeInvoke('EdgeMethods.UseDynamicInput')}
        >
          Test Edge Input
        </button>
        <button
          type="button"
          onClick={() => edgeInvoke('EdgeMethods.ThrowException')}
        >
          Test Edge Exception
        </button>
        <button
          type="button"
          onClick={() => {
            window.electronAPI.env
              .test()
              .then((result) => {
                console.log(result);
                setEdgeReturn(result);
                return undefined;
              })
              .catch((e) => {
                console.error(e);
                setEdgeReturn(e.message);
                return undefined;
              });
          }}
        >
          Test
        </button>
      </div>
      <div className="Hello">
        <div>EDGE_USE_CORECLR: {EDGE_USE_CORECLR}</div>
        <div>EDGE_APP_ROOT: {EDGE_APP_ROOT}</div>
        <div>EDGE_BOOTSTRAP_DIR: {EDGE_BOOTSTRAP_DIR}</div>
        <div>{edgeReturn}</div>
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
