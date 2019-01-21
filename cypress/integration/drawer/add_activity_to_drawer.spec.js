describe('Adding Activity to Drawer', () => {
  it('Initial drawer should be empty', () => {
    cy.openEmptyDrawer()
    cy.get('[data-cy="drawer-list"]').find('[data-cy="drawer-list-item"]')
      .should('have.length', 0)
  })

  it('After clicking a category, history drawer should now have 1 list item from the store', () => {
    cy.get('[data-cy="category-btn"]')
      .should('be.visible')
      .eq(1)
      .click({force: true})

    cy.get('[data-cy="activity-modal"]')
      .should('be.visible')

    cy.get('[data-cy="close-activity-modal"]')
      .should('be.visible')
      .click({force: true})

    cy.get('[data-cy="activity-modal"]')
      .should('not.be.visible')

    cy.get('[data-cy="drawer-access-btn"]')
      .eq(1)
      .click({force: true})

    cy.window().its('store').invoke('getState').its('core.history').should('have.length', 1)
    .then(($historyArray) => {
      const activityText = $historyArray[0].activity

      cy.get('[data-cy="drawer-list-item"]')
        .should('have.length', 1)
        .and('contain', activityText)
    })

  })
})
