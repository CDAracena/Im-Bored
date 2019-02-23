import {
  fetchNewCorporateBS,
  fetchNewDadJoke,
  fetchNewGeekJoke,
  fetchNewLifeAdvice,
  getGeekData,
  getDadData,
  getLifeAdvice,
  getCorporateBS
} from '../../../src/actions/bottomdrawer';

const dispatch = action => cy.window().its('store').invoke('dispatch', action)
describe('FETCH ACTIONS', () => {
  before(() => {
    cy.visit('/')
  })
  it('Fetch a Geek Joke action should populate geek state', () => {
    cy.window().its('store').invoke('getState').its('jokester.geekJoke.currentJoke').should('have.length', 0)
    dispatch(getGeekData('Geek Joke'))
    cy.window().its('store').invoke('getState').its('jokester.geekJoke.currentJoke').should('eq', 'Geek Joke')
  })
  it('Fetch a Dad Joke action should populate dad state', () => {
    cy.window().its('store').invoke('getState').its('jokester.dadJoke.currentJoke').should('have.length', 0)
    dispatch(getDadData('Dad Joke'))
    cy.window().its('store').invoke('getState').its('jokester.dadJoke.currentJoke').should('eq', 'Dad Joke')
  })
  it('Fetch a Life Advice action should populate life advice state', () => {
    cy.window().its('store').invoke('getState').its('jokester.lifeAdvice.currentJoke').should('have.length', 0)
    dispatch(getLifeAdvice('Life Advice'))
    cy.window().its('store').invoke('getState').its('jokester.lifeAdvice.currentJoke').should('eq', 'Life Advice')
  })
  it('Fetch a CorporateBS action should populate corporate bs state', () => {
    cy.window().its('store').invoke('getState').its('jokester.corporateBS.currentJoke').should('have.length', 0)
    dispatch(getCorporateBS('Corporate BS'))
    cy.window().its('store').invoke('getState').its('jokester.corporateBS.currentJoke').should('eq', 'Corporate BS')
  })
})
