describe('tests user login functionality', function() {
    let polyfill
    before(() => {
      const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
      cy.request(polyfillUrl)
        .then((response) => {
          polyfill = response.body
      })
    })
  
    beforeEach( () => {
      cy.clearLocalStorage();
      cy.clearCookies();
  
      cy.server();
      cy.route('POST', 'https://www.coolbetstage.com/s/auth-cb/login/').as('login');
      cy.route('GET', 'https://www.coolbetstage.com/s/users-cb/me/').as('me');
  
      cy.visit(Cypress.env("stage.url"), { onBeforeLoad: (win) => {
        delete win.fetch;
        win.eval(polyfill)
        win.fetch = win.unfetch
        }
      });
  });
  
      it('Tries log in with finnish email', function() {
        cy.welcomePageShouldBeVisible();
  
        cy.login(Cypress.env('finnish.email'), Cypress.env('cool.password'));
  
        cy.wait('@login');
        cy.wait('@me');
  
        cy.get('@login').then(function(xhr) {
              expect(xhr.status).to.eq(200);
           
              expect(xhr.requestHeaders['Content-Type']).to.eq('application/json; charset=utf-8');
              expect(xhr.request.body.email).to.eq(Cypress.env('finnish.email'));
        });
  
        cy.get('@me').then( function (xhr) {
              expect(xhr.status).to.eq(200);
              expect(xhr.request.headers.cbauth).to.have.string('Bearer');
              expect(xhr.request.headers['X-Device']).to.eq('DESKTOP');
              expect(xhr.request.headers.Login_Session_Id).to.be.a('string');
        });
        cy.wait(3000);
        cy.get('.account-button').should('be.visible');
        cy.logOut();
  
      });
  
      it('Tries to log in with swe credentials', function() {
     
        cy.welcomePageShouldBeVisible();
        cy.login(Cypress.env('swedish.email'), Cypress.env('cool.password'));
  
        cy.wait('@login');
        cy.wait('@me');
  
        cy.get('@login').then(function(xhr) {
              expect(xhr.status).to.eq(200);
           
              expect(xhr.requestHeaders['Content-Type']).to.eq('application/json; charset=utf-8');
              expect(xhr.request.body.email).to.eq(Cypress.env('swedish.email'));
        });
  
        cy.get('@me').then( function (xhr) {
              expect(xhr.status).to.eq(200);
              expect(xhr.request.headers.cbauth).to.have.string('Bearer');
              expect(xhr.request.headers['X-Device']).to.eq('DESKTOP');
              expect(xhr.request.headers.Login_Session_Id).to.be.a('string');
        });
  
        cy.expectSwedishButtons();
        cy.wait(500); // Wait if annual report appears.
        if (Cypress.$('.annual-report-header').length > 0 ) {
          // this will fail. need to test this.
           cy.get('.annual-report-header').should('be.visible');
        } else {
          cy.log('Not Found');
        }
        cy.wait(3000);
        cy.get('.account-button').should('be.visible');
        cy.logOut();
      });
  
      it('Logs in with Norweigian email', function() {
        cy.welcomePageShouldBeVisible();
        cy.login(Cypress.env('norway.email'), Cypress.env('cool.password'));
  
        cy.wait('@login');
        cy.wait('@me');
  
        cy.get('@login').then(function(xhr) {
              expect(xhr.status).to.eq(200);
           
              expect(xhr.requestHeaders['Content-Type']).to.eq('application/json; charset=utf-8');
              expect(xhr.request.body.email).to.eq(Cypress.env('norway.email'));
        });
  
        cy.get('@me').then( function (xhr) {
              expect(xhr.status).to.eq(200);
              expect(xhr.request.headers.cbauth).to.have.string('Bearer');
              expect(xhr.request.headers['X-Device']).to.eq('DESKTOP');
              expect(xhr.request.headers.Login_Session_Id).to.be.a('string');
        });
        cy.wait(3000);
        cy.get('.account-button').should('be.visible');
        cy.logOut();
  
      });
  
      it('Logs in with Estonian email', function() {
        cy.welcomePageShouldBeVisible();
  
        cy.login(Cypress.env('estonia.email'), Cypress.env('cool.password'));
        cy.wait('@login');
        cy.wait('@me');
        cy.get('@login').then(function(xhr) {
          expect(xhr.status).to.eq(200);
       
          expect(xhr.requestHeaders['Content-Type']).to.eq('application/json; charset=utf-8');
          expect(xhr.request.body.email).to.eq(Cypress.env('estonia.email'));
          
        });
        cy.get('@me').then( function (xhr) {
          expect(xhr.status).to.eq(200);
          expect(xhr.request.headers.cbauth).to.have.string('Bearer');
          expect(xhr.request.headers['X-Device']).to.eq('DESKTOP');
          expect(xhr.request.headers.Login_Session_Id).to.be.a('string');
        });
        cy.wait(3000);
        cy.get('.account-button').should('be.visible');
        cy.logOut();
        // jq '.push.changes[].commits[].author.raw'
      });
  });