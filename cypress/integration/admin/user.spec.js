describe('Filtering afetr search results', () => {
    before(() => {
      cy.login('NUrTSIlrT2faz6tBO5hPwBSTPbm1')
      cy.visit('/')
    })
    it('the products are being filtered by price',()=>{
        cy.visit('/main/users')
        cy.wait(10000)
        cy.contains('Manage')
    })
})
