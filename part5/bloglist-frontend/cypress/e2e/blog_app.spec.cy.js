/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('can login', function () {
    const user = {
      name: 'Root Master',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('Root Master logged in')
  })
})