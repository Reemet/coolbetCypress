describe('Opens coolbet.ee and logs in', function()  {

    // Cypress.io starts new session every IT.
    // Therefore for this testing practise will use
    // it block as a main test init  and context for testing.

    // For actual testing practises, avoid this approach and write all tests
    // separate from eachother and start new sessions evey time.
    // adding beforeEach with a custom login method.

    /**
     * This SPEC Logs in to the coolbet site and checks if the landing view contains all 
     * the correct elements
     * Then We change the password and try to log in with old credentials
     * After getting error message that email or password is wrong
     * we log in and change the password back to default value.
     */

    it('tests coolbet.ee website' , function() {
        context('Opens Browser on coolbets site', function()  {
            // Navigates to website
            cy.visit(Cypress.env('url'));

            const languages = ["Estonian", "Danish", "Finnish", "Russian", "Norwegian", "Island", "Swedish", "Chile", "English"];
           
            languages.forEach( (language) => {
                cy.setLanguageTo(language);

                if (language !== 'Chile') {
                    // [ - snippe loading failed! - ]
                    cy.get('.welcome-header').should('be.visible');
                }
               
                // Expect navigation toolbar to contain following options
                cy.checkNavigationHeader()
    
                cy.get('.bear').should('be.visible');
            });
           
            cy.setLanguageTo('English');

            
        });
        context('Tries to log in with right credentials', function () {
            cy.get('[data-test=button-login]').click();

            cy.get('.login-form').should('be.visible')
            .should('contain', 'Welcome back')
            .find('.login-button');

            cy.login(Cypress.env('default.email'), Cypress.env('default.password'));

        });
        
        context('Check if logged in and view contains correct elements', function() {
            cy.get('.account-button').should('contain', Cypress.env('default.name'));
            
            cy.expectMenuToContain('.header-products-nav', ['Sport', 'Casino', 'Poker', 'Promotions', 'Blog']);
            cy.get('.account-balance').then( ($el) => {
               const integer = parseInt($el.text(), 10);
               console.log(integer);

               expect(integer).to.be.greaterThan(45000);
            })
        });
        
        context('Open Settings, expect view to contain password change, change password', function() {
            cy.openSettings('My Account');
            cy.get('h2').should('contain', 'Password change');
            
            cy.expectInputsWithName(['currentPassword', 'newPassword', 'newPasswordConfirm']);
            cy.changePassword(Cypress.env('default.password'), Cypress.env('default.password'), Cypress.env('default.password'))
            cy.clickButton('Change password');
            cy.get('div[role=alert]').should('contain', 'Success!');
            // Log out

           // cy.logOut();
            // wait for relogging to prevent 401
            //cy.wait(5000);
        });
        // Try logging in with wrong credentials after logging out.
      /*  context('Login with incorrect credentials', function () {
            cy.get('[data-test=button-login]').click();

            cy.get('.login-form').should('be.visible')
                .should('contain', 'Welcome back')
                .find('.login-button');
            cy.login('reemet.paabo@gmail.com', 'Huumor312');
        /*
            cy.submit();
    
            cy.get('.login-form').should('not.contain', 'Vale e-mail või salasõna');
            cy.clearLogin();
    
        */
      //   });
        /*
        context('Login with correct credentials after password change', function () {
           
            cy.login('reemet.paabo@gmail.com', 'Huumor321');
            // wait for relogging to prevent 401
            cy.wait(5000);
            cy.submit();
            
            cy.get('.login-form').should('not.contain', 'Vale e-mail või salasõna');
        
        });
     
        context('Reset password to default', function() {
            cy.openSettings('Minu Konto');
            cy.get('h2').should('contain', 'Salasõna muutmine');

            cy.expectInputsWithName(['currentPassword', 'newPassword', 'newPasswordConfirm']);
            cy.changePassword('Huumor321', Cypress.env('default.password'), Cypress.env('default.password'))
            cy.clickButton('Muuda salasõna');
            cy.get('div[role=alert]').should('contain', 'Õnnestus!');
            // Log out

            cy.logOut();
        }); */
    });
    
});