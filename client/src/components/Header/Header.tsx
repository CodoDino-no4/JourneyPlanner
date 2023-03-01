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
import { roles } from '../../Utils/constants';
import { NavLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

interface ComponentProps {
  role: string;
}

export const Header = ({ role }: ComponentProps): JSX.Element => {
  const navItems = [];
  if (role === roles.DRIVER) {
    navItems.push('scan');
  }
  if (role === roles.CUSTOMER) {
    navItems.push('tickets');
  }
  if (role !== roles.GUEST) {
    navItems.push('logout');
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
          {navItems.map((page) => (
            <Button
              variant="contained"
              key={page}
              sx={{
                my: 2,
                ml: 6,
                color: 'white',
                display: 'block',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
