import { Lightning, Utils } from '@lightningjs/sdk'
import HomeButton from './components/HomeButton';
import AssetList from './components/AssetList';
import Player from './components/Player';

export default class App extends Lightning.Component {

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.jpg'), 
        visible: true,
      },
      BtnWrapper: {
        x: 50, y: 50, visible: true,
        flex: { direction: 'column', padding: 20, wrap: true }, rect: true, color: 0xFF2D2D2D, paddingLeft: 200,
        
        TvButton: {
          type: HomeButton, buttonText: 'TV', iconSrc: 'images/tv.png', screen: 'TvScreenWrapper',
          signals: {
            enterScreen: true,
          }
        },
      },
      
      TvScreenWrapper: {
        x: 50, y: 50, visible: false, type: AssetList, screen: 'TvScreenWrapper',
        signals: {
          exitScreen: true, playVideo: true,
        },
        collision: true,
        forceZIndexContext: true,
      },

      VideoPlayer: {
        x: 50, y: 50, w: 1200, visible: false, type: Player,
        collision: true,
        forceZIndexContext: true,
        Label: {
          y: 700, x: 250, color: 0xffff0000, 
          text: { 
            text: 'Press the Return/Enter key to play/pause video \nPress the Esc key to exit video player', 
            fontSize: 20,
            maxLines: 3
          }
        }
      }
    }
  }


  _init() {
    this.buttonIndex = 0;
    this.prevScreen = '';
    this._setState('BtnWrapper');
  }

  playVideo(screenName){
    this.prevScreen = screenName;
    this.tag(screenName).visible = false;
    this.tag('Background').visible = false;
    this.tag('BtnWrapper').visible = false;
    this.tag('VideoPlayer').visible = true;
    this._setState('VideoPlayer');
  }

  enterScreen(screenName){
    this.tag('BtnWrapper').visible = false;
    this.tag('VideoPlayer').visible = false;
    this.tag('Background').visible = true;
    this.tag(screenName).visible = true;
    this._setState(screenName);
  }

  exitScreen(screenName){
    this.tag(screenName).visible = false;
    this.tag('Background').visible = true;
    this.tag('BtnWrapper').visible = true;
    this._setState('BtnWrapper');
  }

  static _states() {
    return [
      class BtnWrapper extends this {
        _handleLeft() {
          if (this.buttonIndex != 0) {
            this.buttonIndex--
          }
        }
        _handleRight() {
          if (this.buttonIndex != 2) {
            this.buttonIndex++
          }
        }

        _getFocused() {
          return this.tag('BtnWrapper').children[this.buttonIndex]
        }
      },

      class TvScreenWrapper extends this {
        _getFocused() {
            return this.tag('TvScreenWrapper')
        }
      },

      class VideoPlayer extends this {
        _getFocused() {
            return this.tag('VideoPlayer')
        }
      }
    ]
  }
}








