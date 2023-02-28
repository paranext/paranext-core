import { createRoot } from 'react-dom/client';
import * as CommandService from '@shared/services/CommandService';
import App from './App';

// App-wide service setup
CommandService.initialize();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
