/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Defines the component path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-link-with-icon--default';

const _videoId = '0_ibuqxqbe';

const _videoPath = `/iframe.html?&id=components-link-with-icon--default&knob-CTA%20type%20(cta-type)=video&knob-Icon%20Position%20(icon-placement):=right&knob-Video%20ID%20(href)=${_videoId}`;

/**
 * Defines the component selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="c4d--link-with-icon"]';

const _lightboxVideoPlayerSelector = 'c4d-lightbox-video-player';

/**
 * Collection of test scenarios.
 *
 * @type {Array<function>}
 * @private
 */
const _tests = [
  () => {
    it('should check a11y', () => {
      cy.visit(_path);
      cy.injectAxe();
      cy.checkAxeA11y();
    });
  },
  () => {
    it('should render customizable link text', () => {
      let defaultCopy, customCopyOutput;
      const customCopyInput = 'Consectetur adipiscing elit.';

      cy.visit(_path)
        .get(_selector)
        .then(([copy]) => {
          defaultCopy = copy.innerText.trim();
        })
        .visit(
          `${_path}&knob-Link%20text%20(unnamed%20slot)=${customCopyInput}`
        )
        .get(_selector)
        .should(([copy]) => {
          customCopyOutput = copy.innerText.trim();

          expect(customCopyOutput).to.be.eq(customCopyInput);
          expect(customCopyOutput).to.not.eq(defaultCopy);
        });
    });
  },
  () => {
    it('should have a customizable and clickable link', () => {
      let defaultHref, customHrefOutput;
      const customHrefInput = 'https://www.example.com/foo';

      cy.visit(_path)
        .get(_selector)
        .shadow()
        .find('a')
        .should(($link) => {
          defaultHref = $link.prop('href');

          expect($link.prop('href')).not.to.be.empty;
        })
        .visit(
          `${_path}&knob-Content%20link%20href%20(href)=${customHrefInput}`
        )
        .get(_selector)
        .shadow()
        .find('a')
        .should(($link) => {
          customHrefOutput = $link.prop('href');

          expect(customHrefOutput).to.be.eq(customHrefInput);
          expect(customHrefOutput).to.not.eq(defaultHref);
        });
    });
  },
  () => {
    it('should not be clickable when disabled', () => {
      cy.visit(`${_path}&knob-Disabled%20(disabled)=true`)
        .get(_selector)
        .shadow()
        .find('a')
        .should('have.length', 0);
    });
  },
  () => {
    it.skip('should check icon placements', () => {
      ['left', 'right'].forEach((placement) => {
        let $svg;
        cy.visit(
          `${_path}&knob-Icon%20Position%20(icon-placement):=${placement}`
        )
          .get(_selector)
          .then(($elem) => {
            $svg = $elem.find('svg');
          })
          .shadow()
          .find('a')
          .should(($link) => {
            const svgPosition = $svg[0].getBoundingClientRect();
            const textPosition = $link.find('span')[0].getBoundingClientRect();

            if (placement === 'left') {
              expect(svgPosition.left).to.be.lt(textPosition.left);
            } else {
              expect(svgPosition.left).to.be.gt(textPosition.left);
            }
          });
      });
    });
  },
  () => {
    it('should render correctly in all themes', () => {
      cy.visit(_path).carbonThemesScreenshot({
        capture: 'viewport',
      });
    });
  },
  () => {
    it.skip('should replace the button title with the video title for a video cta type', () => {
      cy.visit(_videoPath);
      cy.get(_selector)
        .shadow()
        .find('a > span')
        .should('contain.text', 'Mombo');
      cy.get(_lightboxVideoPlayerSelector).should('not.exist');
    });

    it('should trigger the lightbox for video when using the right URL fragment', () => {
      cy.visit(`${_videoPath}#cta-video-${_videoId}`);
      cy.get(_lightboxVideoPlayerSelector).should('exist').and('be.visible');
    });
  },
];

describe('c4d-link-with-icon | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  _tests.forEach((test) => test());
});

describe('c4d-link-with-icon | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(375, 720);
  });

  _tests.forEach((test) => test());
});
