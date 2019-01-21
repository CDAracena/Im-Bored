describe('Drawer', () => {
    beforeEach(() => {
        cy.visit('/')
    })
it('User can open the left drawer', () => {
    cy.get('[data-cy="drawer-access-btn"]')
      .should('have.length', 2)
      .and('be.visible')
      .eq(0)
      .click();
    
    cy.get('[data-cy="drawer-container"]')
      .should('be.visible');
    })

    it('User can close left drawer by clicking chevron icon', () => {
        cy.openEmptyDrawer()

        cy.get('[data-cy="chevron-left"]')
          .should('be.visible')
          .click()
        cy.get('[data-cy="drawer-container"]')
          .should('not.be.visible')
    })
})