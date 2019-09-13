describe('tests user login functionality', function() {
    it('opens coolbet site', function() {
        cy.visit(Cypress.env("url"));
        cy.url().should('eq', `${Cypress.env("url")}/et/tere-tulemast`);
        cy.welcomePageShouldBeVisible();
    });

    it('logs in', function() {
        cy.clickButton('Logi sisse');

        cy.login(Cypress.env("email"), Cypress.env('default.password'));

        cy.wait(2000);
        cy.logOut();
        cy.wait(1000);
    });
/*
    it('checks for alternative logins', function() {
        cy.clickButton('Logi sisse');

        cy.get('.other-options-button').click();

        cy.get('button').contains('Google').should('be.visible');
        cy.get('button').contains('Facebook').should('be.visible');
        cy.get('img[alt=Mobiil-ID]').should('be.visible');
    });
    */
});
