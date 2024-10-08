/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './quote.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The source copy content of quote.
 *
 * @element c4d-quote-source-copy
 */
@customElement(`${c4dPrefix}-quote-source-copy`)
class C4DQuoteSourceCopy extends LitElement {
  /**
   * The shadow slot this source copy content should be in.
   */
  @property({ reflect: true })
  slot = 'source-copy';

  render() {
    return html` <slot></slot> `;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DQuoteSourceCopy;
