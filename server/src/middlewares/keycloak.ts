import config from '../keycloak.json';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import { log } from './logger';

let keycloak: any;

const initKeycloak = () => {
  if (keycloak) {
    console.warn('Trying to init Keycloak again!');
    return keycloak;
  } else {
    console.log('Initializing Keycloak...');
    const memoryStore = new session.MemoryStore();
    keycloak = new Keycloak({ store: memoryStore }, config);
    log.info(keycloak);
    //This package is deprecated and doesnt work
    //There are no alternatives for this package. Backend protection with keycloak and node.js is not possible.
    return keycloak;
  }
};

const getKeycloak = () => {
  if (!keycloak) {
    console.error('Keycloak has not been initialized. Please call init first.');
  }
  return keycloak;
};

export { initKeycloak, getKeycloak };
