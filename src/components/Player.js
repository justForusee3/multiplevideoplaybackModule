import { Lightning, VideoPlayer, Utils } from '@lightningjs/sdk';

export default class Player extends Lightning.Component {

    static _template() {
        return {
            collision: true,
            forceZIndexContext: true,
        };
    }

    _firstActive() {
        // Set up the VideoPlayer
        VideoPlayer.consumer(this);
        VideoPlayer.size(1900, 750);
        // Commented out the local video file, as it will be handled dynamically
        // VideoPlayer.open(Utils.asset('videos/videoplayback.mp4'));
    }

    _focus() {
        // Seek to the beginning when the player gains focus
        VideoPlayer.seek(0);
    }

    playVideo(videoUrl) {
        // Load the video dynamically based on the provided URL
        VideoPlayer.open(videoUrl);
    }

    _handleEnter() {
        // Play/pause the video when Enter key is pressed
        VideoPlayer.playPause();
    }

    _handleEsc() {
        // Pause the video and return to the previous screen when Esc key is pressed
        VideoPlayer.pause();
        this.parent.enterScreen(this.parent.prevScreen);
    }
}
