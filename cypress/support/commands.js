// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('openEmptyDrawer', () => {
        cy.visit('/')
        cy.get('[data-cy="drawer-access-btn"]')
          .should('have.length', 2)
          .and('be.visible')
          .eq(0)
          .click();

        cy.get('[data-cy="drawer-container"]')
          .should('be.visible');
})

Cypress.Commands.add('addFavoriteActivity', () => {
    cy.get('[data-cy="category-btn"]')
      .eq(2)
      .click()
    cy.get('[data-cy="addFavorite-btn"]')
      .click()
})

Cypress.Commands.add('openBottomDrawer', () => {
  cy.get('[data-cy="bottom-drawer-icon"]')
    .should('be.visible')
    .click()
})
