/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const del = require('del');
const gulp = require('gulp');
const config = require('./config');

/**
 * Clean task
 *
 * @returns {Promise} Promise after all folders are cleaned
 * @private
 */
function _clean() {
  return Promise.all([
    del(config.bundleDestDir),
    del(config.cjsDestDir),
    del(config.jsDestDir),
    del(config.sassDestDir),
    del(config.vendorSrcDirBase),
    del('custom-elements.json'),
    del('storybook-static'),
  ]);
}

// Clean task
gulp.task('clean', _clean);
