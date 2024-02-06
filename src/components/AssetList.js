import { Lightning, Utils } from '@lightningjs/sdk';
import AssetListItem from './AssetListItem';

export default class AssetList extends Lightning.Component {
    static _template() {
        return {
            w: 1200,
            flex: { direction: 'row', padding: 20, wrap: true },
            rect: true,
            color: 0xFF2D2D2D,
            paddingLeft: 200,
        };
    }

    _init() {
        this.index = 0;
        // Fetch data based on the current screen
        if (this.screen == 'TvScreenWrapper') {
            this.url = 'data/tv.json';
        }

        // Fetch and load data
        fetch(Utils.asset(this.url))
            .then(response => response.json())
            .then(data => this.setItems(data.results))
            .catch(() => {
                // Handle exceptions
                console.error('Error fetching data');
            });
    }

    setItems = (items) => {
        this.children = items.map((item, index) => {
            return {
                flexItem: { margin: 10 },
                ref: 'AssetItem-' + index,
                type: AssetListItem,
                collision: true,
                forceZIndexContext: true,
                item: {
                    poster_path: item.poster_path,
                    title: item.title,
                    duration: item.duration,
                    video_url: item.video_url || '', // provide a default value
                },
                index,
            };
        });
    };

    emitPlayVideo(videoItem) {
        // Check if AAMPMediaPlayer is available
        if (AAMPMediaPlayer) {
            // Initialize and play video using AAMPMediaPlayer
            const player = new AAMPMediaPlayer();
            player.load(videoItem.video_url);
            // Add your logic to handle playback controls, UI updates, etc.
        } else {
            console.error("AAMPMediaPlayer is not available");
        }
    }

    _getFocused() {
        return this.children[this.index];
    }

    _handleLeft() {
        if (this.index > 0) {
            this.index--;
        }
    }

    _handleRight() {
        if (this.index < this.children.length - 1) {
            this.index++;
        }
    }

    _handleUp() {
        if ((this.index - 4) > 0) {
            this.index = this.index - 5;
        }
    }

    _handleDown() {
        if ((this.index + 5) < this.children.length) {
            this.index = this.index + 5;
        }
    }

    _handleEsc() {
        // Send a signal to the parent component to exit the current screen
        this.signal('exitScreen', this.screen);
    }

    // _handleEnter() {
    //     const videoItem = this.children[this.index].item;
    //     this.emitPlayVideo(videoItem);
    // }

    _handleEnter() {
        const focusedItem = this.children[this.index];
        const videoItem = focusedItem && focusedItem.item;
    
        if (videoItem && videoItem.video_url) {
            // Log the video_url to the console
            console.log("Video URL:", videoItem.video_url);
    
            // Call the common method to handle video playback using AAMPMediaPlayer
            this.emitPlayVideo(videoItem);
        } else {
            console.error("Invalid video item or video URL");
        }
    }
}
