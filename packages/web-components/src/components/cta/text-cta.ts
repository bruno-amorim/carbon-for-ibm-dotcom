/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import C4DLinkWithIcon from '../link-with-icon/link-with-icon';
import CTAMixin from '../../component-mixins/cta/cta-v1';
import VideoCTAMixin from '../../component-mixins/cta/video';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

export { CTA_TYPE };

const { stablePrefix: c4dPrefix } = settings;

/**
 * Text CTA.
 *
 * @element c4d-text-cta
 */
@customElement(`${c4dPrefix}-text-cta`)
// @ts-ignore
class C4DTextCTA extends VideoCTAMixin(CTAMixin(C4DLinkWithIcon)) {
  /**
   * `true` if there is a non-empty default slot content.
   */
  @state()
  protected _hasContent = false;

  /**
   * Handles `slotchange` event on the default `<slot>`.
   */
  protected _handleSlotChange({ target }: Event) {
    this._hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) =>
          node.nodeType !== Node.COMMENT_NODE &&
          (node.nodeType !== Node.TEXT_NODE || node.nodeValue?.trim())
      );
  }

  protected _renderContent() {
    const { ctaType, _hasContent: hasContent } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderContent();
    }
    const {
      videoDuration,
      videoName,
      formatVideoCaption: formatVideoCaptionInEffect,
      formatVideoDuration: formatVideoDurationInEffect,
    } = this;

    const caption = hasContent
      ? undefined
      : formatVideoCaptionInEffect({
          duration: formatVideoDurationInEffect({
            duration: !videoDuration ? videoDuration : videoDuration * 1000,
          }),
          name: videoName,
        });
    return html`
      <span
        ><slot @slotchange="${this._handleSlotChange}"></slot>${caption}</span
      >
    `;
  }

  /**
   * The CTA type.
   */
  @property({ reflect: true, attribute: 'cta-type' })
  ctaType = CTA_TYPE.REGULAR;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoDuration = formatVideoDuration;

  /**
   * The video duration.
   */
  @property({ type: Number, attribute: 'video-duration' })
  videoDuration?: number;

  /**
   * The video name.
   */
  @property({ attribute: 'video-name' })
  videoName?: string;

  /**
   * The video description.
   */
  @property({ attribute: 'video-description' })
  videoDescription?: string;

  /**
   * The video thumbnail URL.
   * Text CTA does not support video thumbnail, and this property should never be set.
   */
  videoThumbnailUrl?: never;

  static get stableSelector() {
    return `${c4dPrefix}--text-cta`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

console.warn(
  `The c4d-feature-cta component has been deprecated. All its features have been absorbed into
  the base c4d-feature-card component. See migration guide for more information.`
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DTextCTA;
