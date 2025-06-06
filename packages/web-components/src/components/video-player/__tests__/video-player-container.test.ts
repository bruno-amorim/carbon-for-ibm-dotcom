/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import convertValue from '../../../../tests/utils/convert-value';
import { C4DVideoPlayerContainerMixin } from '../video-player-container';

describe('c4d-video-player-container', function () {
  let videoPlayerContainer;
  let videoPlayer;

  beforeEach(function () {
    videoPlayer = document.body.appendChild(document.createElement('div'));
    const VideoPlayerContainer = C4DVideoPlayerContainerMixin(
      class {
        _videoPlayer = videoPlayer;

        ownerDocument = videoPlayer.ownerDocument;
      } as any
    );
    videoPlayerContainer = new VideoPlayerContainer();
  });

  describe('Making API calls', function () {
    beforeEach(function () {
      spyOn(videoPlayerContainer, '_setRequestEmbedVideoInProgress');
      spyOn(videoPlayerContainer, '_setErrorRequestEmbedVideo');
      spyOn(videoPlayerContainer, '_setEmbeddedVideo');
    });

    xit('should make an API call to embed video', async function () {
      spyOn(KalturaPlayerAPI, 'embedMedia').and.callFake(async () => ({
        async kWidget() {
          return 'kwidget-foo';
        },
      }));
      await videoPlayerContainer._embedMedia('video-id-foo');
      const setRequestEmbedVideoInProgressArgs = convertValue(
        videoPlayerContainer._setRequestEmbedVideoInProgress.calls.argsFor(0)
      );
      const setErrorRequestEmbedVideoArgs = convertValue(
        videoPlayerContainer._setErrorRequestEmbedVideo.calls.argsFor(0)
      );
      const setEmbeddedVideoArgs = convertValue(
        videoPlayerContainer._setEmbeddedVideo.calls.argsFor(0)
      );
      expect(setRequestEmbedVideoInProgressArgs).toEqual([
        'video-id-foo',
        'PROMISE',
      ]);
      expect(setErrorRequestEmbedVideoArgs).toEqual([]);
      expect(setEmbeddedVideoArgs).toEqual(['video-id-foo', 'kwidget-foo']);
    });

    xit('caches the embedded video', async () => {
      spyOn(KalturaPlayerAPI, 'embedMedia').and.callFake(async () => ({
        async kWidget() {
          return 'kwidget-foo';
        },
      }));
      videoPlayerContainer._requestsEmbedVideo = {
        'video-id-foo': Promise.resolve('kwidget-foo'),
      };
      await videoPlayerContainer._embedMedia('video-id-foo');
      const setRequestEmbedVideoInProgressArgs = convertValue(
        videoPlayerContainer._setRequestEmbedVideoInProgress.calls.argsFor(0)
      );
      const setErrorRequestEmbedVideoArgs = convertValue(
        videoPlayerContainer._setErrorRequestEmbedVideo.calls.argsFor(0)
      );
      const setEmbeddedVideoArgs = convertValue(
        videoPlayerContainer._setEmbeddedVideo.calls.argsFor(0)
      );
      expect(setRequestEmbedVideoInProgressArgs).toEqual([]);
      expect(setErrorRequestEmbedVideoArgs).toEqual([]);
      expect(setEmbeddedVideoArgs).toEqual([]);
    });

    xit('should track the error in embeddeding video', async function () {
      spyOn(KalturaPlayerAPI, 'embedMedia').and.throwError('error-embedvideo');
      let caught;
      try {
        await videoPlayerContainer._embedMedia('video-id-foo');
      } catch (error) {
        caught = error;
      }
      expect(caught?.message).toBe('error-embedvideo');
      const setRequestEmbedVideoInProgressArgs = convertValue(
        videoPlayerContainer._setRequestEmbedVideoInProgress.calls.argsFor(0)
      );
      const setErrorRequestEmbedVideoArgs = convertValue(
        videoPlayerContainer._setErrorRequestEmbedVideo.calls.argsFor(0)
      );
      const setEmbeddedVideoArgs = convertValue(
        videoPlayerContainer._setEmbeddedVideo.calls.argsFor(0)
      );
      expect(setRequestEmbedVideoInProgressArgs).toEqual([
        'video-id-foo',
        'PROMISE',
      ]);
      expect(setErrorRequestEmbedVideoArgs).toEqual([
        'video-id-foo',
        'error-embedvideo',
      ]);
      expect(setEmbeddedVideoArgs).toEqual([]);
    });

    xit('caches the error in embeddeding video', async function () {
      spyOn(KalturaPlayerAPI, 'embedMedia').and.throwError('error-embedvideo');
      videoPlayerContainer._requestsEmbedVideo = {
        'video-id-foo': Promise.reject(new Error('error-embedvideo')),
      };
      let caught;
      try {
        await videoPlayerContainer._embedMedia('video-id-foo');
      } catch (error) {
        caught = error;
      }
      expect(caught?.message).toBe('error-embedvideo');
      const setRequestEmbedVideoInProgressArgs = convertValue(
        videoPlayerContainer._setRequestEmbedVideoInProgress.calls.argsFor(0)
      );
      const setErrorRequestEmbedVideoArgs = convertValue(
        videoPlayerContainer._setErrorRequestEmbedVideo.calls.argsFor(0)
      );
      const setEmbeddedVideoArgs = convertValue(
        videoPlayerContainer._setEmbeddedVideo.calls.argsFor(0)
      );
      expect(setRequestEmbedVideoInProgressArgs).toEqual([]);
      expect(setErrorRequestEmbedVideoArgs).toEqual([]);
      expect(setEmbeddedVideoArgs).toEqual([]);
    });
  });

  describe('Handling API call results', function () {
    xit('should support setting the error in embedding video data', function () {
      videoPlayerContainer._setErrorRequestEmbedVideo(
        'video-id-foo',
        new Error('error-embedvideo')
      );
      expect(convertValue(videoPlayerContainer._requestsEmbedVideo)).toEqual({
        'video-id-foo': 'PROMISE',
      });
    });

    xit('should support setting the embedded video', function () {
      videoPlayerContainer._setEmbeddedVideo('video-id-foo', 'kwidget-foo');
      expect(convertValue(videoPlayerContainer.embeddedVideos)).toEqual({
        'video-id-foo': 'kwidget-foo',
      });
    });

    xit('should support starting the spinner for embedding video data', function () {
      videoPlayerContainer._setRequestEmbedVideoInProgress(
        'video-id-foo',
        Promise.resolve('kwidget-foo')
      );
      expect(convertValue(videoPlayerContainer._requestsEmbedVideo)).toEqual({
        'video-id-foo': 'PROMISE',
      });
    });
  });

  afterEach(function () {
    if (videoPlayer) {
      videoPlayer.remove();
    }
  });
});
