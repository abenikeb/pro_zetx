
describe('household page is loaded', () => {
const electricity = 29
const naturalgas = 39
const coal = 29
const wood = 40


    it('has loaded the household input data correctly', () => {
      cy.visit('/dashboard/measure')
      cy.wait(20000)
      cy.get('#household').click({force:true})
      cy.wait(2000)
      cy.get('#elecricity').clear()
      cy.wait(1000)
      cy.get('#elecricity').type(electricity)
      cy.wait(1000)
      cy.get('#naturalgas').clear()
      cy.wait(1000)
      cy.get('#naturalgas').type(naturalgas)
      cy.wait(1000)
      cy.get('#coal').clear()
      cy.wait(1000)
      cy.get('#coal').type(coal)
      cy.wait(1000)
      cy.get('#wood').clear()
      cy.wait(1000)
      cy.get('#wood').type(wood)
      cy.wait('#submit').click()
      cy.wait(2000)
      cy.contains('dashboard')
    })
})