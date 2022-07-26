/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Root Master',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('login failed wrong credentials', function () {
    cy.get('#username').type('invalid_user')
    cy.get('#password').type('invalid_password')
    cy.get('#login-button').click()
    cy.contains('Wrong Credentials')
  })

  it('can login', function () {
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('Root Master logged in')
  })
})