 describe('Testing sports book betslip and potential win', function() {
    
    it('Tests Sports book combo ticket adding and pos sible win', function () {
        context('log in to coolbet site', function () {
            cy.visit(Cypress.env('url'));
    
            cy.url().should('eq', `${Cypress.env('url')}/et/tere-tulemast`);
            cy.get('.welcome-header').should('be.visible');

            cy.get('[data-test=button-login]').click();

            cy.get('.login-form').should('be.visible')
            .should('contain', 'Tere tulemast tagasi')
            .find('.login-button');

            cy.login('reemetz@gmail.com', Cypress.env('default.password'));

            cy.submit();

        });

        context('navigate to sports view', function () {
            const indexArray = [0, 8, 17];
            let potentialWinl = 1;
            cy.navigateTo('Sport');
            
            // Open English Champions League
            cy.get('.sport-category-view', { timeout: 5000}).should('be.visible');  
            cy.get('[href="/et/sport/jalgpall/inglismaa/meistriliiga"] > .sport-name').click();
            indexArray.forEach((number, i ) => {
                cy.get('.match-market-outcome > button > span').each(($el, index) => {
                    if(number == index){
                        const confistent = Number($el.text());
                        potentialWinl *= confistent;
                        $el.click();
    
                       if(i === indexArray.length-1) {
                           cy.get('.total-odds > .value').should('contain', potentialWinl.toFixed(2).toString());

                           cy.get('input[name="yourStakeCombo"]').type("2");
                            cy.wait(500);
                           cy.get('.potential-return > .value').should('contain', 2*potentialWinl.toFixed(2).toString());
                           return;
                       } 
                    }              
                });


               
            })
            
           
        
        });

        context('Log out', function() {
            cy.logOut();
            cy.visit('https://www.coolbet.com')
            cy.end();
        });
    });
});