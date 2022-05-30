
//  Domestic leader board tests

describe('domestic page test', () =>{

    it('will choose domestic tab from leader board drop down and go to domestic leader board page' ,() =>{
        cy.visit('/dashboard')
        cy.wait(10000)
        cy.get('#leaderboard').click({force:true})
        cy.wait(10000)
        cy.get('#domestic').click({force:true})
        cy.wait(1000)
        cy.visit('/leaderboard/domestic')
    })

})