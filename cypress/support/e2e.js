Cypress.on('uncaught:exception', (err, runnable) => {
    // impede que falhas por erros de terceiros (ex: scripts cross-origin) quebrem o teste
    return false;
  });