

// National leader board page component test

describe('national leader board page test', () =>{

    it('will choose national leader board from leaderbord drop down menu and visits the national leader board page', () => {

        cy.visit('/dashboard')
        cy.wait(10000)
        cy.get('#leaderboard').click({force:true})
        cy.wait(1000)
        cy.get('#private').click({force:true})
        cy.wait(1000)
        cy.visit('leaderboard/private')
    })
})