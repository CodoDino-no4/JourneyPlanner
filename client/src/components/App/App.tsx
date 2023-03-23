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
        <Route path="/tickets" element={<Tickets />} />

        {/* Drivers page for inputting ticket code */}
        <Route path="/check-ticket" element={<CheckTicket />} />

        {/* Admin page for inputting ticket code */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};
