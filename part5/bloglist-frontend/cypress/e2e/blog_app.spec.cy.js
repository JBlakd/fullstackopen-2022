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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.get('.toggleVisibilityButton').contains('new blog').click()
      cy.get('#blog-title-input').type('evil master blog')
      cy.get('#blog-author-input').type('Root Master')
      cy.get('#blog-url-input').type('http://www.evil.com/')
      cy.get('#blog-submit-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('evil master blog')
    })

    it('A blog can be liked', function () {
      cy.get('.toggleIsShownButton').contains('view').click()
      cy.contains('likes 0')
      cy.get('.likeButton').contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function () {
      const element = cy.contains('evil master blog')
      cy.get('.deleteButton').contains('delete').click()
      element.should('not.exist')
    })

    it.only('Blogs are ordered by likes', function () {
      cy.contains('evil master blog')

      cy.get('.toggleVisibilityButton').contains('new blog').click()
      cy.get('#blog-title-input').type(' EVEN MORE LIKES')
      cy.get('#blog-url-input').type('shoutout.htm')
      cy.get('#blog-submit-button').click()
      cy.contains('evil master blog EVEN MORE LIKES')

      cy.get('.toggleIsShownButton').eq(1).click()
      cy.contains('likes 0')
      cy.get('.likeButton').eq(0).click()
      cy.contains('likes 1')
      cy.get('.likeButton').eq(0).click()
      cy.contains('likes 2')
      cy.get('.likeButton').eq(0).click()
      cy.contains('likes 3')
    })
  })
})