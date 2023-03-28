/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginPage(user: string, pass: string): Chainable<Element>;
    loginSubmit(): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}
