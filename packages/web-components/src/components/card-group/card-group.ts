/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { GRID_MODE } from './defs';
import styles from './card-group.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';

export { GRID_MODE };

const { stablePrefix: c4dPrefix } = settings;

/**
 * Card Group.
 *
 * @element c4d-card-group
 */
@customElement(`${c4dPrefix}-card-group`)
class C4DCardGroup extends MediaQueryMixin(
  HostListenerMixin(StableSelectorMixin(LitElement)),
  { [MQBreakpoints.MD]: MQDirs.MIN }
) {
  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItems: any[] = [];

  /**
   * Handler for @slotchange, set the height of all headings to the tallest height.
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    this._childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches?.(
          (this.constructor as typeof C4DCardGroup).selectorItem
        )
      );

    // Retrieve item heading, eyebrows, and footers to set same height.
    if (this._childItems) {
      this._childItems.forEach((e) => {
        if (!e.hasAttribute('href') && this.gridMode === GRID_MODE.CONDENSED) {
          this.gridMode = GRID_MODE.DEFAULT;
        }
      });

      const { customPropertyCardsPerRow } = this
        .constructor as typeof C4DCardGroup;
      this.style.setProperty(
        customPropertyCardsPerRow,
        String(this.cardsPerRow)
      );
    }
  }

  /**
   * The number of columns per row. Min 2, max 4, default 3. Applies to >=`lg` breakpoint only.
   */
  @state()
  private _cardsPerRow?: number;

  /**
   * Default number of cards per row. Applies to >=`lg` breakpoint only.
   */
  @state()
  private _cardsPerRowAuto = 3;

  @state()
  private _isMediumOrGreater = this.carbonBreakpoints.md.matches;

  protected mediaQueryCallbackMD() {
    this._isMediumOrGreater = this.carbonBreakpoints.md.matches;
  }

  /**
   * Number of cards per column.
   * If `--c4d--card-group--cards-in-row` CSS custom property is set to `<c4d-card-group>`.
   */
  @property({ type: Number, attribute: 'cards-per-row' })
  get cardsPerRow() {
    const { _cardsPerRow: cardsPerRow, _cardsPerRowAuto: cardsPerRowAuto } =
      this;
    return cardsPerRow ?? cardsPerRowAuto;
  }

  set cardsPerRow(value: number) {
    this._cardsPerRow = value;
    // Don't call `.requestUpdate()` here given we track updates via `_cardsPerRow` and `_cardsPerRowAuto`
  }

  /**
   * The Grid Mode for the component layout.
   * Condensed (1px) | Narrow (16px) | Default(32px).
   */
  @property({ attribute: 'grid-mode', reflect: true })
  gridMode = GRID_MODE.DEFAULT;

  /**
   * If using cards with pictogram.
   */
  // necessary to avoid using sameHeight utility
  @property({ type: Boolean, reflect: true })
  pictograms = false;

  // Adding a class that will identify that c4d-card-group is inside c4d-content-block-cards for special treatment.
  private isInsideBlockCards() {
    const cardGroupParentEl = this.parentElement;
    console.log(cardGroupParentEl);

    if (
      cardGroupParentEl?.tagName.toLowerCase() ===
      `${c4dPrefix}-content-block-cards`
    ) {
      this.classList.add('inside-block-cards');
    }
  }

  firstUpdated() {
    super.connectedCallback();

    if (
      this.previousElementSibling?.matches?.(
        (this.constructor as typeof C4DCardGroup).selectorCardInCard
      )
    ) {
      this.setAttribute('with-card-in-card', '');
    }

    // Check if the component is living in a Full Width or Table of Contents template.
    const isFullWidthTemplate =
      document.body.getAttribute('data-fullwidthtemplate') === 'true';
    //Adds a class if true, for better css treatment in mobile for FW pages.
    this.classList.toggle('is-full-width-template', isFullWidthTemplate);

    this.isInsideBlockCards();
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('gridMode')) {
      this._childItems.forEach((e) => (e.gridMode = this.gridMode));
    }

    //Setting grid mode to condensed in mobile in favor of scroll snap behavior
    if (!this._isMediumOrGreater) {
      this.gridMode = GRID_MODE.CONDENSED;
    }
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  /**
   * The CSS custom property name for the live button group item cout.
   */
  static get customPropertyCardsPerRow() {
    return `--${c4dPrefix}--card-group--cards-in-row`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--card-group`;
  }

  /**
   * A selector that will return the card-in-card selector
   */
  static get selectorCardInCard() {
    return `${c4dPrefix}-card-in-card`;
  }

  /**
   * A selector that will return the card item.
   */
  static get selectorItem() {
    return `${c4dPrefix}-card-group-item`;
  }

  /**
   * A selector that will return the card item's eyebrow
   */
  static get selectorItemEyebrow() {
    return `${c4dPrefix}-card-eyebrow`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemTagGroup() {
    return `div`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemParagraph() {
    return `p`;
  }

  /**
   * A selector that will return the card item's heading
   */
  static get selectorItemHeading() {
    return `${c4dPrefix}-card-heading`;
  }

  /**
   * A selector that will return the card item's footer
   */
  static get selectorItemFooter() {
    return `${c4dPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardGroup;
