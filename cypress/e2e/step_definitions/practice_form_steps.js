import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();
const mobile = faker.phone.number().replace(/\D/g, '').slice(0, 10);
const day = String(faker.number.int({ min: 1, max: 28 })).padStart(2, '0');
const month = faker.date.month();
const year = faker.number.int({ min: 1900, max: 2023 });
const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
const hobbies = faker.helpers.arrayElements(['Sports', 'Reading', 'Music']);
const address = faker.location.streetAddress();
const state = 'NCR';
const city = 'Delhi';
const fileName = 'sample.txt';

// Given('I navigate to the DemoQA website', () => {
//   cy.visit('https://demoqa.com/');
// });

// Given('I choose the {string} option', (option) => {
//   cy.contains(option).click();
// });

// Given('I click on the {string} submenu', (submenu) => {
//   cy.contains(submenu).click();
// });

When('I fill the form with random data', () => {
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(email);
  cy.get(`input[name="gender"][value="${gender}"]`).check({ force: true });
  cy.get('#userNumber').type(mobile);
  cy.get('#dateOfBirthInput').click();
  cy.get('.react-datepicker__month-select').select(month);
  cy.get('.react-datepicker__year-select').select(year.toString());
  cy.get(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`)
  .should('exist')
  .click();
  hobbies.forEach(hobby => {
    cy.contains('.custom-control-label', hobby).click();
  });
  cy.get('#currentAddress').type(address);
  
  cy.get('#state').click({ force: true });

  cy.get('div.css-1wa3eu0-placeholder').contains('Select State').click();

  cy.get('#state').find('input').type('NCR{enter}');

  cy.get('#city').click();
  cy.get('#city').find('input').type('Delhi{enter}', { force: true });
});

When('I upload a {string} file', (filename) => {
  cy.fixture(filename).then(fileContent => {
    cy.get('#uploadPicture').attachFile({
      fileContent,
      fileName: filename,
      mimeType: 'text/plain'
    });
  });
});

Then('a modal dialog should be displayed', () => {
  cy.get('.modal.show', { timeout: 10000 }).should('be.visible');
});

Then('I close the modal dialog', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.modal-backdrop').length) {
      cy.get('.modal-backdrop').invoke('remove');
    }
  });
  cy.get('#closeLargeModal')
    .scrollIntoView()
    .should('exist')
    .click({ force: true });
});