const openBottomDrawer = () => {
  cy.get('[data-cy="bottom-drawer-icon"]')
    .should('be.visible')
    .click()
}

describe('Open and close bottom drawer', () => {
  beforeEach(()=> {
    cy.visit('/')
  })

  it('Bottom Drawer icon should open bottom drawer', () => {
      openBottomDrawer()
      cy.get('[data-cy="bottom-drawer"]')
        .should('be.visible')
  })
  it('Pressing X button should close the bottom drawer', () => {
      openBottomDrawer()

    cy.get('[data-cy="bottom-drawer-closer"]')
      .eq(0)
      .click({force: true})

    cy.get('[data-cy="bottom-drawer"]')
      .should('not.be.visible')
  })
})
