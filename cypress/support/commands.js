Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{
    cy.get('#firstName').type('Luca')
    cy.get('#lastName').type('Priftis')
    cy.get('#email').type('luca_priftis@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
})