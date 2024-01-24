// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', ()=>{
    beforeEach(()=>{
        cy.visit('./Src/index.html')
    })
    
    it('verifica o título da aplicação',()=>{
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
        })
    
    it('preenche os campos obrigatórios e envia o formulário',()=>{
        cy.get('#firstName').should('be.visible').type('Luca').should('have.value','Luca')
        cy.get('#lastName').should('be.visible').type('Priftis').should('have.value','Priftis')
        cy.get('#email').should('be.visible').type('luca_priftis@hotmail.com').should('have.value','luca_priftis@hotmail.com')
        cy.get('#open-text-area').should('be.visible').type('Teste preenchimento de campos obrigatórios de muitas palavras e testando delay 0', {delay:0})
        cy.contains('button','Enviar').should('be.visible').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=>{
        cy.get('#firstName').should('be.visible').type('Luca').should('have.value','Luca')
        cy.get('#lastName').should('be.visible').type('Priftis').should('have.value','Priftis')
        cy.get('#email').should('be.visible').type('emailInvalido').should('have.value','emailInvalido')
        cy.get('#open-text-area').should('be.visible').type('Teste preenchimento de campos obrigatórios de muitas palavras e testando delay 0', {delay:0})
        cy.contains('button','Enviar').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico',()=>{
        cy.get('#phone')
            .type('abcdefgh')
            .should('have.value','')
    })

    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
        cy.get('#firstName').should('be.visible').type('Luca').should('have.value','Luca')
        cy.get('#lastName').should('be.visible').type('Priftis').should('have.value','Priftis')
        cy.get('#email').should('be.visible').type('emailInvalido').should('have.value','emailInvalido')
        cy.get('#phone-checkbox').should('be.visible').check()
        cy.get('#open-text-area').should('be.visible').type('Teste')
        cy.contains('button','Enviar').should('be.visible').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName').should('be.visible').type('Luca').should('have.value','Luca').clear().should('have.value','')
        cy.get('#lastName').should('be.visible').type('Priftis').should('have.value','Priftis').clear().should('have.value','')
        cy.get('#email').should('be.visible').type('luca_priftis@hotmail.com').should('have.value','luca_priftis@hotmail.com').clear().should('have.value','')
        cy.get('#phone').should('be.visible').type('12345').should('have.value','12345').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
        cy.contains('button','Enviar').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando comando customizado', ()=>{
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (Youtube) por seu texto', ()=>{
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })

    it('Seleciona um produto (Mentoria) por seu value', ()=>{
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('Seleciona um produto (Blog) por seu indice', ()=>{
        cy.get('#product').select(1).should('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback"', ()=>{
        cy.get('input[type="radio"][value="feedback"]')
            .check().should('be.checked')
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', ()=>{
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio)=>{
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', ()=>{
        cy.get('input[type="checkbox"')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('input[type=file]')
            .selectFile('./cypress/fixtures/example.json')
            .then(input =>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', ()=>{
        cy.get('input[type=file]')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .then(input =>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json', {encoding: null}).as('exampleFile')
        cy.get('input[type=file]')
            .selectFile('@exampleFile')
            .then(input =>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
        

    it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    
        cy.contains('CAC TAT - Política de privacidade')
        .should('be.visible')
    })
        

    it('testa a página da política de privacidade de forma independente v1 - visitando sem modificar o <a>',()=>{
        cy.get('#privacy a').invoke('attr', 'href').then((href) => {

            const adjustedPath = 'src/' + href;

            cy.visit(adjustedPath);
            cy.url().should('include', 'privacy.html');
          });
    })
})