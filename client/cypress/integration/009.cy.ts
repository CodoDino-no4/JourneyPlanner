export {};
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Customer', () => {
  it('009: As an Attacker posing as an Customer, I cannot access the check-ticket page or API route that is only permitted for a Driver user type', () => {
    cy.loginSubmit();

    cy.visit('/check-ticket');
    cy.get('.404-err').contains('404 Error');
  });
});
