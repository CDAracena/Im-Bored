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
  it ('All four card types should have random data at mount', () => {
    cy.get('[data-cy="joke-text"]')
      .should('be.visible')
      .and('have.length', 4)
  })
  it('Search input should render results or not found', () => {
    cy.visit('/')
      cy.openBottomDrawer()
      cy.get('[data-cy="joke-text"]').eq(1).invoke('text').then(initialText => {
        cy.get('[data-cy="card-search-input"]').find('input')
          .should('be.visible')
          .eq(0)
          .type("work")
          .type('{enter}')

          cy.get('[data-cy="joke-text"]').eq(1).invoke('text').should(nextText => {
            expect(initialText).not.to.eq(nextText)
          })
      })

  })

  it('Expect next button to update joke text', () => {
    cy.visit('/')
    cy.openBottomDrawer()
    cy.get('[data-cy="joke-text"]').eq(1).invoke('text').then(initialText => {
      cy.get('[data-cy="next-joke-btn"]').eq(1).click({force:true})

      cy.get('[data-cy="joke-text"]').eq(1).invoke('text').should(nextText => {
        expect(initialText).not.to.eq(nextText)
      })
    })
  })
  it('Expect favorites icon to increment favorites count', () => {
    cy.visit('/')
    cy.openBottomDrawer()
    cy.get('[data-cy="favorite-count"').eq(0).invoke('text').should('eq', '0')

    cy.get('[data-cy="favorite-jokester-btn"]').eq(0).click({force: true})
    cy.get('[data-cy="favorite-count"]').eq(0).invoke('text').should('eq', '1')
  })

  it('Expect favorited joke to be added to collapsible list', () => {
    cy.visit('/')
    cy.openBottomDrawer()
    cy.get('[data-cy="favorite-count"').eq(0).invoke('text').should('eq', '0')

    cy.get('[data-cy="joke-text"]').eq(0).invoke('text').then(initialText => {
      cy.get('[data-cy="favorite-jokester-btn"]').eq(0).click({force: true})
      cy.get('[data-cy="favorite-count"]').eq(0).invoke('text').should('eq', '1')
      cy.get('[data-cy="expand-collapse-list"]').eq(0)
        .click({force: true})

      cy.get('[data-cy="collapse-list-item"]')
        .should('be.visible')
        .and('contain', initialText)
    })
  })
  it('6 cards should now exist', () => {
    cy.visit('/')
    cy.openBottomDrawer()
    cy.get('[data-cy="jokester-card"]')
      .should('be.visible')
      .and('have.length', 6)
  })
  it('One of the cards should have title of Kanye Quote', () => {
    cy.openBottomDrawer()
    cy.get('[data-cy="jokester-card"]')
      .should('contain', 'Kanye Quoute')
  })
})
