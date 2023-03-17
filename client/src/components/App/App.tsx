import React, { Fragment, Suspense } from 'react';
import { Header } from '../Header';
import { roles } from '../../Utils/Resources/constants';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  Router,
  Routes,
  Route,
  BrowserRouter,
  redirect,
} from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
import { keycloakAuth } from '../../keycloak/keycloak';
import { Admin } from '../Admin';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import PrivateRoute from '../../keycloak/PrivateRoute';
import { Home } from '../Home';

export const App = (): JSX.Element => {
  let userRole = 'Customer';

  // Object.values(roles).forEach((role) => {
  //   if (keycloak.hasRealmRole(role) === true)
  //   {
  //       userRole = role;
  //   }
  // })

  return (
    <ReactKeycloakProvider authClient={keycloakAuth}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          {/* Customers page for purchasing and viewing tickets */}
          <Route
            path="/tickets"
            element={
              <PrivateRoute>
                {' '}
                <Tickets />{' '}
              </PrivateRoute>
            }
          />

          {/* Drivers page for inputting ticket code */}
          <Route
            path="/checkTicket"
            element={
              <PrivateRoute>
                {' '}
                <CheckTicket />{' '}
              </PrivateRoute>
            }
          />

          {/* Admin page for inputting ticket code */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                {' '}
                <Admin />{' '}
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};
