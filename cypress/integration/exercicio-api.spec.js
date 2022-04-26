/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuarios', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        })
    });



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
        let meuEmail = faker.internet.email()
        

        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Fulano da Silva",
                "email": meuEmail,
                "password": "teste",
                "administrador": "true"
            },

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
            expect(response.duration).to.be.lessThan(30)
            
        })


    });


    it('Deve validar um usuário com email inválido', () => {
        

        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Fulano da Silva",
                "email": "adevanesgmail.com",
                "password": "teste",
                "administrador": "true"
            },

        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.email).to.equal("email deve ser um email válido")
            expect(response.duration).to.be.lessThan(30)
            
        })
   });

   it('Deve editar um usuário previamente cadastrado', () => {
    cy.request('usuarios').then(response => {
        let id = response.body.usuarios[5]._id
        cy.request({
            method: 'PUT', 
            url: `usuarios/${id}`, 
            body: 
            {
                "administrador": "true",
                "email": "Camilo.Costa@gmail.com",
                "nome": "Fulano da Silva",
                "password": "teste"
            }
        }).then(response => {
            expect(response.body.message).to.equal('Registro alterado com sucesso')
            expect(response.status).to.equal(200)
        })
    })

    });


    it('Deve deletar um usuário previamente cadastrado', () => {
        cy.request('usuarios').then(response => {
            let id = response.body.usuarios[5]._id
            cy.request({
                method: 'DELETE', 
                url: `usuarios/${id}`, 
                
            }).then(response => {
                expect(response.body.message).to.equal("Registro excluído com sucesso")
                expect(response.status).to.equal(200)
            })
        })



    });


});

