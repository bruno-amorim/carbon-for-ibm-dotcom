/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSModalHeading from '@carbon/web-components/es/components/modal/modal-heading.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Extends the CDSModalHeading
 *
 * @element c4d-filter-modal-heading
 */
@customElement(`${c4dPrefix}-filter-modal-heading`)
class C4DFilterModalHeading extends StableSelectorMixin(CDSModalHeading) {
  static get stableSelector() {
    return `${c4dPrefix}-filter-modal-heading`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFilterModalHeading;
