import React from 'react';
import { Header } from '../Header';
import { roles } from '../../Utils/Resources/constants';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
import { Admin } from '../Admin';
import { Home } from '../Home';
import { LinearProgress } from '@mui/material';

interface props {
  keycloakAuth: any;
}

export const App = ({ keycloakAuth }: props): JSX.Element => {
  return (
    <BrowserRouter>
      <Header keycloakAuth={keycloakAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* Customers page for purchasing and viewing tickets */}
        <Route
          path="/tickets"
          element={
            keycloakAuth.hasRealmRole('Customer') ? <Tickets /> : <NotFound />
          }
        />

        {/* Drivers page for inputting ticket code */}
        <Route
          path="/check-ticket"
          element={
            keycloakAuth.hasRealmRole('Driver') ? <CheckTicket /> : <NotFound />
          }
        />

        {/* Admin page for inputting ticket code */}
        <Route
          path="/admin"
          element={
            keycloakAuth.hasRealmRole('Admin') ? <Admin /> : <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
