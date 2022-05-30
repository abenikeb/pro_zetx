describe('Filtering afetr search results', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/')
    
    })
    it('the products are being filtered by price',()=>{
        cy.visit('/market')
        cy.wait(10000)
        cy.get('#productName').type('phone',{force: true})
        cy.wait(10000)
        cy.get('#location').type('London',{force: true})
        cy.wait(10000)
        cy.get('#searchBtn').click({force: true})
        cy.wait(20000)
        cy.get('#price').select('Less than 50 CC',{force:true})
        cy.contains('21')


    })
    it('the products are being filtered by category',()=>{
        cy.visit('/market')
        cy.wait(10000)
        cy.get('#productName').type('phone',{force: true})
        cy.wait(10000)
        cy.get('#searchBtn').click({force: true})
        cy.wait(20000)
        cy.get('#category').select('Electronics',{force:true})
        cy.contains('Electronics')


    })
    it('the products are being filtered by the combination of price and category',()=>{
        cy.visit('/market')
        cy.wait(10000)
        cy.get('#productName').type('phone',{force: true})
        cy.wait(10000)
        cy.get('#searchBtn').click({force: true})
        cy.wait(20000)
        cy.get('#price').select('Less than 50 CC',{force:true})
        cy.wait(20000)
        cy.get('#category').select('Furniture',{force:true})
        cy.wait(20000)
        cy.contains('Furniture')
        cy.contains('21')

    })
})
