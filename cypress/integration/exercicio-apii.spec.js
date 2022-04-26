/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve listar usuários cadastrados', () => {

        cy.request({
            method: 'GET',
            url: 'usuarios'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.duration).to.be.lessThan(50)
        })
    });


    it('Deve cadastrar um usuário com sucesso', () => {
        var faker = require('faker-br')
        emailfaker = faker
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Fulano da Silva",
                "email": faker,
                "password": "teste",
                "administrador": "true"
            },

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.have("Cadastro realizado com sucesso")
            expect(response.duration).to.be.lessThan(30)
        })


    });




});

