import {
  AppBar,
  Box,
  Button,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { roles } from '../../Utils/Resources/constants';
import { NavLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { useKeycloak } from '@react-keycloak/web';

export const Header = (): JSX.Element => {
  const { keycloak, initialized } = useKeycloak();

  const role = roles.GUEST;

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
          {role === roles.DRIVER && addButton('CHECK TICKET', './checkTicket')}
          {role === roles.CUSTOMER && addButton('TICKETS', './tickets')}
          {role === roles.ADMIN && addButton('ADMIN', './admin')}
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
                await keycloak.login();
              }}
            >
              LOGIN
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
                await keycloak.logout();
              }}
            >
              LOGOUT
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
