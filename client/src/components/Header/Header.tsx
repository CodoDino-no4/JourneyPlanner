import { AppBar, ListItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { roles } from '../../Utils/constants';
import { NavLink } from 'react-router-dom'

interface ComponentProps {
  role: string;
}

export const Header = ({role}: ComponentProps): JSX.Element => {

  const navItems = ['home'];
  if (role !== roles.GUEST)
  {
    navItems.push('logout');
  }
  if (role === roles.DRIVER) {
    navItems.push('scan')
  }
  if (role === roles.CUSTOMER) {
    navItems.push('tickets',)
  }


  return (
        <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Journey Planner
        </Typography>
        {navItems.map((item) => (
          <ListItem
            key={item}
            component={NavLink}
            to={item}
          >
            {item}
          </ListItem>
        ))}
      </Toolbar>
    </AppBar>
  );
};