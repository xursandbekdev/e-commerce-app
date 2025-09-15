/// <reference types="cypress" />

import App from './App'

describe('App', () => {
  it('mounts', () => {
    //@ts-ignore
    cy.mount(<App />)
  })
})
