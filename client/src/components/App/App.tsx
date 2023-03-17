import React from 'react';
import { Header } from '../Header';
//import { roles } from '../../Utils/Resources/constants';
import { Button, Typography } from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
//import keycloakClient from '../../keycloak';
//import { useKeycloak } from '@react-keycloak/web';
import { Admin } from '../Admin';
//import { ReactKeycloakProvider } from '@react-keycloak/web';

export const App = (): JSX.Element => {
  //const { keycloak } = useKeycloak();
  const isAuthenticated = true;
  //keycloak.authenticated;
  let userRole = 'Administrator';

  // Object.values(roles).forEach((role) => {
  //   if (keycloak.hasRealmRole(role) === true)
  //   {
  //       userRole = role;
  //   }
  // })

  return (
    //<ReactKeycloakProvider authClient={keycloakClient}>
    <BrowserRouter>
      <Header role={userRole} />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Typography
                variant="h4"
                color="primary.main"
                textAlign={'center'}
                p={'20px'}
              >
                WELCOME, {userRole.toUpperCase()}
              </Typography>
            ) : (
              <Button>LOGIN</Button>
              //onClick={() => keycloak.login()}
            )
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* Customers page for purchasing and viewing tickets */}
        <Route
          path="/tickets"
          element={userRole === 'Customer' ? <Tickets /> : <NotFound />}
        />

        {/* Drivers page for inputting ticket code */}
        <Route
          path="/checkTicket"
          element={userRole === 'Driver' ? <CheckTicket /> : <NotFound />}
        />

        {/* Admin page for inputting ticket code */}
        <Route
          path="/admin"
          element={userRole === 'Administrator' ? <Admin /> : <NotFound />}
        />
        {/* <Route
            path="/logout"
            element={redirect(keycloak.createLogoutUrl())}
          /> */}
      </Routes>
    </BrowserRouter>
    //</ReactKeycloakProvider>
  );
};
