import { CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Keycloak from 'keycloak-js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import darkTheme from './Utils/Theme/Dark';
import config from './keycloak.json';

const theme = responsiveFontSizes(darkTheme);

const kc = new Keycloak(config);

const eventLogger = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error);
  //onEvent
};

const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens);
  //onTokens
};

kc.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  checkLoginIframe: false,
  flow: 'implicit',
})
  .then((authenticated) => {
    if (!authenticated) {
      console.log(kc);
    } else {
      console.log(kc);
    }
  })
  .catch(console.error);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App keycloakAuth={kc} />
  </ThemeProvider>
);
