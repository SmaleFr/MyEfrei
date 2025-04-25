// frontend/client/index.js
import React from 'react';
import { hydrateRoot } from 'react-dom/client'; 
import App from '../src/App.jsx';                  

const container = document.getElementById('root');
hydrateRoot(container, <App />);