Feature: Interação com Web Tables

  As a user
  I want to interact with the web tables on the DemoQA website
  So that I can create, edit, and delete records

  Scenario: Criar, editar e deletar um novo registro
    Given I navigate to the DemoQA website
    And I choose the "Elements" option
    And I click on the "Web Tables" submenu
    When I click on the "Add" button
    And I fill the registration form with new data
    And I submit the form
    Then the new record should be displayed in the table
    When I click the "Edit" button for the new record
    And I edit the registration form data
    And I submit the form
    Then the record should be updated in the table
    When I click the "Delete" button for the new record
    Then the new record should be deleted from the table

    