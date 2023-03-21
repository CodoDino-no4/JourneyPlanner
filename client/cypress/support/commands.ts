/// <reference types="cypress" />
export {};

Cypress.Commands.add('login', (user: string, pass: string) => {
  console.log(user, pass);

  cy.get('.login-btn').click();

  cy.get('[data-testid="loginButton"]').click();
  cy.get('#username').click().type(user);
  cy.get('#password').click().type(pass);
  cy.get('[type="submit"]').click();
  cy.url().should('contain', 'profile');
});

Cypress.Commands.add('logout', () => {
  cy.get('.logout-btn').click();
});
