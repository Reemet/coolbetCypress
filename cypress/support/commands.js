// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

const initials = {
    english: 'en',
    estonian: 'et',
    finnish: 'fi',
    norwegian: 'no',
    swedish: 'sv',
    island: 'is',
    chile: 'cl',
    danish: 'da',
    russian: 'ru'
}
const countryCodes =  { 
    ca : { code:'CA'},
    cl: { code:'CL'}, 
    da: { code: 'DK'}, 
    et: { code: 'EE'}, 
    fi: { code: 'FI'}, 
    is: { code: 'IS'}, 
    no: { code: 'NO'}, 
    se: { code: 'SE'}, 
    row: { code: 'ROW'} 
}

Cypress.Commands.add("login", ( email, password ) => { 
        cy.get('input[type=email]').type(email);
        cy.get('input[type=password]').type(password);
        cy.get('button[type=submit]').click();
 });

 Cypress.Commands.add("submit", () => {
    cy.get('button[type=submit]').click()
 });

 Cypress.Commands.add("clearLogin", ( email, password ) => { 

    cy.get('input[type=email]').clear();
    cy.get('input[type=password]').clear();

 });

 Cypress.Commands.add('checkBox', (name) => {
    cy.get(`input[name=${name}]`).click({ force: true });
 });

 Cypress.Commands.add('clickLink', (text) => {
    cy.get('a').contains(text).click()
 });

 Cypress.Commands.add('expectMenuToContain', (element, array) => {

    if(array.length) {
        array.forEach(el => {
            cy.get(element).contains(el);
        });
    }
 });

 Cypress.Commands.add('expectInputsWithName', (names) => {
     if(names.length) {
         names.forEach(name => {
             cy.get(`input[name=${name}]`).should('exist');
         })
     }
 });

 Cypress.Commands.add('changePassword', (current, newpass, repeat) => {
    cy.get('input[name=currentPassword]').type(current);
    cy.get('input[name=newPassword]').type(newpass);
    cy.get('input[name=newPasswordConfirm]').type(repeat);

 });

Cypress.Commands.add('expectBalanceToBe', (element, expectedBalance) => {
    cy.get(element).contains(expectedBalance);
});

 Cypress.Commands.add('openSettings', (element) => {
    cy.get('.account-button').get('.account-button-dropdown-container').contains(element).click( { force: true });
 });

Cypress.Commands.add('navigateTo', (element) => {
    cy.get('.header-products-nav').contains(element).click();
});

 Cypress.Commands.add('clickButton', (buttonText) => {
     cy.get('button').contains(buttonText).click()
 });

 Cypress.Commands.add('logOut', () => {
   //  cy.get('button').trigger('mouseover');
  
    // cy.get('.account-button-dropdown-container').trigger('mouseover') //.contains('Logi välja').click( { force: true });
 });

Cypress.Commands.add('selectCountry', (code) => {
    cy.get('select[name=country]').select(code);
});

Cypress.Commands.add('expectSelectedOption', (selectElem, value) => {
    cy.get(selectElem)
  .find('option')
  // .should(cb) callback function will be retried
  .should(($option) => {


    expect($option).to.contain.text(value);
  });
});
Cypress.Commands.add('openRegistration', () => {
        cy.url().then( ($url) => {
           const $el = $url.split('/')[3];

            cy.fixture($el).then( ($json) => {
                
                const register = $json['ui.common.register'];
                 cy.get('button').contains(register).click();
             })
        });     
});
Cypress.Commands.add('checkNavigationHeader', () => {
    cy.url().then( ($url) => {
        const $el = $url.split('/')[3];

        cy.fixture($el).then( ($json) => {
            cy.get('.header-container')
                .should('be.visible')
                .find('.header-products-nav')
                .should('contain', $json['ui.header.promotions'])
                .should('contain', $json['ui.header.poker'])
                .should('contain', $json['ui.header.sports'])
                .should('contain', $json['ui.header.casino'])
                .should('contain', $json['ui.header.blog']);

            cy.get('.header-user-controls')
                .should('be.visible')
                .should('contain', $json['ui.common.register'])
                .should('contain', $json['ui.header.login'])
        });
    })
});

Cypress.Commands.add('checkRegistrationModal', () => {

    cy.url().then( ($url) => {
        const $countryCode = $url.split('/')[3];
        if ($countryCode === 'sv') {

            cy.get('img[alt="Bank-ID"]').should('be.visible');

        }  

          
          else {

            cy.fixture($countryCode).then ( ($json) => {
                cy.get('label').contains($json['ui.registration.email---password']);
                cy.get('label').contains($json['ui.registration.mobile-phone']);
                cy.get('p').contains($json['ui.registration.use-valid-phone']);
                cy.get('button').contains($json['ui.registration.register']);

                if ($countryCode === 'da') {
                    cy.get('.nem-id-login-button').should('be.visible');
                }
            });
        }
        
    });
});
Cypress.Commands.add('expectRegistrationROWError', () => {
    cy.url().then( ($url) => {
        const $countryCode = $url.split('/')[3];

        cy.fixture($countryCode).then(($json) => {
            cy.get('div').contains($json['ui.account.row-blocked']);
        })
    });
});
Cypress.Commands.add('setLanguageTo', (lang) => {
    const langInitials = initials[lang.toLowerCase()];
 
    cy.get('.ui-language-select-mini-text').then(($el) => {
        if($el.text() !== langInitials) {
            cy.changeLanguage(langInitials);
        }
    }); 
});
Cypress.Commands.add('changeCurrencyTo', (country) => {
    const $countryCode = initials[country.toLowerCase()];
    console.log($countryCode);
    let $option; 
    switch($countryCode) {
        case 'ru':
        case 'en':
        case 'sv':
            return;

        default:
            $option = countryCodes[$countryCode].code.toUpperCase();
            cy.get('[data-test=country]').select($option);
            break;
            
    }
})
Cypress.Commands.add('welcomePageShouldBeVisible', () => {
        cy.get('.header-container').should('be.visible');
        cy.get('div[type=sports]').should('be.visible');
        cy.get('div[type=poker]').should('be.visible');
        cy.get('div[type=casino]').should('be.visible');
        cy.get('.welcome-title').should('be.visible');
});
Cypress.Commands.add('changeLanguage', (selection) => {
    cy.get('.ui-language-select-mini-board-language-text').contains(selection).click({ force: true });
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... }) 
