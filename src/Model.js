export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false
  }

  set musicOn(e) {
    this._musicOn = e
  }

  get musicOn() {
    return this._musicOn
  }

  set soundOn(e) {
    this._soundOn = e
  }

  get soundOn() {
    return this._soundOn
  }

  set bgMusicPlaying(e) {
    this._bgMusicPlaying = e
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying
  }
}

