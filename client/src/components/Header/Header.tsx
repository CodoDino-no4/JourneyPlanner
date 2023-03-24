import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { KeycloakInstance } from 'keycloak-js';

interface props {
  kc: KeycloakInstance;
  user: KeycloakInstance | undefined;
  userRole: String;
}

export const Header = ({ kc, user, userRole }: props): JSX.Element => {
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
          {userRole === 'Driver' && addButton('CHECK TICKET', './check-ticket')}
          {userRole === 'Customer' && addButton('TICKETS', './tickets')}
          {userRole === 'Admin' && addButton('ADMIN', './admin')}
          {userRole !== 'Guest' ? (
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
                user?.logout();
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
