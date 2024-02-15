/// <reference types="cypress" />

let dadosLogin
import pagProdPage from "../support/page_objects/pagProd.page";
const { faker } = require('@faker-js/faker');


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/minha-conta/')
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
        }),
        pagProdPage.visitaUrl()
    });
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.comprinhas()
        cy.cadastro()
        cy.wait(5000)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });


})
