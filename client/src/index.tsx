import { CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import darkTheme from './Utils/Theme/Dark';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloakAuth } from './keycloak';

const theme = responsiveFontSizes(darkTheme);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ReactKeycloakProvider authClient={keycloakAuth}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
);
