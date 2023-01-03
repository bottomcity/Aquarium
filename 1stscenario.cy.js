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
        cy.get('p[class="body--s"]')
            .should('have.text', ' Squid is an ETL pipeline to index on-chain data. The indexed data can be queried with a GraphQL API or stored for analytics. Learn more')
            .parent()
            .find('sqd-button')
            .click()
        cy.get('span[class="text-[color:var(--button-text-color,inherit)] flex items-center gap-2 body--s"]')
            .should('include.text', 'Sign in with Github')
            .click({multiple: true, force: true})
        cy.get('input[name="login"]')
            .type('testsquid39testsquid39testsquid39testsq')
        cy.get('input[type="password"]')
            .type('Subsquid!123{enter}')

        //checking correctness of redirect after login on GitHub
        cy.wait(5000)
            .url().should('include', '/my-squids/')

        cy.get('div[class="flex gap-2"]')
            .parent()
            .find('sqd-breadcrumbs')
            .parent()
            .find('svg')
            .parent()
            .find('div')
            .parent()
            .find('span').should(($span) => {
            expect($span).to.have.length(5)
            expect($span.eq(0)).to.contain('Aquarium')
            expect($span.eq(2)).to.contain('My squids')
        })

        cy.get('aside')

            .parent()
            .find('div').should(($div) => {
            expect($div).to.have.length(2)
            expect($div.eq(0)).to.be.visible
            expect($div.eq(1)).to.be.visible

            // div eq(1) should be visible in case if user has deployed squids

        })
            .first()
            .parent()
            .find('ul').should('include.class', 'flex flex-col gap-2')
            .should(($ul) => {
            expect($ul).to.have.length(3)
            expect($ul.eq(0)).to.be.visible
            expect($ul.eq(0)).to.be.visible
            expect($ul.eq(1)).to.be.visible
            expect($ul.eq(2)).to.be.visible

            // ul eq(2) should be visible in case if user has deployed squids

            })



            .first()
            .parent()
            .find('li').should(($li) => {
            expect($li).to.have.length(6)
            expect($li.eq(0)).to.have.text('My squids ')
            expect($li.eq(1)).to.have.text('Deployment key ')
            expect($li.eq(2)).to.have.text('Secrets')
            expect($li.eq(3)).to.have.text('Public archives ')
            expect($li.eq(4)).to.have.text(' Documentation ')
            expect($li.eq(5)).to.have.text('Contact support')
        })
            .pause()
})
