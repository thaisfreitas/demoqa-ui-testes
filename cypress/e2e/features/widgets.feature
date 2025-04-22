Feature: Interação com Progress Bar

  As a user
  I want to interact with the progress bar on the DemoQA website
  So that I can start, stop, and reset the progress bar

Scenario: Parar a progress bar antes de um range (UI Delay)
  Given I navigate to the DemoQA website
  And I choose the "Widgets" option
  And I click on the "Progress Bar" submenu
  When I click the "Start" button
  And I wait until the progress bar value is greater than 0
  And I stop the progress bar before it reaches 25%
  Then the progress bar value should be within 25 and 30 

Scenario: Resetar a progress bar após atingir 100%
     Given I navigate to the DemoQA website
     And I choose the "Widgets" option
     And I click on the "Progress Bar" submenu
     When I click the "Start" button
     And I wait until the progress bar reaches 100%
     Then the "Reset" button should be visible
     When I click the "Reset" button
     Then the progress bar value should be 0