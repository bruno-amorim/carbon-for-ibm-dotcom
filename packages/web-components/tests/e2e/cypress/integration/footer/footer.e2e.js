/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-footer', () => {
  it('should load the default cds-footer example', () => {
    cy.visit('/footer');

    cy.get('[data-autoid="cds--footer-nav-group"]');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-footer | default');
  });
});
