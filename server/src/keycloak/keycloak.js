import Keycloak from 'keycloak-js';

const keycloakAuth = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'jp-realm',
  clientId: 'jp-server',
});

export { keycloakAuth };
