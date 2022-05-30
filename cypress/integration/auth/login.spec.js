
// This tests login page component and tests weather the user filled the correct input data fields

describe('Login page test', () =>{

    const email = 'bender@gmail.com'
    const password = 'passcode'

    it('should enable me to login ', () => {
        cy.visit('/login')
        cy.wait(1000)
        cy.get("#email").type(email)
        cy.wait(1000)
        cy.get("#password").type(password)
        cy.get('#login').click()
        cy.wait(30000)
        cy.contains('Dashboard')

    })

})