import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I navigate to the DemoQA website', () => {
  cy.visit('https://demoqa.com/');
});


Given('I choose the {string} option', (option) => {
    cy.contains(option).click();
  });

Given('I click on the {string} submenu', (submenu) => {
cy.contains(submenu).click();
});

When('I submit the form', () => {
    cy.get('#submit').click({ force: true });
});