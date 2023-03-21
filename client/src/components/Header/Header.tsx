import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { roles } from '../../Utils/Resources/constants';
import { NavLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { useKeycloak } from '@react-keycloak/web';

export const Header = (): JSX.Element => {
  const { keycloak } = useKeycloak();

  console.log(keycloak.authenticated);

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
          {keycloak.hasRealmRole('Driver') &&
            addButton('CHECK TICKET', './checkTicket')}
          {keycloak.hasRealmRole('Customer') &&
            addButton('TICKETS', './tickets')}
          {keycloak.hasRealmRole('Admin') && addButton('ADMIN', './admin')}
          {keycloak.authenticated ? (
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
                await keycloak.logout();
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
              onClick={async () => {
                await keycloak.login();
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
