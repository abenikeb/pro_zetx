describe('transporation page is loaded correctly', () =>{

      const  carKm = 18
      const busKm = 20
      const trainKm = 21

      it('will fill the form datas correctly', () =>{
          cy.visit('/dashboard/measure')
          cy.wait(20000)
          cy.get('#transportation').click({force:true})
          cy.wait(10000)
          cy.get('#carType').select('small')
          cy.wait(2000)
          cy.get('#fuelType').select('diesel')
          cy.wait(2000)
          cy.get('#carKm').clear()
          cy.wait(1000)
          cy.get('#carKm').type(carKm)
          cy.wait(2000)
          cy.get('#busType').select('Local bus')
          cy.wait(2000)
          cy.get('#busKm').clear()
          cy.wait(1000)
          cy.get('#busKm').type(busKm)
          cy.wait(2000)
          cy.get('#trainType').select('National train')
          cy.wait(2000)
          cy.get('#trainKm').clear()
          cy.wait(1000)
          cy.get('#trainKm').type(trainKm)
          cy.get('#submit').click({force:true})


      })
})