describe('Jokester Cards', () => {
  before(()=> {
    cy.visit('/')
  })
  it('Jokester cards should be visible if bottom drawer is open', () => {
    cy.openBottomDrawer()
    cy.get('[data-cy="jokester-card"]')
      .should('be.visible')
  })
  it('Dad & Advice card should have search inputs', () => {
      cy.get('[data-cy="card-search-input"]')
        .should('be.visible')
        .and('have.length', 2)
  })
  it ('All 4 four card types should have random data at mount', () => {
    cy.openBottomDrawer()
    cy.get('[data-cy="joke-text"]')
      .should('be.visible')
      .and('have.length', 4)
  })
})
