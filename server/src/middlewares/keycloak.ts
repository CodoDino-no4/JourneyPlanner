import config from '../keycloak.json';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const memoryStore = new session.MemoryStore();

const keycloak: any = new (Keycloak as any)({ store: memoryStore }, config);

export { keycloak };
