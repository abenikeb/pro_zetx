describe('Test for the admin dashboard orders page', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/main')
    
    })
    it('loads the orders page when loads',()=>{
        cy.visit('/main/orders')
        cy.wait(5000)
        cy.contains('Total Orders')
    })
    it('loads will display the order details on the view details icon',()=>{
        cy.visit('/main/orders')
        cy.wait(5000)
        cy.get('#viewBtn').click({force:true})
        cy.wait(5000)
        cy.contains('Order Details')
    })

    })