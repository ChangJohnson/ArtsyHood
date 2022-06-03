import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import GlobalProvider from './components/GlobalComponents';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
