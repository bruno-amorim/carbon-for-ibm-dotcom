/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../image';
import { Default } from '../__stories__/image.stories';

const template = (props?) =>
  Default({
    image: props,
  });

describe('c4d-image', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-image>`
      expect(document.body.querySelector('c4d-image')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          defaultSrc:
            'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616',
          alt: 'Image alt text',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-image>`
      expect(document.body.querySelector('c4d-image')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
