import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.component';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Document root element not found!');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
