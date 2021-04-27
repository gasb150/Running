import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config'
export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(config.width/4.16, config.height/6.2, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(config.width/6.25, config.height/3.1, 'checkedBox');
    this.musicText = this.add.text(config.width/5, config.height/3.2, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(config.width/6.25, config.height/2.06, 'checkedBox');
    this.soundText = this.add.text(config.width/5, config.height/2.13, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, config.width/3.125, config.height/1.25, 'greenButton1', 'greenButton2', 'Menu', 'Menu');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('noChekedM');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedM');
      this.sys.game.globals.bgMusic.play();
      this.model.bgMusicPlaying = true;
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('noChekedS');
    } else {
      this.soundButton.setTexture('checkedS');
    }
  }
}
