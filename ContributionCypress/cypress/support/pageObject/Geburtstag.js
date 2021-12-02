class Geburtstag{


getGeburtstagInput()
{
    return cy.get('.birthday > .ng-tns-c59-9').shadow().find('.wrapper').find('.birthday') 
}
getGeburtstagDay()
{
    return cy.get('.birthday > .ng-tns-c59-9').shadow().find('.wrapper').find('.birthday').find('.day')
}
getGeburtstagMonth()
{
    return cy.get('.birthday > .ng-tns-c59-9').shadow().find('.wrapper').find('.birthday').find('.month') 
}
getGeburtstagYear()
{
    return cy.get('.birthday > .ng-tns-c59-9').shadow().find('.wrapper').find('.birthday').find('.year') 
}
  
getErrorText()
{
    return cy.get('.error-message')
}

proceed()
{
    return cy.contains('Weiter').should('be.visible').click()
}

}

export default Geburtstag;