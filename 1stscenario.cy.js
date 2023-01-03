describe("e2e test for Aquarium UI", () =>



    it('correctness DOM elements on web UI in top of page', function () {

        cy.visit('/')
        cy.get('body').should('exist').should('have.be.visible')

        cy.get('sqd-header')
            .parent()
            .find('div')
            .parent()
            .find('div')
            .parent()
            .find('sqd-icon')
            .parent()
            .find('sqd-medium-icon-burger-opened')
            .parent()
            .find('svg').should('have.attr', 'width', '24').should('have.attr', 'height', '24')


        cy.get('div[class="flex gap-2"]')
            .parent()
            .find('sqd-breadcrumbs')
            .parent()
            .find('svg').should('have.attr', 'width', '32').should('have.attr', 'height', '32')
            .parent()
            .find('div')
            .parent()
            .find('span').should(($span) => {
                expect($span).to.have.length(3)
                expect($span.eq(0)).to.contain('Aquarium')
                expect($span.eq(2)).to.contain('My squids')
            })

        cy.get('sqd-theme-switcher').should('exist')
    }))


    it('checking correctness of collapsing sidebar', function () {

        cy.visit('/')
        cy.get('sqd-icon[name="burger-opened"]').should('have.attr', 'name', 'burger-opened').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit')
            .click()
            .get('sqd-icon[name="burger-opened"]').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit burger-collapsed')

        cy.get('aside')
            .should('have.class', "border-box h-full flex relative sidebar-width-transition ng-star-inserted sidebar-closed gap-[1px] w-[64px]")
            .parent()
            .find('div').should(($div) => {
                expect($div).to.have.length(2)
                expect($div.eq(0)).to.be.visible
                expect($div.eq(1)).to.not.be.visible
            })

            .parent()
            .find('ul').should(($ul) => {
            expect($ul).to.have.length(3)
            expect($ul.eq(0)).to.be.visible
            expect($ul.eq(0)).to.contain('My squids')
            expect($ul.eq(0)).to.contain('Deployment key')
            expect($ul.eq(1)).to.contain('Public archives')
            expect($ul.eq(1)).to.contain('Documentation')
            expect($ul.eq(1)).to.contain('Contact support')
            })

            .parent()
            .find('span').should('not.to.be.visible')
    })

    it('checking correctness of expanding sidebar', function () {

        cy.visit('/')
        cy.get('sqd-icon[name="burger-opened"]').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit')
            .click()
            .get('sqd-icon[name="burger-opened"]').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit burger-collapsed')
            .click()
            .get('sqd-icon[name="burger-opened"]').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit')

        cy.get('aside')
            .should('have.class', "border-box h-full flex relative sidebar-width-transition ng-star-inserted sidebar-open gap-[3px] w-[196px]")
            .parent()
            .find('div').should(($div) => {
            expect($div).to.have.length(2)
            expect($div.eq(0)).to.be.visible
            expect($div.eq(1)).to.not.be.visible
        })

            .parent()
            .find('ul').should(($ul) => {
            expect($ul).to.have.length(3)
            expect($ul.eq(0)).to.be.visible
            expect($ul.eq(0)).to.contain('My squids')
            expect($ul.eq(0)).to.contain('Deployment key')
            expect($ul.eq(1)).to.contain('Public archives')
            expect($ul.eq(1)).to.contain('Documentation')
            expect($ul.eq(1)).to.contain('Contact support')
        })

        .parent()
        .find('span').should('to.be.visible')
})

    it('correctness DOM elements on web UI in sidebar after log in', function () {

        cy.visit('/')
        cy.get('p[class="body--s"]').should('have.text', ' Squid is an ETL pipeline to index on-chain data. The indexed data can be queried with a GraphQL API or stored for analytics. Learn more')
            .parent()
            .find('sqd-button')
            .click()
        cy.find('Sign in with Github')
})
