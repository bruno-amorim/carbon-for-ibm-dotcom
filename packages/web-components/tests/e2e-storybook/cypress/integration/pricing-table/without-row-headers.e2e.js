/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createTests, createTestsMobile } from './_tests';

/**
 * Defines the Story path.
 *
 * @type {string}
 * @private
 */
const path = '/iframe.html?id=experimental-pricing-table--without-row-headers';

describe('c4d-pricing-table | without row headers (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  createTests(path).forEach((test) => test());
});

describe('c4d-pricing-table | without row headers (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [...createTests(path), ...createTestsMobile(path)].forEach((test) => test());
});
