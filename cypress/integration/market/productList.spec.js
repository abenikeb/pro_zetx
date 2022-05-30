describe('The products are being displayed and properly handle the searching conditaions', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/')
    })
    it('should display the products', () => {
      cy.visit('/market')
      cy.wait(10000)
      cy.contains('Buy')
    })

    it('will display the apprprate items based on the input fields that the user will type', ()=>{
        cy.visit('/market')
        cy.wait(10000)
        cy.get('#productName').type('phone',{force: true})
        cy.wait(10000)
        cy.get('#location').type('London',{force: true})
        cy.wait(10000)
        cy.get('#searchBtn').click({force: true})
        cy.wait(20000)
        cy.contains('Search results for')

})

it('Will display that no matches are found if the user inputs non-exsisting matches for the product name and the location',()=>{
        cy.visit('/market')
        cy.wait(10000)
        cy.get('#productName').type('testName',{force: true})
        cy.wait(10000)
        cy.get('#searchBtn').click({force: true})
        cy.wait(20000)
        cy.contains('No result found')
})
it('the products are being filtered by price prior to searching',()=>{
  cy.visit('/market')
  cy.wait(10000)
  cy.get('#price').select('Less than 50 CC',{force:true})
  cy.wait(10000)
  cy.contains('21')
})
it('the products are being filtered by category prior to searching',()=>{
  cy.visit('/market')
  cy.wait(10000)
  cy.get('#category').select('Electronics',{force:true})
  cy.contains('Electronics')

})
it('the products are being filtered by the combination of price and category prior to searching',()=>{
  cy.visit('/market')
  cy.wait(10000)
  cy.get('#price').select('Less than 50 CC',{force:true})
  cy.wait(20000)
  cy.get('#category').select('Furniture',{force:true})
  cy.wait(20000)
  cy.contains('Furniture')
  cy.contains('21')
}) 
})