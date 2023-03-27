import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { roles } from '../../Utils/Resources/constants';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
import { Admin } from '../Admin';
import { Home } from '../Home';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import config from '../../keycloak.json';

export const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<KeycloakInstance>();
  const [userRole, setUserRole] = useState<String>('Guest');
  const kc: KeycloakInstance = new (Keycloak as any)(config);

  useEffect(() => {
    const getUser = async () => {
      try {
        await kc.init({
          checkLoginIframe: false,
          flow: 'implicit',
          redirectUri: 'http://localhost:3000/',
        });
        if (kc.authenticated) {
          const user = kc;
          setCurrentUser(user);

          Object.values(roles).forEach((role) => {
            user.tokenParsed?.realm_access?.roles.forEach((tokenRole) => {
              if (tokenRole === role) {
                setUserRole(role);
              }
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  });

  return (
    <BrowserRouter>
      <Header kc={kc} user={currentUser} userRole={userRole} />
      <Routes>
        <Route path="/" element={<Home userRole={userRole} />} />
        <Route path="*" element={<NotFound />} />
        {/* Customers page for purchasing and viewing tickets */}
        <Route
          path="/tickets"
          element={
            userRole === 'Customer' ? (
              <Tickets userRole={userRole} />
            ) : (
              <NotFound />
            )
          }
        />

        {/* Drivers page for inputting ticket code */}
        <Route
          path="/check-ticket"
          element={
            userRole === 'Driver' ? (
              <CheckTicket userRole={userRole} />
            ) : (
              <NotFound />
            )
          }
        />

        {/* Admin page for inputting ticket code */}
        <Route
          path="/admin"
          element={
            userRole === 'Admin' ? <Admin userRole={userRole} /> : <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
