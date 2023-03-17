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
import keycloak from '../../keycloak';

interface ComponentProps {
  role: string;
}

export const Header = ({ role }: ComponentProps): JSX.Element => {
  const navItems = [];
  if (role === roles.ADMIN) {
    navItems.push(['admin', './admin']);
  }
  if (role === roles.CUSTOMER) {
    navItems.push(['tickets', './tickets']);
  }
  if (role === roles.DRIVER) {
    navItems.push(['check ticket', './checkTicket']);
  }

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
          {navItems.map((page, index) => (
            <Button
              variant="contained"
              key={index}
              sx={{
                my: 2,
                ml: 6,
                color: 'white',
                display: 'block',
                fontWeight: 700,
                fontSize: 15,
              }}
              to={page[1]}
              component={NavLink}
            >
              {page[0]}
            </Button>
          ))}
        </Box>
        <Box>
          <Button
            id={'logout'}
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
              keycloak.logout();
            }}
          >
            LOGOUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
