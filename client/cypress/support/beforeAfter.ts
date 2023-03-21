import './commands';
import { Users } from './testUsers';
export {};

before(() => {
  // root-level hook
  // runs once before all tests
});

let user: string;
let pass: string;

beforeEach(() => {
  // root-level hook
  // runs before every test block
  cy.visit('/');
  cy.clearCookies({ domain: undefined });

  const testUser = Cypress.currentTest.titlePath[0];

  for (const [key, value] of Object.entries(Users)) {
    if (key === testUser) {
      user = value.user;
      pass = value.pass;
    }
  }

  cy.login(user, pass);
});

afterEach(() => {
  // runs after each test block
});

after(() => {
  // runs once all tests are done
});
