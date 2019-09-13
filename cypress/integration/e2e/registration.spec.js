describe('registration test', function() {
    it('Opens Coolbet.com', function() {
        cy.visit(`${Cypress.env('url')}`);

        const languages = ["Estonian", "Danish", "Finnish", "Russian", "Norwegian", "Island", "Swedish", "Chile", "English"];

        languages.forEach( (language) => {
            cy.setLanguageTo(language);
            cy.wait(500);
            cy.openRegistration();
            cy.changeCurrencyTo(language);
            cy.wait(500);
            cy.checkRegistrationModal();
        });

    });
        
});
