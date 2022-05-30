describe("testing signnup functionality",() => {
    const email = "bender@gmail.com"
    const email2 = "bender2@gmail.com"
   
     
it("the forget password form send reset link",  () =>{
    cy.visit('/forgetpassword')
    cy.wait(2000)
    cy.get("#email").type(email)
    cy.wait(2000)
    cy.get('#forgetPassword').click()
    cy.wait(2000)
    cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('Reset Link Have been sent to your email')
        
    })
})
 
it("alerts error if email is not found in users records",  () =>{
    cy.visit('/forgetpassword')
    cy.wait(2000)
    cy.get("#email").type(email2)
    cy.wait(2000)
    cy.get('#forgetPassword').click()
    cy.wait(2000)
    cy.on('window:alert',(txt)=>{
       
        expect(txt).to.contains('Email does not exist in our records')
        
    })
})

})