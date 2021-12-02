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
import Geburtstag from '../support/pageObject/Geburtstag'
const geburtstag = new Geburtstag

Cypress.Commands.add('validateError', (message) => { 
    
    geburtstag.getErrorText().invoke('text').then((text => {
        expect(text.trim()).to.eq(message)
    }))
})

Cypress.Commands.add('enterGeburstag', (date) => {
    var input = date.split('.')
    geburtstag.getGeburtstagDay().type(input[0],{force:true})
    geburtstag.getGeburtstagMonth().type(input[1],{force:true})
    geburtstag.getGeburtstagYear().type(input[2],{force:true})

})


//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
