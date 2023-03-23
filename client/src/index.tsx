import { CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Keycloak from 'keycloak-js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import darkTheme from './Utils/Theme/Dark';
import config from './keycloak.json';

const theme = responsiveFontSizes(darkTheme);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
