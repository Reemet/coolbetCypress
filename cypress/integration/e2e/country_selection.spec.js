
const countryCodes =  { 
    ca : { code:'CA', currency: 'CAD'}, 
    cl: { code:'CL', currency: 'CLP'}, 
    dk: { code: 'DK', currency: 'DKK'}, 
    ee: { code: 'EE', currency: 'EUR'}, 
    fi: { code: 'FI', currency: 'EUR'}, 
    is: { code: 'IS', currency: 'EUR'}, 
    no: { code: 'NO', currency: 'NOK'}, 
    se: { code: 'SE', currency: 'SEK'}, 
    row: { code: 'ROW', currency: ''} }

describe('Opens registration and tests all country selections', function () {
    it('navigates to registration and selects Rest of World', function() {
        
        cy.visit(Cypress.env('url'));
        cy.setLanguageTo('English');
        cy.welcomePageShouldBeVisible();
        cy.openRegistration();
        cy.checkRegistrationModal();
        cy.expectInputsWithName(['email', 'password', 'phoneNumber', 'acceptTermsAndConditions']);
        cy.checkBox('acceptTermsAndConditions');
        // wait for animation to end
        cy.wait(1000); 
        
        cy.selectCountry(countryCodes.row.code);
        cy.expectRegistrationROWError();
     
    });
});
    /*it('Tests all other selections', function() {

        for( const key of Object.keys(countryCodes)) {
            if(countryCodes[key].code !== 'ROW') {

                cy.selectCountry(countryCodes[key].code);
                cy.expectSelectedOption('select[name=currency]', countryCodes[key].currency);
            } else {
                cy.expectRegistrationRowError();
            }
            
        }
    });*/

// });