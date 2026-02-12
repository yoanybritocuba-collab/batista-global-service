import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css'; // Añade esta línea
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
