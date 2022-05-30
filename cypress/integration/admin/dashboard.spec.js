describe('Test for the admin dashboard index page', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/main')
    
    })
    it('loads the index page when loads',()=>{
        cy.visit('/main')
        cy.wait(5000)
        cy.contains('Dashboard Panel')
        cy.contains('Users')
        cy.contains('Orders')
        cy.contains('Carbon Transaction')
    })
    })