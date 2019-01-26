describe('Delete activities from UI', () => {
  it('Delete an activity that was added to favorites by clicking on trash icon', () => {
    cy.visit('/')
    cy.addFavoriteActivity()
      cy.get('[data-cy="drawer-access-btn"]')
        .eq(0)
        .click()

        cy.get('[data-cy="drawer-list-item"]')
          .should('be.visible')
          .and('have.length', 1)

        cy.get('[data-cy="delete-icon"]')
          .click()

        cy.get('[data-cy="drawer-list-item"]')
          .should('not.be.visible')
          .and('have.length', 0)
  })
})
