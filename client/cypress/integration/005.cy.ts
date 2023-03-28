export {};
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Customer', () => {
  it('005: As an Attacker posing as a Customer, I cannot access the administrator interface to modify documents in the database collection.', () => {
    cy.loginSubmit();

    cy.visit('/admin');
    cy.get('.404-err').contains('404 Error');
  });
});
