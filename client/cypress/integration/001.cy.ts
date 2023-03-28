export {};
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Driver', () => {
  it('001: As an Attacker spoofing a Driver’s user account, I cannot inject HTML code into an input field to send an unauthorised API requests.', () => {
    const input = '<script>console.log(Ticket.find({}))</script>';

    cy.loginSubmit();

    cy.get('.check').click();
    cy.get('.code-input').type(input);
    cy.get('.submitButton').click();

    cy.get('.alert-msg');
    cy.contains('404');

    cy.request({
      method: 'get',
      url: `http://localhost:3001/api/check-ticket?ticket_code=${input}`,
      failOnStatusCode: false,
    }).as('check');

    cy.get('@check').then((response: any) => {
      expect(response.status).equal(400);
    });
  });
});
