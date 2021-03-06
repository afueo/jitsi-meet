/* @flow */

import Sound from 'react-native-sound';

import AbstractAudio from '../AbstractAudio';

const logger = require('jitsi-meet-logger').getLogger(__filename);

/**
 * The React Native/mobile {@link Component} which is similar to Web's
 * {@code HTMLAudioElement} and wraps around react-native-webrtc's
 * {@link RTCView}.
 */
export default class Audio extends AbstractAudio {

    /**
     * Reference to 'react-native-sound} {@link Sound} instance.
     */
    _sound: Sound

    /**
     * A callback passed to the 'react-native-sound''s {@link Sound} instance,
     * called when loading sound is finished.
     *
     * @param {Object} error - The error object passed by
     * the 'react-native-sound' library.
     * @returns {void}
     * @private
     */
    _soundLoadedCallback(error) {
        if (error) {
            logger.error('Failed to load sound', error);
        } else {
            this.setAudioElementImpl(this._sound);
        }
    }

    /**
     * Will load the sound, after the component did mount.
     *
     * @returns {void}
     */
    componentDidMount() {
        this._sound
            = this.props.src
                ? new Sound(
                    this.props.src, null,
                    this._soundLoadedCallback.bind(this))
                : null;
    }

    /**
     * Will dispose sound resources (if any) when component is about to unmount.
     *
     * @returns {void}
     */
    componentWillUnmount() {
        if (this._sound) {
            this.setAudioElementImpl(null);
            this._sound.release();
            this._sound = null;
        }
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {null}
     */
    render() {
        // TODO react-native-webrtc's RTCView doesn't do anything with the audio
        // MediaStream specified to it so it's easier at the time of this
        // writing to not render anything.
        return null;
    }
}
