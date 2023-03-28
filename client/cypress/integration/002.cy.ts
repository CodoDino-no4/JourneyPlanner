export {};
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Admin', () => {
  it('002: As an Attacker attempting to spoof an Administrator’s user account, I cannot gain access to the unencrypted value of the password field.', () => {
    cy.get('#password').should('not.have.value', 'Admin');
  });
});
