/// <reference types="cypress" />
export {};

Cypress.Commands.add('loginPage', (user: string, pass: string) => {
  console.log(user, pass);

  cy.get('.login-btn').click();
  cy.get('#username').type(user);
  cy.get('#password').type(pass);
});

Cypress.Commands.add('loginSubmit', () => {
  cy.get('#kc-login').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('.logout-btn').click();
});
