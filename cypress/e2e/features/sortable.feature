Feature: Sortable Interaction

  As a user
  I want to interact with the Sortable functionality on the DemoQA website
  To be able to reorder items using drag and drop

  Scenario: Reorder items to ascending order
    Given I navigate to the DemoQA website
    And I choose the "Interactions" option 
    And I click on the "Sortable" submenu
    When I drag the item "Two" above the item "One"
    And I drag the item "Three" above the item "Two"
    And I drag the item "Four" above the item "Three"
    And I drag the item "Five" above the item "Four"
    And I drag the item "Six" above the item "Five"
    Then The items should be in ascending order