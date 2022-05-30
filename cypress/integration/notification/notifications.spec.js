describe('Integration tests for the notification displaying functionality',() => {
    const email = 'ezra@zeraftech.com';
    const password = "12345678"

    it('displays the notifications list when we visit the notifications route and dismiss the notifications when the use dismiss it',()=>{
        cy.visit('/login')
        cy.get("#email").type(email)
        cy.get("#password").type(`${password}`)
        cy.intercept('https://firebaselogging-pa.googleapis.com/v1/firelog/legacy/*').as('getAccount')
        cy.get('#signin').click()
        cy.wait(20000)
        cy.visit('/notifications')
        cy.wait(10000)
        cy.contains('Your Notifications')
        cy.wait(5000)
        cy.get('#dismissNotification').click({force: true})
        cy.wait(5000)
        cy.contains('You have no notifications.')
    })
})