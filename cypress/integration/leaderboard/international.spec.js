
// Test for international, domestic and private leader board page it will test if the page is loaded correctly
//when the international menu is selected from the nav drop down menu

describe('leader board will be loaded when selected from drop down menu', () =>{

    it('will load the international leader board page', () =>{
        cy.visit('/dashboard')
        cy.wait(10000)
        cy.get('#leaderboard').click({force:true})
        cy.wait(1000)
        cy.get('#international').click({force:true})
        cy.wait(1000)
        cy.visit('/leaderboard/international')

    })
})