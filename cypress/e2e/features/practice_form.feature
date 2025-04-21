Feature: Interação com o formulário de prática

  As a user
  I want to interact with the practice form on the DemoQA website
  So that I can submit my information and verify the submission

  Scenario: Preencher e submeter o formulário de prática
    Given I navigate to the DemoQA website
    And I choose the "Forms" option
    And I click on the "Practice Form" submenu
    When I fill the form with random data
    And I submit the form
    Then a modal dialog should be displayed
    And I close the modal dialog