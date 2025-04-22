import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-wait-until';

When('I click the "Start" button', () => {
  cy.get('#startStopButton').click();
  cy.wait(500);
});

When('I wait until the progress bar value is greater than {int}', (value) => {
  cy.waitUntil(() => {
    return cy.get('[role="progressbar"]')
      .invoke('attr', 'aria-valuenow')
      .then((val) => parseInt(val) > value);
  }, {
    timeout: 10000,
    interval: 200,
    errorMsg: `Progress bar did not exceed ${value}%`
  });
});

When('I stop the progress bar before it reaches {int}%', (limit) => {
    cy.waitUntil(() => {
      return cy.get('[role="progressbar"]')
        .invoke('attr', 'aria-valuenow')
        .then((val) => {
          const currentValue = parseInt(val);
          cy.log(`Valor atual da barra: ${currentValue}`);
          return Cypress.Promise.resolve(!isNaN(currentValue) && currentValue >= limit); // Retorna uma Promise resolvida
        });
    }, {
      timeout: 40000,
      interval: 200,
      errorMsg: `A barra de progresso não atingiu o limite de ${limit}%`
    }).then(() => {
      cy.get('#startStopButton').click();
      cy.log('Botão de stop clicado');
      cy.wait(2000);

     
    });
  });

  Then('the progress bar value should be within {int} and {int}', (minLimit, maxLimit) => {
    cy.get('[role="progressbar"]', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .invoke('attr', 'aria-valuenow')
      .then((value) => {
        const currentValue = parseInt(value);
        cy.log(`Valor final da barra de progresso: ${currentValue}`);
        expect(currentValue).to.be.within(minLimit, maxLimit);
      });
  });

When('I wait until the progress bar reaches {int}%', (limit) => {
  cy.waitUntil(() => {
    return cy.get('[role="progressbar"]')
      .invoke('attr', 'aria-valuenow')
      .then((value) => parseInt(value) === limit);
  }, {
    timeout: 25000,
    interval: 200,
    errorMsg: `A barra de progresso não atingiu ${limit}%`
  });
});

Then('the "Reset" button should be visible', () => {
  cy.get('#resetButton', { timeout: 10000 }).should('be.visible');
});

When('I click the "Reset" button', () => {
  cy.get('#resetButton').click();
});

Then('the progress bar value should be {int}', (value) => {
  cy.get('[role="progressbar"]', { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .invoke('attr', 'aria-valuenow')
    .then((val) => {
      const currentValue = parseInt(val);
      expect(currentValue).to.equal(value);
    });
});
