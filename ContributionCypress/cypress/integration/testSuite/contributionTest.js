
import HomePage from '../../support/pageObject/HomePage'
import Beitragsrechner from '../../support/pageObject/Beitragsrechner'
import Berufsstatus from '../../support/pageObject/Berufsstatus'
import Versicherungswunsch from '../../support/pageObject/Versicherungswunsch'
import Geburtstag from '../../support/pageObject/Geburtstag'
import Versicherungsstatus from '../../support/pageObject/Versicherungsstatus'
/// <reference types="cypress" />
import '../../support/commands';


describe('Automating Contribution Page till User reaches Versicherungsstatus', function ()
 {
   
    before(function() {
    cy.visit(Cypress.env("url"))
    
   })
   beforeEach(function(){
    cy.fixture('input').then(function(data){   
        this.data = data
           })
   })
   const homepage = new HomePage
   const beitragsrechner = new Beitragsrechner
   const berufsstatus = new Berufsstatus
   const versicherungswunsch = new Versicherungswunsch
   const geburtstag = new Geburtstag
   const versicherungsstatus = new Versicherungsstatus

it('Navigating to contribution Page',function()
{   //in case if cookie banner comes up
    cy.get('body').then((body) => {
        if (body.find('Akzeptieren').length > 0) {
            cy.contains('Akzeptieren').click();
        }
    });
    homepage.getBeitragsrechnerButton().scrollIntoView().should('be.visible').click();
    beitragsrechner.getOptions().click();
    
})

it('Customer selects Berufstatus and enter Bruttojahresgehalt',function()
{ 
    berufsstatus.selectBerufSatus(this.data.berufsstatus)
    berufsstatus.getBruttojahresgehalt().scrollIntoView().should('be.visible').type(this.data.bruttojahresgehalt)
    berufsstatus.proceed()  
    cy.wait(2000)
})

it('Customer selects Vollversicherung',function()
{ 
    versicherungswunsch.getKrankenversicherungButton().should('be.visible').each(($el, index,$list)=>{
        const options = $el.find('span').text()
        if(options.includes(this.data.krankenversicherung))
        {
            cy.wrap($el).click()
        } 
       })
})

it('Customer selects Versicherung Start date and proceeds',function()
{ 
    versicherungswunsch.getVersicherungStarten().select(this.data.versicherungStarten).should('have.value',this.data.versicherungExpected)
    versicherungswunsch.procced()
})

it('Customer below 18 are not allowed to proceed and error message is displayed',function()
{ 
    cy.enterGeburstag(this.data.Below18geburtstag)
    cy.validateError(this.data.previousDateErr)
})

it('Customer enters future Geburtstag and error message is displayed',function()
{ 
    cy.enterGeburstag(this.data.futureGeburtstag)
     cy.validateError(this.data.futureDateErr)
})

it('Customer enters valid Geburtstag',function()
{ 
    cy.enterGeburstag(this.data.validGeburtstag)
})

it('Verifying if birthday date sent in reqeuest is same as entered in UI',function()
{ 
    cy.intercept({
        url: 'https://www.google-analytics.com/collect?*'
      }).as('post') 
    
      geburtstag.proceed()
    
    cy.wait('@post').then(xhr =>{
        expect(xhr.request.url).includes(this.data.validGeburtstag)
      })
      cy.url().should('include', '/versicherungsstatus')
})

})