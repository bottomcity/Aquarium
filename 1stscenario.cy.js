
//add function to click authorize while GitHub logging in if it's necessary
import rgbHex from 'rgb-hex';

const username = Cypress.env('username')
let cookie

beforeEach(function () {
    cy.visit('/')
});

it('correctness DOM elements on web UI in top of page', function () {


    //below checking correctness of css for background body

        cy.get('body')
            .should('exist')
            .should('have.be.visible')
            .invoke('css', 'background-color')
            .then((bgcolor) => {
                expect(rgbHex(bgcolor)).to.eq('ffffff')
            })

    //below checking correctness of css for background sidebar and top bar

        cy.get('sqd-header')
            /*.invoke('css', 'background-color')
            .then((bgcolor) => {
                expect(rgbHex(bgcolor)).to.eq('00000000')
            })
            */
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


        //below checking that profile and alert invisible while user isn't logged in

        cy.get('div[class="flex items-center gap-10"]')
            .should('be.visible').should('have.length', '1')
            .parent()
            .find('sqd-version-limit-alert').should('not.exist')

            cy.get('div[class="flex items-center gap-3"]')
            .parent()
            .find('sqd-theme-switcher').should('exist')
            .parent()
            .find('div').should(($div)=> {
            expect($div).to.have.class('hover:bg-bg-base--menu-select-hover rounded-md h-[38px] w-[38px] cursor-pointer flex')
            })
            .find('img[alt="Github avatar"]').should('not.exist')
    }),

it('checking correctness of collapsing sidebar', function () {


        cy.get('sqd-icon[name="burger-opened"]').should('have.attr', 'name', 'burger-opened').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit')
            .click()
            .get('sqd-icon[name="burger-opened"]').should('have.class', 'transition-transform duration-200 cursor-pointer color-inherit burger-collapsed')

            /*.invoke('css', 'background-color')
            .then((bgcolor) => {
                expect(rgbHex(bgcolor)).to.eq('26282F')
            })
            */

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
    }),

it('checking correctness of expanding sidebar', function () {


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
    }),


it('no ability to log in on public archives and contact support pages', function () {


        cy.get('sqd-sidebar-item[hint="A library of pre-indexed data for your squid to access"]')
            .click()
        cy.get('img[alt="Github avatar"]')
            .should('not.exist')
        cy.get('sqd-sidebar-item[hint="Chat with our support team"]')
            .click()
        cy.get('img[alt="Github avatar"]')
            .should('not.exist')

}),

    it('correct links on discord and telegram support', function () {


        cy.get('sqd-sidebar-item[hint="Chat with our support team"]')
            .click()
        cy.get('a').should(($a) => {
            expect($a).to.have.length(3)
            expect($a.eq(1)).to.have.text('Discord')
            expect($a.eq(1)).to.have.attr('href', 'https://discord.com/invite/subsquid')
            expect($a.eq(2)).to.have.text('Telegram')
            expect($a.eq(2)).to.have.attr('href',"https://t.me/HydraDevs")
        })

    }),


it('correctness DOM elements on web UI in sidebar after log in', function () {


        cy.get('p[class="body--s"]')
            .should('have.text', ' Squid is an ETL pipeline to index on-chain data. The indexed data can be queried with a GraphQL API or stored for analytics. Learn more')
            .parent()
            .find('sqd-button')
            .click()
        cy.get('span[class="text-[color:var(--button-text-color,inherit)] flex items-center gap-2 body--s"]')
            .should('include.text', 'Sign in with Github')
            .click({multiple: true, force: true})
        cy.get('input[name="login"]')
            .type(username)
        cy.get('input[type="password"]')
            .type('Subsquid!123{enter}')

        //below checking correctness of redirect after login on GitHub

        cy.wait(5000)
            .url().should('include', '/my-squids/')
        cy.getCookie('access_token')
            .should('exist')
            .then((c) => {
            // save cookie until we need it
            cookie = c
        })

        cy.get('div[class="flex items-center gap-3"]')
            .parent()
            .find('sqd-theme-switcher').should('exist')
            .parent()
            .find('div').should(($div)=> {
            expect($div).to.have.class('hover:bg-bg-base--menu-select-hover rounded-md h-[38px] w-[38px] cursor-pointer flex')
    })

        cy.get('tui-hint-box')
            .should('not.exist')


        cy.get('div[class="flex items-center gap-3"]')
            .parent()
            .find('img[alt="Github avatar"]').should('exist')
            .click()
        cy.get('tui-hint-box')
            .should('be.visible')
            .parent()
            .find('span')
            .should(($span)=> {
            expect($span).to.include.text(username)
    })


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

            //above div eq(1) should be visible in case if user has deployed squids

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

                //above ul eq(2) should be visible in case if user has deployed squids

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

        cy.get('div[class="flex items-center gap-10"]')
            .should('be.visible').should('have.length', '1')
            .parent()
            .find('sqd-version-limit-alert').should('exist')
            // .should('to.include.text', 'more deployable squids available')
    }),

/*it('session after log in', function () {

        cy.getCookies().should('exist')
        cy.setCookie('access_token', cookie)
        cy.getCookie('access_token').should('have.property', 'value', cookie)

    })
/*







