class pagProdPage {

    visitaUrl() {
        cy.visit('produtos')
    }

    
    buscarProdutoLista(nomeProduto) {
        cy.get('.products > .row')
            .contains(nomeProduto)
            .click()
    }

    addProdutoCart(tamanho, cor, qtd) {
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(qtd)
        cy.get('.single_add_to_cart_button').click()

    }
}

export default new pagProdPage()