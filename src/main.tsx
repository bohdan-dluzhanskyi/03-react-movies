// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './App';
import 'modern-normalize/modern-normalize.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
