/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, query, state } from 'lit/decorators.js';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import CDSComboBoxItem from '@carbon/web-components/es/components/combo-box/combo-box-item.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LANGUAGE_SELECTOR_STYLE_SCHEME } from './defs';
import C4DComboBox from './combo-box';
import styles from './footer.scss';
import { findIndex, forEach } from '../../globals/internal/collection-helpers';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Language selector component - desktop.
 * The API for language selection is still subject to change.
 *
 * @element c4d-language-selector-desktop
 */
@customElement(`${c4dPrefix}-language-selector-desktop`)
class C4DLanguageSelectorDesktop extends HostListenerMixin(C4DComboBox) {
  /**
   * Property that saves the last valid language to use on reset cases.
   */
  @state()
  private _lastValidLang?: string;

  /**
   * The `<input>` for filtering.
   */
  @query('input')
  protected _filterInputNode!: HTMLInputElement;

  /**
   * Reverts input value to last chosen valid language.
   *
   * @param event the event
   */
  @HostListener('document:click')
  protected _handleClickOutside = (event: MouseEvent) => {
    if (!this.contains(event.target as Node)) {
      this._filterInputValue = this._lastValidLang as string;
      this._filterInputNode.value = this._lastValidLang as string;
      this.open = false;
      this.requestUpdate(); // If the only change is to `_filterInputValue`, auto-update doesn't happen
    }
  };

  /**
   * Handles `input` event on the `<input>` for filtering.
   * Highlights and scrolls into the view the matched item.
   */
  protected _handleInput() {
    const items = this.querySelectorAll(
      (this.constructor as typeof C4DComboBox).selectorItem
    );
    const index = !this._filterInputNode.value
      ? -1
      : findIndex(items, this._testItemWithQueryText, this);
    forEach(items, (item, i) => {
      if (i === index) {
        item.scrollIntoView();
      }
      (item as CDSComboBoxItem).highlighted = i === index;
    });
    const { _filterInputNode: filterInput } = this;
    this._filterInputValue = !filterInput ? '' : filterInput.value;
    this.open = true;
    this.requestUpdate(); // If the only change is to `_filterInputValue`, auto-update doesn't happen
  }

  /**
   * Handles user-initiated clearing the `<input>` for filtering.
   * Also saves the current valid language.
   */
  protected _handleUserInitiatedClearInput() {
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof C4DComboBox).selectorItem
      ),
      (item) => {
        (item as CDSComboBoxItem).highlighted = false;
        (item as CDSComboBoxItem).selected = false;
      }
    );
    this._lastValidLang = this._filterInputValue;
    this._filterInputValue = '';
    this._filterInputNode.focus();
    this.open = false;
    this.requestUpdate();
  }

  /**
   * Updates the input and last valid language to the selected item text.
   *
   * @param item that was selected
   */
  protected _handleUserInitiatedSelectItem(item?: CDSComboBoxItem) {
    if (item && !this._selectionShouldChange(item)) {
      // Escape hatch for `shouldUpdate()` logic that updates `._filterInputValue()` when selection changes,
      // given we want to update the `<input>` and close the dropdown even if selection doesn't update.
      // Use case:
      // 1. Select the 2nd item in combo box drop down
      // 2. Type some text in the `<input>`
      // 3. Re-select the 2nd item in combo box drop down,
      //    the `<input>` has to updated with the 2nd item and the dropdown should be closed,
      //    even if there is no change in the selected value
      this._filterInputValue = item.textContent || '';
      this.open = false;
      this.requestUpdate();
    }
    this._lastValidLang = item?.textContent as string;
    (item as CDSComboBoxItem).selected = true;
    super._handleUserInitiatedSelectItem(item);
  }

  /**
   * Size property to apply different styles.
   */
  @property({ attribute: 'style-scheme' })
  styleScheme = LANGUAGE_SELECTOR_STYLE_SCHEME.REGULAR;

  /**
   * The shadow slot this language-selector should be in.
   */
  @property({ reflect: true })
  slot = 'language-selector';

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this._lastValidLang = this.value;
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DLanguageSelectorDesktop;
