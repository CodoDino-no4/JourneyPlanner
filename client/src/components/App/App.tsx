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
            if (user.tokenParsed?.realm_access?.roles[0] === role) {
              setUserRole(role);
            }
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

// scheme
// 	http
// host
// 	localhost:8080
// filename
// 	/auth/realms/jp-realm/protocol/openid-connect/auth
// client_id
// 	jp-client
// redirect_uri
// 	http://localhost:3000/
// state
// 	dc6f40a7-00c4-48f3-86cd-0f953d6e15e4
// response_mode
// 	fragment
// response_type
// 	id_token token
// scope
// 	openid
// nonce
// 	e8b26e07-0b78-41f5-88a5-16c52567a046
