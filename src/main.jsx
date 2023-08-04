/* 
  MATERIAL UI
  // yarn add @mui/material @mui/styled-engine-sc styled-components
  // yarn add @mui/icons-material
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import { store } from './store';

import { JournalApp } from './JournalApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
