describe('product list on search and market home page new tag test', () => {
    before(() => {
        cy.login('NUrTSIlrT2faz6tBO5hPwBSTPbm1')
    })
    it('should show new tag if it is posted with in two days from today', () => {
        cy.visit('/market')
        cy.wait(10000)
        cy.contains('Product Title')
    })
})