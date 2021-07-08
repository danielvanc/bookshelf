// 🐨 you'll want a fake user to register as:
import {buildUser, buildBook} from '../support/generate'

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    const user = buildUser()

    cy.visit('/')

    cy.findByRole('button', {name: /register/i}).click()

    cy.findByRole('dialog', {name: /registration form/i}).within(() => {
      // cy.get('#username').type(user.username)
      // cy.get('#password').type(user.password)
      // or like below
      cy.findByRole('textbox', {name: /username/i}).type(user.username)
      cy.findByLabelText(/password/i).type(user.password)

      cy.findByRole('button', {name: /register/i}).click()
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /discover/i}).click()
    })

    // 🐨 within the "main", type in the "searchbox" the title of a book and hit enter
    //   💰 when using "type" you can make it hit the enter key with "{enter}"
    //   🐨 within the listitem with the name of your book, find the button
    //      named "add to list" and click it.
    //
    cy.findByRole('main').within(() => {
      const book = buildBook()
      const bookToSearch = 'To kill a mockingbird'

      // cy.findByPlaceholderText(/search books/i).type(`${bookToSearch} {enter}`)

      cy.findByRole('searchbox', {name: /search/i}).type(
        `${bookToSearch} {enter}`,
      )

      cy.findByRole('listitem', {name: /to kill a mockingbird/i}).within(() => {
        cy.findByRole('button', {name: /add to list/i}).click()
      })
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /reading list/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      cy.findByRole('link', {name: /to kill a mockingbird/i}).click()
    })

    //
    // 🐨 type in the notes textbox
    // The textbox is debounced, so the loading spinner won't show up immediately
    // so to make sure this is working, we need to wait for the spinner to show up
    // and *then* wait for it to go away.
    // 🐨 wait for the loading spinner to show up (💰 .should('exist'))
    // 🐨 wait for the loading spinner to go away (💰 .should('not.exist'))

    cy.findByRole('main').within(() => {
      cy.findByRole('textbox', {name: /notes/i}).type('This is an awesome book')
      cy.findByLabelText(/loading/i).should('exist')
      cy.findByLabelText(/loading/i).should('not.exist')
      cy.findByRole('button', {name: /mark as read/i}).click()
      cy.findByRole('radio', {name: /5 stars/i}).click({
        force: true,
      })
      // Add force true if sometimes the thing you want to
      // click on is not visible
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /finished books/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      cy.findByRole('radio', {name: /5 stars/i}).should('be.checked')
      cy.findByRole('link', {name: /to kill a mockingbird/i}).click()
    })

    //
    // 🐨 remove the book from the list
    // 🐨 ensure the notes textbox and the rating radio buttons are gone
    //
    // 🐨 navigate back to the finished books page
    //
    // 🐨 ensure there are no books in the list
  })
})
