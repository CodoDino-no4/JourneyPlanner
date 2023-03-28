export {};
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Admin', () => {
  it('006: As an Attacker posing as an Admin, I cannot access the view-tickets page or API route that is only permitted for a Customer user type', () => {
    cy.loginSubmit();

    cy.visit('/tickets');
    cy.get('.404-err').contains('404 Error');
  });
});
