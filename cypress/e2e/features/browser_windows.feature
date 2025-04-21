Feature: Interação com Browser Windows

  As a user
  I want to interact with the browser windows on the DemoQA website
  So that I can open a new window and verify its content

  Scenario: Abrir nova janela e verificar conteúdo
    Given I navigate to the DemoQA website
    And I choose the "Alerts, Frame & Windows" option
    And I click on the "Browser Windows" submenu
    When I click on the "New Window" button and a new window should be opened
    Then a new browser window should be opened
    And I can switch to the new window
    And I can see the message "This is a sample page" in the new window
    And I close the new window
    And I switch back to the original window