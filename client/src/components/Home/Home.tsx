import { Box, Typography, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { roles } from '../../Utils/Resources/constants';
import { useKeycloak } from '@react-keycloak/web';

export const Home = (): JSX.Element => {
  const { keycloak, initialized } = useKeycloak();
  const role = roles.DRIVER;

  return (
    <Typography
      variant="h4"
      color="primary.main"
      textAlign={'center'}
      p={'20px'}
    >
      WELCOME, {role.toUpperCase()}
    </Typography>
  );
};
