describe('Access login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Should be able to visit login page', () => {
    cy.get('[data-cy="login-page-btn"]')
      .should('be.visible')
      .click({force: true})
    cy.url().should('contain','/login')

    cy.get('[data-cy="login-box"]')
      .should('be.visible')
  })
})
