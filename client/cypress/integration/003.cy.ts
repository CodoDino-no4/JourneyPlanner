export {};
// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../../support" />

describe('Customer', () => {
  it('003: As an Attacker attempting to compromise an account by checking the account password policy, I cannot enter a weak password that does not have at least: one number, one uppercase letter, one lowercase letter and one special character.', () => {
    cy.get('#kc-registration > span > a').click();
    cy.scrollTo('bottom');
    cy.get('#firstName').type('Testing');
    cy.get('#lastName').type('Account');
    cy.get('#email').type('test@localhost.com');
    cy.get('#password').type('weakp');
    cy.get('#password-confirm').type('weakp');
    cy.get('.pf-c-button').click();

    cy.get('#input-error-password').contains(
      'Invalid password: must contain at least 1 special characters.'
    );

    cy.get('#password').type('weakp!');
    cy.get('#password-confirm').type('weakp!');
    cy.get('.pf-c-button').click();

    cy.get('#input-error-password').contains(
      'Invalid password: must contain at least 1 upper case characters.'
    );

    cy.get('#password').type('Weakp!');
    cy.get('#password-confirm').type('Weakp!');
    cy.get('.pf-c-button').click();

    cy.get('#input-error-password').contains(
      'Invalid password: minimum length 8.'
    );

    cy.get('#password').type('Weakpassword!');
    cy.get('#password-confirm').type('Weakpassword!');
    cy.get('.pf-c-button').click();

    cy.get('#input-error-password').contains(
      'Invalid password: must contain at least 1 numerical digits.'
    );

    cy.get('#password').type('Weakpassword!1');
    cy.get('#password-confirm').type('Weakpassword!1');
    cy.get('.pf-c-button').click();
  });
});
