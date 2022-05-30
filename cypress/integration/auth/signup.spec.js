
// This tests the sign up page and tests if the user correctly filled the input data

describe('Sign up page test', () =>{
    const firstName = 'bender';
    const lastName = 'wale';
    const email = 'bender@gmail.com';
    const password = 'passcode';
    const confirmPassword = 'passcode'


    it('enables the users to sign up', () =>{
        cy.visit('/signup');
        cy.wait(1000);
        cy.get('#fname').type(firstName)
        cy.wait(1000)
        cy.get('#lname').type(lastName)
        cy.wait(1000)
        cy.get('#email').type(email)
        cy.wait(1000)
        cy.get('#password').type(password)
        cy.wait(1000)
        cy.get('#confirm-password').type(confirmPassword)
        cy.wait(1000)
        cy.intercept('https://firebaselogging-pa.googleapis.com/v1/firelog/legacy/*').as('getAccount')
        cy.get('#signup').click()
        cy.wait(2000)


    })
})