describe('CAC TAT - Política de privacidade', ()=>{
    beforeEach(()=>{
        cy.visit('./src/privacy.html')
    })
    
    it('verifica o título da aplicação',()=>{
        cy.title().should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it('verifica o h1 da aplicação',()=>{
        cy.get('#title').contains('CAC TAT - Política de privacidade')
    })
    
    
    
})