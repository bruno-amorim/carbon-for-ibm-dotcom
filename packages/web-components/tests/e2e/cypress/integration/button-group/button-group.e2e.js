/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-button-group', () => {
  it('should load the default button group example', () => {
    cy.visit('/button-group');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-button-group | default');
  });
});
