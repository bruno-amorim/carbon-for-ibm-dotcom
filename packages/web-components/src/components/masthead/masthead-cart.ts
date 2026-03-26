/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ShoppingCart20 from '@carbon/web-components/es/icons/shopping--cart/20.js';
import styles from './masthead.scss';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import SAPCommerceAPI from '@carbon/ibmdotcom-services/es/services/SAPCommerce/SAPCommerce.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The Cart icon in the masthead.
 *
 * @element c4d-masthead-cart
 * @csspart cart-link - The masthead cart link. Usage: `c4d-masthead-cart::part(cart-link)`
 */
@customElement(`${c4dPrefix}-masthead-cart`)
class C4DMastheadCart extends StableSelectorMixin(LitElement) {
  /**
   * The `aria-label` attribute for the link.
   */
  @property({ attribute: 'link-label' })
  linkLabel = 'Cart';

  /**
   * Tracks whether the user has an active cart to control the display.
   */
  @state()
  hasActiveCart = false;

  /**
   * Store the locale. Defaults to en-us.
   */
  @state()
  locale = { lc: 'en', cc: 'us' };

  connectedCallback() {
    super.connectedCallback();

    // Initial check
    this.updateCart();

    // Fallback retry
    this.checkCartWithRetry();

    // Listen for cross-tab updates
    window.addEventListener('storage', this.updateCart);

    // Fetch locale
    LocaleAPI.getLocale().then((locale) => {
      this.locale = locale;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('storage', this.updateCart);
  }

  /**
   * Updates cart state
   */
  updateCart = () => {
    console.log('Checking for activeCartId...');
    const hasCart = SAPCommerceAPI.hasActiveCart();
    this.hasActiveCart = hasCart;
  };

  /**
   * Checks if the user has an active cart and retries a few times if the cart cookie is not available yet.
   */
  checkCartWithRetry(retries = 5, delay = 200) {
    const check = () => {
      const hasCart = SAPCommerceAPI.hasActiveCart();

      if (hasCart) {
        this.hasActiveCart = true;
        return;
      }

      if (retries > 0) {
        retries--;
        setTimeout(check, delay);
      }
    };

    check();
  }

  /**
   * Filter the correct checkout URL based on locale and country code.
   */
  handleURL(cc: string, lc: string) {
    switch (cc) {
      case 'uk':
        return `/store/en/gb/checkout`;
      case 'ae':
        return `/store/en/ae/checkout`;
      case 'sa':
        return `/store/en/sa/checkout`;
      default:
        return `/store/${lc}/${cc}/checkout`;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { hasActiveCart } = this;
    if (changedProperties.has('hasActiveCart')) {
      this.hidden = !hasActiveCart;
    }
  }

  render() {
    const {
      linkLabel,
      locale: { cc, lc },
    } = this;

    return html`
      <a
        part="cart-link"
        href="${this.handleURL(cc, lc)}"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        aria-label="${linkLabel}"
        >${ShoppingCart20()}</a
      >
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--masthead-cart`;
  }

  static styles = styles;
}

export default C4DMastheadCart;
