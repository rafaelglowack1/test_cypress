/// <reference types="cypress" />

describe('Testes da Agenda de Contatos - EBAC', () => {
  const baseUrl = 'https://ebac-agenda-contatos-tan.vercel.app/';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(1000); // aguarda a página carregar
  });

  it('Deve adicionar um novo contato', () => {
    cy.get('input[placeholder="Nome"]').should('be.visible').type('Rafa Teste');
    cy.get('input[placeholder="E-mail"]').should('be.visible').type('rafa@teste.com');
    cy.get('input[placeholder="Telefone"]').should('be.visible').type('11999999999');
    cy.contains('button', 'Adicionar').click();

    cy.contains('Rafa Teste').should('exist');
    cy.contains('rafa@teste.com').should('exist');
  });

  it('Deve editar um contato existente', () => {
    // Clica no botão Editar do contato "Rafa Teste"
    cy.contains('Rafa Teste')
      .parents('.contato')
      .find('button.edit')
      .click();

    // Altera os dados
    cy.get('input[placeholder="Nome"]').clear().type('Rafa Editado');
    cy.get('input[placeholder="E-mail"]').clear().type('rafaeditado@teste.com');
    cy.get('input[placeholder="Telefone"]').clear().type('11888888888');

    // O botão muda para "Salvar" ao editar
    cy.contains('button', 'Salvar').click();

    // Valida que o contato foi alterado
    cy.contains('Rafa Editado').should('exist');
    cy.contains('rafaeditado@teste.com').should('exist');
  });

  it('Deve remover um contato', () => {
    cy.contains('Rafa Editado')
      .parents('.contato')
      .find('button.delete')
      .click();

    cy.contains('Rafa Editado').should('not.exist');
  });
});
// feito