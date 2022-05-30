describe('The navbar notifications', () => {
  before(() => {
    cy.login('NUrTSIlrT2faz6tBO5hPwBSTPbm1')
  })
  it('should allow me to login', () => {
    cy.visit('/dashboard')
    cy.wait(10000)
    cy.contains('Green')
    cy.get('#notificationIcon').then(button => button.trigger('click'))
    cy.contains('sixth')
  })

})
