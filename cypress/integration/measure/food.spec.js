

describe('food emission data test', () => {

    const beef = 2
    const turkey =1
    const cheese = 0.5
    const tuna = 1
    const lamb = 2
    const pork = 1
    const chicken = 2
    const milk =  0.25

    it('enters the form data correctly', () => {
        cy.visit('/dashboard/measure/')
        cy.wait(10000)
        cy.get('#food').click({force:true})
        cy.wait(1000)
        cy.get('#beef').clear()
        cy.wait(1000)
        cy.get('#beef').type(beef)
        cy.wait(1000)
        cy.get('#turkey').clear()
        cy.wait(1000)
        cy.get('#turkey').type(turkey)
        cy.wait(1000)
        cy.get('#cheese').clear()
        cy.wait(1000)
        cy.get('#cheese').type(cheese)
        cy.wait(1000)
        cy.get('#tuna').clear()
        cy.wait(1000)
        cy.get('#tuna').type(tuna)
        cy.wait(1000)
        cy.get('#lamb').clear()
        cy.wait(1000)
        cy.get('#lamb').type(lamb)
        cy.wait(1000)
        cy.get('#pork').clear()
        cy.wait(1000)
        cy.get('#pork').type(pork)
        cy.wait(1000)
        cy.get('#chicken').clear()
        cy.wait(1000)
        cy.get('#chicken').type(chicken)
        cy.wait(1000)
        cy.get('#milk').clear()
        cy.wait(1000)
        cy.get('#milk').type(milk)
        cy.wait(1000)
        cy.get('#submit').click()
        cy.wait(2000)
        cy.contains('dashboard')

    })
})