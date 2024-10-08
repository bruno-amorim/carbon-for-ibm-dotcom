/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DContentGroup from '../content-group/content-group';
import styles from './content-group-simple.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Simple version of content group.
 *
 * @element c4d-content-group-simple
 */
@customElement(`${c4dPrefix}-content-group-simple`)
class C4DContentGroupSimple extends StableSelectorMixin(C4DContentGroup) {
  static get stableSelector() {
    return `${c4dPrefix}--content-group-simple`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

console.warn(
  'The content-group-simple component has been deprecated in favor of the content-group, image, and content-item components. ' +
    'See content-group, image, and content-item documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentGroupSimple;
