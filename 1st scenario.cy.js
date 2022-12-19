describe("e2e test for Aquarium UI", () =>


    it('correctness DOM elements on web UI in top of page', function () {
        cy.visit('/')
        cy.get('body').should('exist').should('have.be.visible')
            .parent()
            .find('sqd-root')
            .parent()
            .find('tui-root')
            .parent()
            .find('tui-dropdown-host')
            .parent()
            .find('div')
            .parent()
            .find('sqd-main')
            .parent()
            .find('main')
            .parent()
            .find('sqd-header')
            .parent()
            .find('div').should('have.class', 'h-[64px]')
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
        cy.get('sqd-icon[name="burger-opened"]')
            .click()

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
            expect($ul.eq(1)).to.contain('Support chat')
            })

            .parent()
            .find('span').should('not.to.be.visible')
    })

    it('checking correctness of expanding sidebar', function () {

        cy.visit('/')
        cy.get('sqd-icon[name="burger-opened"]')
            .click()
            .click()

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
            expect($ul.eq(1)).to.contain('Support chat')
        })

        .parent()
        .find('span').should('to.be.visible')
})