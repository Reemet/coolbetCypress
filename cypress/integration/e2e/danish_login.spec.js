describe('checks danish login path', function() {
    it('Opens coolbet site and changes language', function() {
         cy.visit(Cypress.env('url'));

         cy.url().should('eq', `${Cypress.env("url")}/et/tere-tulemast`);
         cy.welcomePageShouldBeVisible();

         cy.changeLanguage('da');
         cy.url().should('eq', `${Cypress.env('url')}/da/welcome`);
         cy.clickButton('Log ind')
         cy.get('.welcome-back').should('contain', 'Velkommen tilbage');

         cy.get('img[alt=Nem-ID]').should('be.visible');

         cy.clickButton('Andre login-muligheder');
         cy.get('.email-login-button').should('be.visible');

         cy.clickButton('Email-login');


         cy.login(Cypress.env('email'), Cypress.env('default.password'));
         cy.url().should('eq', `${Cypress.env('url')}/et/tere-tulemast`);

         cy.openSettings('Minu Konto');
         cy.get('.ui-language-select-mini-text').contains('et')

         cy.get('button[type=button]').contains('Logi välja').click()
    });
});
