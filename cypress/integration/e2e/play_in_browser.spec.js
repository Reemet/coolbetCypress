describe('Clicks Play in Browser, expect log in modal', function() {
    it('Opens coolbet',  function()  {
        cy.visit(Cypress.env('url'));

        cy.url().should('eq', `${Cypress.env('url')}/et/tere-tulemast`);

        cy.navigateTo('Pokker');
    });
    it('Clicks on play in browser and expect log in required', function() {
        cy.get('.instant-play-text').contains('Mängi brauseris').click();

        cy.get('.login-form').should('be.visible');

        cy.login(Cypress.env('email'), Cypress.env('default.password'));

        cy.get('.user-name').contains('Reemet');
    });
}); 
