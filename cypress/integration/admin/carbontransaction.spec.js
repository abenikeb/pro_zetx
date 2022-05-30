describe('Test for the admin dashboard carbon transaction page', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/main')
    
    })
    it('loads the carbon transaction page when loads',()=>{
        cy.visit('main/carbontransaction')
        cy.wait(5000)
        cy.contains('Total Carbon Transaction')
    })

    })