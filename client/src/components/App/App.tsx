import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { roles } from '../../Utils/Resources/constants';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
import { Admin } from '../Admin';
import { Home } from '../Home';
import { LinearProgress } from '@mui/material';
import Keycloak from 'keycloak-js';
import config from '../../keycloak.json';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* Customers page for purchasing and viewing tickets */}
        {/* <Route
          path="/tickets"
          element={
            user.realm_access[0] === 'Customer' ? <Tickets /> : <NotFound />
          }
        /> */}

        {/* Drivers page for inputting ticket code */}
        {/* <Route
          path="/check-ticket"
          element={
            user.realm_access[0] === 'Driver' ? <CheckTicket /> : <NotFound />
          }
        /> */}

        {/* Admin page for inputting ticket code */}
        {/* <Route
          path="/admin"
          element={
            user.realm_access[0] === 'Admin' ? <Admin /> : <NotFound />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};
