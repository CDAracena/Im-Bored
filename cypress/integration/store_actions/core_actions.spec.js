import {addToHistory, addToFavorites} from '../../../src/actions/actions';
const dispatch = action => cy.window().its('store').invoke('dispatch', action)
describe('Add To History and Add To Favorites actions', () => {
  describe('Add To History Array', () => {
    before(()=>{
    cy.visit('/')
  })
  it('Add to history action should add to history array', () => {
    cy.fixture('activities').then(activities => {
      dispatch(addToHistory(activities[0]))
      cy.window().its('store').invoke('getState').its('core.history').should('have.length', 1)
        .and('deep.equal', [activities[0]])
    })

  })
  it('History drawer should contain 1 list item that contains activity text', () => {
    cy.fixture('activities').then(activities => {
      cy.get('[data-cy="drawer-access-btn"]')
        .eq(1)
        .click()
      cy.get('[data-cy="drawer-container"]')
        .contains(activities[0].activity)
    })

  })
})
  describe('Add To Favorites Array', () => {
    before(() => {
      cy.visit('/')
    })
    it('Add to favorites action should add to favorites array', () => {
      cy.fixture('activities').then(activities => {
        cy.window().its('store').invoke('getState').its('core.favorites').should('have.length', 0)
        dispatch(addToFavorites(activities[1]))
        cy.window().its('store').invoke('getState').its('core.favorites').should('have.length', 1)
          .and('deep.equal', [activities[1]])
      })

    })
    it('Favorites drawer should contain 1 list item that contains activity text', ()=> {
      cy.fixture('activities').then(activities => {
        cy.get('[data-cy="drawer-access-btn"]')
          .eq(0)
          .click()
        cy.get('[data-cy="drawer-container"]')
          .contains(activities[1].activity)
      })

    })
  })
})
