class Versicherungswunsch{

getVersicherungStarten()
{
    return cy.get('select')
}

getKrankenversicherungButton(){
    
return cy.get('[class*="radio-button-group"]').find('[class*="radio-button"]')
}

procced()
{
    return cy.contains('Weiter').should('be.visible').click()
}
    
}

export default Versicherungswunsch;