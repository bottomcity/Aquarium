describe("e2e test for Aquarium UI", () =>

    it('checking  DOM elements on web UI', function (){
        cy.visit('/')
        cy.get('svg').should('have.attr', 'width', '24').should('have.attr', 'height', '24')


    })

);