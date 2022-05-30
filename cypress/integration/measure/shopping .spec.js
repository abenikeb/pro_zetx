describe('shopping component is loaded', () =>{

      const paper = 2
      const plastic = 1
      const pharma = 4
      const textile = 6

      it('has loaded shopping form data correctly', () => {
          cy.visit('/dashboard/measure')
          cy.wait(10000)
          cy.get('#shopping').click({force:true})
          cy.wait(1000)
          cy.get('#paper').clear()
          cy.wait(1000)
          cy.get('#paper').type(paper)
          cy.wait(1000)
          cy.get('#plastic').clear()
          cy.get('#plastic').type(plastic)
          cy.wait(1000)
          cy.get('#pharma').clear()
          cy.get('#pharma').type(pharma)
          cy.wait(1000)
          cy.get('#textile').clear()
          cy.get('#textile').type(textile)
          cy.wait(1000)
          cy.get('#submit').click()
          cy.wait(1000)
      })
})