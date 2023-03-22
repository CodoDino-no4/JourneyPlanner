import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { roles } from '../../Utils/Resources/constants';
import { NavLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

interface props {
  keycloakAuth: any;
}

export const Header = ({ keycloakAuth }: props): JSX.Element => {
  const login = useCallback(() => {
    keycloakAuth.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false,
      flow: 'implicit',
    });

    keycloakAuth.clientSecret = process.env.SECRET;
    keycloakAuth?.login();
  }, [keycloakAuth]);

  console.log(keycloakAuth);

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
          {keycloakAuth.hasRealmRole('Driver') &&
            addButton('CHECK TICKET', './checkTicket')}
          {keycloakAuth.hasRealmRole('Customer') &&
            addButton('TICKETS', './tickets')}
          {keycloakAuth.hasRealmRole('Admin') && addButton('ADMIN', './admin')}
          {keycloakAuth.authenticated ? (
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
              onClick={async () => {
                await keycloakAuth.logout();
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
              onClick={login}
            >
              LOGIN
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
