import 'cypress-wait-until';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});