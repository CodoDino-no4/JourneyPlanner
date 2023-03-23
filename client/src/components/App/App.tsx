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
  const [currentUser, setCurrentUser] = useState<Keycloak>();
  const [userRole, setUserRole] = useState<String>('Guest');
  const kc = new Keycloak(config);

  useEffect(() => {
    const getUser = async () => {
      try {
        await kc.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/silent-check-sso.html',
          checkLoginIframe: false,
          flow: 'implicit',
        });
        if (kc.authenticated) {
          console.log('App Authenticated');
          const user = kc;
          setCurrentUser(user);

          Object.values(roles).forEach((role) => {
            if (user.tokenParsed?.realm_access?.roles[0] === role) {
              setUserRole(role);
              console.log('App', userRole);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  console.log(userRole);

  return (
    <BrowserRouter>
      <Header kc={kc} user={currentUser} userRole={userRole} />
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
