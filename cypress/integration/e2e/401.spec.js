describe('tries to hit too many requests with log in', function() {
    
    it('Log in attempt 1', function() {
        cy.visit(Cypress.env('url'));

        cy.clickButton('Logi sisse');

        cy.login('reemet@gmail.com', 'randomwrongpassword');

        cy.get('div').contains('Vale e-mail või salasõna').should('be.visible');

        cy.clearLogin();
    });

    it('Log in attempt 2', function() {
        cy.visit(Cypress.env('url'));
        cy.clickButton('Logi sisse');
        cy.login('reemeta@gmail.com', 'randomwrongpassworasdasdd');

        cy.get('div').contains('Vale e-mail või salasõna').should('be.visible');

        cy.clearLogin();
    });
    it('Log in attempt 3', function() {
        cy.visit(Cypress.env('url'));
        cy.clickButton('Logi sisse');
        cy.login('reemetb@gmail.com', 'randomwrongpassworasdasdd');

        cy.get('div').contains('Vale e-mail või salasõna').should('be.visible');
    });

    it('Log in attempt 4', function() {
        cy.visit(Cypress.env('url'));
        cy.clickButton('Logi sisse');
        cy.login('reemetz@gmail.com', 'randomwrongpassworasdasdd');

        for (let i = 0; i < 10; i++) {

            cy.get('button[data-test="button-submit"]').click();
        }

        cy.get('div').contains('Liiga mitu ebaõnnestunud sisselogimiskatset. Palun proovi 5 minuti pärast uuesti.').should('be.visible');


    });

});