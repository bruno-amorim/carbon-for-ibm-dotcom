/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Masthead)
 *
 * @type {string}
 * @private
 */

const _selectors = {
  mastheadContainer: 'c4d-masthead-container',
  mastheadProfile: 'c4d-masthead-profile',
  mastheadProfileItem: 'c4d-masthead-profile-item',
}

const _pathDefault =
  '/iframe.html?id=components-masthead--default&knob-use%20mock%20nav%20data%20(use-mock)=true&knob-The%20user%20authenticated%20status%20(user-status)=test.user@ibm.com';

describe('c4d-masthead | authenticated (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780).visit(`/${_pathDefault}`);
  });

  it('should open the login menu with 4 items', () => {
    cy.get(_selectors.mastheadProfile)
      .shadow()
      .find('a')
      .click();
    cy.get(_selectors.mastheadProfileItem).should('have.length', 4);
    cy.takeSnapshots();
  });

  it('should not render profile menu when disabled', () => {
    cy.get(_selectors.mastheadContainer).invoke('attr', 'has-profile', 'false');
    cy.get(_selectors.mastheadProfile).should('not.exist');
    cy.takeSnapshots();
  });
});

describe('c4d-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 780).visit(`/${_pathDefault}`);
  });

  it('should open the login menu with 4 items', () => {
    cy.get(_selectors.mastheadProfile)
      .shadow()
      .find('a')
      .click();
    cy.get(_selectors.mastheadProfileItem).should('have.length', 4);
    cy.takeSnapshots('mobile');
  });
});
