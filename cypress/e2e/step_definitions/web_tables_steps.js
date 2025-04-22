import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

let newRecordData = {};
let dynamicRecordsData = [];

When('I click on the "Add" button', () => {
  cy.get('#addNewRecordButton').click();
});

When('I fill the registration form with new data', () => {
  newRecordData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 30000, max: 150000 }),
    department: faker.commerce.department()
  };
  cy.get('#firstName').type(newRecordData.firstName);
  cy.get('#lastName').type(newRecordData.lastName);
  cy.get('#userEmail').type(newRecordData.email);
  cy.get('#age').type(newRecordData.age);
  cy.get('#salary').type(newRecordData.salary);
  cy.get('#department').type(newRecordData.department);
});


Then('the new record should be displayed in the table', () => {
  cy.get('.rt-tbody')
    .contains('.rt-tr-group', newRecordData.firstName)
    .should('be.visible');
});

When('I click the "Edit" button for the new record', () => {
  cy.get('.rt-tbody')
    .contains('.rt-tr-group', newRecordData.firstName)
    .within(() => {
      cy.get('[title="Edit"]').click();
    });
});

When('I edit the registration form data', () => {
  newRecordData.firstName = faker.person.firstName();
  newRecordData.salary = faker.number.int({ min: 50000, max: 200000 });
  cy.get('#firstName').clear().type(newRecordData.firstName);
  cy.get('#salary').clear().type(newRecordData.salary);
});

Then('the record should be updated in the table', () => {
  cy.get('.rt-tbody')
    .contains('.rt-tr-group', newRecordData.firstName)
    .within(() => {
      cy.contains('.rt-td', newRecordData.salary).should('be.visible');
    });
});

When('I click the "Delete" button for the new record', () => {
  cy.get('.rt-tbody')
    .contains('.rt-tr-group', newRecordData.firstName)
    .within(() => {
      cy.get('[title="Delete"]').click();
    });
});

Then('the new record should be deleted from the table', () => {
  cy.get('.rt-tbody')
    .contains('.rt-tr-group', newRecordData.firstName)
    .should('not.exist');
});

// Bônus: Criar e deletar múltiplos registros

When('I create {int} new records dynamically', (count) => {
  for (let i = 0; i < count; i++) {
    const recordData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 30000, max: 150000 }),
      department: faker.commerce.department()
    };
    dynamicRecordsData.push(recordData);
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(recordData.firstName);
    cy.get('#lastName').type(recordData.lastName);
    cy.get('#userEmail').should('not.be.disabled').type(recordData.email);
    cy.get('#age').type(recordData.age);
    cy.get('#salary').type(recordData.salary);
    cy.get('#department').type(recordData.department);
    cy.get('#submit').click();
    cy.wait(100);
  }
//   cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', count);
});

Then('all {int} new records should be displayed in the table', (count) => {
    dynamicRecordsData.forEach(record => {
      cy.get('.rt-tbody')
        .find('.rt-tr-group') // Encontra todos os grupos de linhas
        .filter(`:contains("${record.firstName}")`) // Filtra para encontrar o grupo que contém o nome
        .within(() => {
          cy.contains('.rt-td', record.lastName).should('be.visible');
          cy.contains('.rt-td', record.email).should('be.visible');
          cy.contains('.rt-td', record.age).should('be.visible');
          cy.contains('.rt-td', record.salary).should('be.visible');
          cy.contains('.rt-td', record.department).should('be.visible');
        });
    });
});



When('I delete all the newly created records', () => {
    dynamicRecordsData.forEach(record => {
      cy.get('.rt-tbody')
        .find('.rt-tr-group')
        .filter(`:contains("${record.firstName}")`)
        .within(() => {
          cy.get('[title="Delete"]').click();
        });
    });
});

Then('no new records should be present in the table', () => {
  dynamicRecordsData.forEach(record => {
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', record.firstName)
      .should('not.exist');
  });

});