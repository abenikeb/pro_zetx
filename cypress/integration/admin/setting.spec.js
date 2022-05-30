describe('Test for the admin dashboard setting page', () => {
    before(() => {
      cy.login('m5BzIaViiTRrMnHwzjAHU3FwcRm2').then(user => {
        console.log('user')
        console.log(user)
      })
      cy.visit('/main')
    
    })
    it('loads the setting page when loads',()=>{
        cy.visit('/main/setting')
        cy.wait(5000)
        cy.contains('Settings')
    })
    it('loads the general tab content when the general tab is clicked',()=>{
        cy.visit('/main/setting')
        cy.wait(5000)
        cy.get('#general').click({force:true})
        cy.wait(5000)
        cy.contains('Full Name')
        cy.contains('Email')
        cy.contains('Phone No.')
        cy.contains('Location')
    })
    it('loads the security tab content when the security tab is clicked',()=>{
        cy.visit('/main/setting')
        cy.wait(5000)
        cy.get('#security').click({force:true})
        cy.wait(5000)
        cy.contains('Change Password')
        cy.contains('New Password')
        cy.contains('Re-type Password')
       
    })

    })