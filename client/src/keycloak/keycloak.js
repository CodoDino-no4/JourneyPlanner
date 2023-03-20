import Keycloak from 'keycloak-js';

const keycloakAuth = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'JPRealm',
  clientId: 'JourneyPlanner',
});

export { keycloakAuth };
