describe('Test for the classifier index page', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/')
    
    })
    it('loads the table when the page loads',()=>{
        cy.visit('/admin')
        cy.wait(5000)
        cy.contains('MRV for the Carbon Data')
        cy.contains('Progress')
        cy.contains('Action')
        cy.contains('Sponsored Ads')
    })
    })