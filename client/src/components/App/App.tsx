import React from 'react';
import { Header } from '../Header';
import { roles } from '../../Utils/Resources/constants';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
import { Admin } from '../Admin';
import { useKeycloak } from '@react-keycloak/web';
import { Home } from '../Home';

export const App = (): JSX.Element => {
  const { keycloak } = useKeycloak();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* Customers page for purchasing and viewing tickets */}
        <Route
          path="/tickets"
          element={
            keycloak.hasRealmRole('Customer') ? <Tickets /> : <NotFound />
          }
        />

        {/* Drivers page for inputting ticket code */}
        <Route
          path="/check-ticket"
          element={
            keycloak.hasRealmRole('Driver') ? <CheckTicket /> : <NotFound />
          }
        />

        {/* Admin page for inputting ticket code */}
        <Route
          path="/admin"
          element={keycloak.hasRealmRole('Admin') ? <Admin /> : <NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};
