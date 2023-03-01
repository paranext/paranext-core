import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { DockMode, TabData } from 'rc-dock';
import ParanextDockLayout from './Components/docking/ParanextDockLayout';

const Hello = () => {
  // This object is necessary for Typescript to not complain, but it isn't actually needed
  // to be part of the tab saved data.
  const tab: TabData = {
    content: <> </>,
    title: <> </>,
  };

  // NOTE: This structure represents what might be saved in a saved layout and
  // thus looks different than a normal rc-dock layout. This is also why it's not
  // typed to rc-dock.LayoutData.
  const defaultLayout = {
    dockbox: {
      mode: 'horizontal' as DockMode,
      children: [
        {
          mode: 'vertical' as DockMode,
          size: 200,
          children: [
            {
              tabs: [
                {
                  ...tab,
                  type: 'tab',
                  data: '{"title":"Bla","content":"Random content!"}',
                  minWidth: 150,
                  minHeight: 150,
                },
              ],
            },
            {
              tabs: [
                {
                  ...tab,
                  type: 'tab',
                  data: '{"title":"two","content":"Content for tab two"}',
                },
                {
                  ...tab,
                  type: 'tab',
                  data: '{"title":"one","content":"Content for tab one"}',
                },
              ],
            },
          ],
        },
        {
          tabs: [
            {
              ...tab,
              type: 'hello',
            },
            {
              ...tab,
              type: 'buttons',
            },
          ],
        },
      ],
    },
  };

  return (
    <div>
      <ParanextDockLayout startingLayout={defaultLayout} />
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
