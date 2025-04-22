import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-drag-drop';

When('I drag the item {string} above the item {string}', (draggedItem, targetItem) => {
    cy.get('.vertical-list-container .list-group-item').contains(draggedItem)
    .then($dragged => {
      const draggable = $dragged[0];
      const coordsDragged = draggable.getBoundingClientRect();
      const centerXDragged = coordsDragged.left + coordsDragged.width / 2;
      const centerYDragged = coordsDragged.top + coordsDragged.height / 2;

      cy.get('.vertical-list-container .list-group-item').contains(targetItem)
        .then($target => {
          const target = $target[0];
          const coordsTarget = target.getBoundingClientRect();
          const centerXTarget = coordsTarget.left + coordsTarget.width / 2;
          const centerYTarget = coordsTarget.top + coordsTarget.height / 2;

          cy.wrap(draggable)
            .trigger('mousedown', { which: 1, clientX: centerXDragged, clientY: centerYDragged, force: true })
            .trigger('mousemove', { which: 1, clientX: centerXTarget, clientY: centerYTarget, force: true })
            .trigger('mouseup', { force: true });
        });
    });
});

Then('The items should be in ascending order', () => {
  const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  cy.get('.vertical-list-container .list-group-item').each(($el, index) => {
    cy.wrap($el).should('contain', expectedOrder[index]);
  });
});