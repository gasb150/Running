import Phaser from 'phaser';
import clear from '../module/clear';


import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    clear('score');
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(config.width / 2, 20, 'ROBOT RUNNER', { fontSize: '48px', fill: '#6fae23', fontFamily: 'bold' });

    //  Game Button
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'greenButton1', 'greenButton2', 'Play', 'Game');

    //      // //Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'greenButton1', 'greenButton2', 'Options', 'Options');

    // Instructions
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'greenButton1', 'greenButton2', 'Instructions', 'Instructions');

    //   //   // //Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 200, 'greenButton1', 'greenButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.model.bgMusicPlaying = false;
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
