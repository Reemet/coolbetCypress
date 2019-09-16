describe('Poker Client Specific logins', function () {
    beforeEach( () => {
        cy.clearLocalStorage();
        cy.clearCookies();

        cy.server();
        cy.route('POST', 'https://www.coolbetstage.com/s/auth-cb/login/').as('login');
        cy.route('GET', 'https://www.coolbetstage.com/s/users-cb/me/').as('me');
    })

    it('Opens coolbet poker login window logs in with FIN credentials', function() {
       

        cy.visit(`${Cypress.env('poker.url')}et`, { onBeforeLoad: (win) => {
            win.fetch = null
            }
            
        });

        cy.login(Cypress.env('finnish.email'), Cypress.env('cool.password'));
        cy.wait('@login');
        cy.wait('@me');

        cy.get('@login').then(function(xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.requestHeaders).to.have.property('content-type');
            expect(xhr.request.body.email).to.eq(Cypress.env('finnish.email'));
        });

        cy.get('@me').then( function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.request.headers.cbauth).to.have.string('Bearer');
            expect(xhr.request.headers.login_session_id).to.be.a('string');
        });
    });

    it('Opens coolbet poker login window logs in with NOR credentials', function() {
       

        cy.visit(`${Cypress.env('poker.url')}no`, { onBeforeLoad: (win) => {
            win.fetch = null
            }
            
        });

        cy.login(Cypress.env('norway.email'), Cypress.env('cool.password'));
        cy.wait('@login');
        cy.wait('@me');

        cy.get('@login').then(function(xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.requestHeaders).to.have.property('content-type');
            expect(xhr.request.body.email).to.eq(Cypress.env('norway.email'));
        });

        cy.get('@me').then( function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.request.headers.cbauth).to.have.string('Bearer');
            expect(xhr.request.headers.login_session_id).to.be.a('string');
        });
    });

    it('Opens coolbet poker login window logs in with SWE credentials', function() {
       
        cy.visit(`${Cypress.env('poker.url')}en`, { onBeforeLoad: (win) => {
            win.fetch = null
            }
            
        });

        cy.login(Cypress.env('swedish.email'), Cypress.env('cool.password'));
        cy.wait('@login');
        cy.wait('@me');

        cy.get('@login').then(function(xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.requestHeaders).to.have.property('content-type');
            expect(xhr.request.body.email).to.eq(Cypress.env('swedish.email'));
        });

        cy.get('@me').then( function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.request.headers.cbauth).to.have.string('Bearer');
            expect(xhr.request.headers.login_session_id).to.be.a('string');
        });

        cy.get('.annual-report-header').should('be.visible');
        cy.get('h2').should('contain', 'Your Gambling Statistics');
    });
    it('Opens coolbet poker login window logs in with SWE credentials', function() {
       

        cy.visit(`${Cypress.env('poker.url')}et`, { onBeforeLoad: (win) => {
            win.fetch = null
            }
            
        });

        cy.login(Cypress.env('estonia.email'), Cypress.env('cool.password'));
        cy.wait('@login');
        cy.wait('@me');

        cy.get('@login').then(function(xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.requestHeaders).to.have.property('content-type');
            expect(xhr.request.body.email).to.eq(Cypress.env('estonia.email'));
        });

        cy.get('@me').then( function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.request.headers.cbauth).to.have.string('Bearer');
            expect(xhr.request.headers.login_session_id).to.be.a('string');
        });
    });
    it('Expect different login when Trying to log in Swedish site', function() {

        cy.visit(`${Cypress.env('poker.url')}sv`);
        cy.get('.bank-id-button').should('be.visible');
    });
});