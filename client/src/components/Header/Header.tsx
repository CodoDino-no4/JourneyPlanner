import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { roles } from '../../Utils/Resources/constants';
import { NavLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Keycloak from 'keycloak-js';
import config from '../../keycloak.json';

export const Header = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<Keycloak>();
  const kc = new Keycloak(config);

  useEffect(() => {
    const getUser = async () => {
      try {
        await kc.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/silent-check-sso.html',
          checkLoginIframe: false,
          flow: 'implicit',
        });
        if (kc.authenticated) {
          console.log('Authenticated');
          const user = kc;
          setCurrentUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  console.log(currentUser);

  const addButton = (text: string, link: string) => {
    return (
      <Button
        variant="contained"
        sx={{
          my: 2,
          ml: 6,
          color: 'white',
          display: 'block',
          fontWeight: 700,
          fontSize: 15,
        }}
        to={link}
        component={NavLink}
      >
        {text}
      </Button>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: 'flex',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <DirectionsBusIcon sx={{ margin: 'auto' }} />
          JOURNEY PLANNER
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
          {currentUser?.tokenParsed?.realm_access?.roles[0] === 'Driver' &&
            addButton('CHECK TICKET', './checkTicket')}
          {currentUser?.tokenParsed?.realm_access?.roles[0] === 'Customer' &&
            addButton('TICKETS', './tickets')}
          {currentUser?.tokenParsed?.realm_access?.roles[0] === 'Admin' &&
            addButton('ADMIN', './admin')}
          {currentUser?.authenticated ? (
            <Button
              variant="contained"
              sx={{
                my: 2,
                ml: 6,
                color: 'white',
                display: 'block',
                fontWeight: 700,
                fontSize: 15,
              }}
              onClick={() => {
                currentUser?.logout();
              }}
            >
              LOGOUT
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                my: 2,
                ml: 6,
                color: 'white',
                display: 'block',
                fontWeight: 700,
                fontSize: 15,
              }}
              onClick={() => {
                kc.login();
              }}
            >
              LOGIN
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
