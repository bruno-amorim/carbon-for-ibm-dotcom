/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, text, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import readme from './README.stories.mdx';
import '../video-player-container';
import '../../lightbox-media-viewer/lightbox-video-player-container';
import { enumValsToArray } from '../../../globals/internal/enum-helpers';
import { BUTTON_POSITION } from '../defs';

export const Default = (args) => {
  const { caption, hideCaption, thumbnail, videoId } = args?.VideoPlayer ?? {};
  return html`
    <c4d-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}
      background-mode></c4d-video-player-container>

    <c4d-video-player-container
      video-id="1_onstzigu"
      auto-play></c4d-video-player-container>
  `;
};

export const aspectRatio1x1 = (args) => {
  const { aspectRatio, caption, hideCaption, thumbnail, videoId } =
    args?.VideoPlayer ?? {};
  return html`
    <c4d-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}></c4d-video-player-container>
  `;
};

export const aspectRatio4x3 = (args) => {
  const { aspectRatio, caption, hideCaption, thumbnail, videoId } =
    args?.VideoPlayer ?? {};
  return html`
    <c4d-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}></c4d-video-player-container>
  `;
};

export const withLightboxMediaViewer = (args) => {
  const {
    aspectRatio,
    caption,
    hideCaption,
    thumbnail,
    videoId,
    customVideoDescription,
  } = args?.VideoPlayer ?? {};
  return html`
    <c4d-video-player-container
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      video-description="${ifDefined(customVideoDescription)}"
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}
      playing-mode="lightbox">
    </c4d-video-player-container>
    <c4d-lightbox-video-player-container></c4d-lightbox-video-player-container>
  `;
};

export const autoplay = (args) => {
  const { aspectRatio, caption, hideCaption, thumbnail, videoId } =
    args?.VideoPlayer ?? {};
  return html`
    <c4d-video-player-container
      auto-play
      playing-mode="inline"
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}></c4d-video-player-container>
  `;
};

export const autoplayMuted = (args) => {
  const { caption, hideCaption, thumbnail, videoId } = args?.VideoPlayer ?? {};
  return html`
    <style>
      c4d-video-player-container[background-mode] {
        display: block;
        aspect-ratio: 16/9;
        outline: 2px solid red;
      }
    </style>
    <c4d-video-player-container
      auto-play
      muted
      playing-mode="inline"
      video-id=${videoId}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}></c4d-video-player-container>
  `;
};

export const intersectionMode = (args) => {
  const {
    aspectRatio,
    caption,
    hideCaption,
    thumbnail,
    videoId,
    buttonPosition,
  } = args?.VideoPlayer ?? {};
  return html` <c4d-video-player-container
    aspect-ratio="${aspectRatio}"
    playing-mode="inline"
    video-id=${videoId}
    caption=${caption}
    ?hide-caption=${hideCaption}
    thumbnail=${thumbnail}
    intersection-mode
    button-position="${buttonPosition}"></c4d-video-player-container>`;
};

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '4x3',
          caption: text('Custom caption (caption):', ''),
          hideCaption: boolean('Hide caption (hideCaption):', false),
          thumbnail: text('Custom thumbnail (thumbnail):', ''),
          videoId: '0_ibuqxqbe',
        };
      },
    },
    propsSet: {
      default: {
        VideoPlayer: {
          aspectRatio: '4x3',
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
  },
};

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '1x1',
          caption: text('Custom caption (caption):', ''),
          hideCaption: boolean('Hide caption (hideCaption):', false),
          thumbnail: text('Custom thumbnail (thumbnail):', ''),
          videoId: '0_ibuqxqbe',
        };
      },
    },
    propsSet: {
      default: {
        VideoPlayer: {
          aspectRatio: '1x1',
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
  },
};

withLightboxMediaViewer.story = {
  name: 'With lightbox media viewer',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '16x9',
          customVideoDescription: text(
            'Custom video description',
            'This is a custom video description.'
          ),
          caption: text('Custom caption (caption):', ''),
          hideCaption: boolean('Hide caption (hideCaption):', false),
          thumbnail: text('Custom thumbnail (thumbnail):', ''),
          videoId: '0_ibuqxqbe',
        };
      },
    },
    propsSet: {
      default: {
        VideoPlayer: {
          aspectRatio: '16x9',
          customVideoDescription: 'This is a custom video description',
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
  },
};

autoplay.story = {
  name: 'Autoplay',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '4x3',
          caption: text('Custom caption (caption):', ''),
          hideCaption: boolean('Hide caption (hideCaption):', false),
          thumbnail: text('Custom thumbnail (thumbnail):', ''),
          videoId: '0_ibuqxqbe',
        };
      },
    },
    propsSet: {
      default: {
        VideoPlayer: {
          aspectRatio: '4x3',
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
  },
};

autoplayMuted.story = {
  name: 'Autoplay muted',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '4x3',
          caption: text('Custom caption (caption):', ''),
          hideCaption: boolean('Hide caption (hideCaption):', false),
          thumbnail: text('Custom thumbnail (thumbnail):', ''),
          videoId: '0_ibuqxqbe',
        };
      },
    },
    propsSet: {
      default: {
        VideoPlayer: {
          aspectRatio: '4x3',
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
  },
};

intersectionMode.story = {
  name: 'Intersection mode',
  decorators: [
    (story) => html`
      <p>
        Scroll down ⬇️<br />
        To illustrate playback beginning only when the video comes into view,
        we've added intentional space to push the video below the fold.
      </p>
      <div style="margin-top: 120vh;">${story()}</div>
    `,
  ],
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '16x9',
          caption: text('Custom caption (caption):', ''),
          hideCaption: boolean('Hide caption (hideCaption):', false),
          thumbnail: text('Custom thumbnail (thumbnail):', ''),
          videoId: '0_ibuqxqbe',
          buttonPosition: select(
            'Button position (buttonPosition)',
            enumValsToArray(BUTTON_POSITION),
            BUTTON_POSITION.BOTTOM_RIGHT
          ),
        };
      },
    },
    propsSet: {
      default: {
        VideoPlayer: {
          aspectRatio: '16x9',
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
  },
};

export default {
  title: 'Components/Video player',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-lg-8">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      VideoPlayer: () => ({
        caption: text('Custom caption (caption):', ''),
        hideCaption: boolean('Hide caption (hideCaption):', false),
        thumbnail: text('Custom thumbnail (thumbnail):', ''),
        videoId: '0_ibuqxqbe',
      }),
    },
    propsSet: {
      default: {
        VideoPlayer: {
          caption: '',
          hideCaption: false,
          thumbnail: '',
          videoId: '0_ibuqxqbe',
        },
      },
    },
    percy: {
      skip: true,
    },
  },
};
