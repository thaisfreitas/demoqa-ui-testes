import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I click on the "New Window" button and a new window should be opened', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('newWindow');
      cy.wrap('@newWindow'); // Promove o alias para o contexto do Cypress
    });
    cy.get('#windowButton').click();
  });
  
  Then('a new browser window should be opened', () => {
    cy.get('@newWindow').should('be.called');
  });
  
  Then('I can switch to the new window', () => {
    cy.get('@newWindow').should('be.called');
    cy.window().then((win) => {
      const relativeUrl = win.open.args[0][0];
      const newWindowUrl = new URL(relativeUrl, 'https://demoqa.com/').toString();
      cy.log(`Attempting to visit: ${newWindowUrl}`);
      cy.visit(newWindowUrl);
    });
  });
  
  Then('I can see the message {string} in the new window', (message) => {
    cy.get('body').should('contain', message);
  });
  
  Then('I close the new window', () => {
    cy.window().then((win) => {
    });
  });
  
  Then('I switch back to the original window', () => {
    cy.go('back'); 
  });