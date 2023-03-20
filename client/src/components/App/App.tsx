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
  const isAuthenticated = keycloak.authenticated;

  let userRole = 'Driver';

  // if (isAuthenticated) {
  //   Object.values(roles).forEach((role) => {
  //     if (keycloak.hasRealmRole(role)) {
  //       userRole = role;
  //     } else {
  //       userRole = 'Guest';
  //     }
  //   });
  // }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* Customers page for purchasing and viewing tickets */}
        <Route
          path="/tickets"
          element={userRole === 'Customer' ? <Tickets /> : <NotFound />}
        />

        {/* Drivers page for inputting ticket code */}
        <Route
          path="/check-ticket"
          element={userRole === 'Driver' ? <CheckTicket /> : <NotFound />}
        />

        {/* Admin page for inputting ticket code */}
        <Route
          path="/admin"
          element={userRole === 'Admin' ? <Admin /> : <NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};
