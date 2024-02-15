// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const { faker } = require('@faker-js/faker');
import pagProdPage from "../support/page_objects/pagProd.page";

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('comprinhas', () => {
    for (let n = 0; n <= 3; n++)
        cy.fixture('produtos').then(dados => {
            pagProdPage.buscarProdutoLista(dados[n].nomeProduto)
            pagProdPage.addProdutoCart(
                dados[n].tamanho,
                dados[n].cor,
                /*dados[n].tamanho, */ //em caso de não seleção de tamanho, desmarcar o comentário
                dados[n].qtd)

            cy.get('#primary-menu > .menu-item-629 > a').click()

        })
    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
})

Cypress.Commands.add('cadastro', () => {
    let nomeFaker = faker.person.firstName()
    let sobreFaker = faker.person.lastName()
    let enderecoFaker = faker.location.street()
    let codpostFaker = faker.location.zipCode('#####-###')
    let phoneFaker = faker.phone.number('###########')
    let comentsFaker = faker.word.words(8)
    let compendFaker = faker.location.buildingNumber()
    let cidadeFaker = faker.location.city()

    cy.get('#billing_first_name').click().clear().type(nomeFaker)
    cy.get('#billing_last_name').click().clear().type(sobreFaker)
    cy.get('#billing_company').click().clear().type(nomeFaker + sobreFaker)
    cy.get('#billing_address_1').click().clear().type(enderecoFaker + ', 8')
    cy.get('#billing_address_2').click().clear().type(compendFaker)
    cy.get('#billing_city').click().clear().type(cidadeFaker)
    cy.get('#billing_postcode').click().clear().type(codpostFaker)
    cy.get('#billing_phone').click().clear().type(phoneFaker)
    cy.get('#order_comments').click().clear().type(comentsFaker)
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
})