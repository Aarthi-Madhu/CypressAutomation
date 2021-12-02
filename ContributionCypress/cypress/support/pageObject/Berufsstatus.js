class Berufsstatus{

selectBerufSatus(berufsstatus){
    
    cy.get('[data-cy="radio-container"]').find('.radio-button.ng-tns-c56-4').should('be.visible').each(($el, index,$list)=>{
        const options = $el.find('span').text()
        if(options.includes(berufsstatus))
        {
            cy.wrap($el).click()
        }
        
    })
 return this
}

getBruttojahresgehalt()
{
    return cy.get('.form-field')
}

proceed()
{
    return  cy.contains('Weiter').should('be.visible').click()
}
   
}

export default Berufsstatus;