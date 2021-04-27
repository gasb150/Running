import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }


  create() {
    this.creditsText = this.add.text(100, 200, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(100, 300, 'Created by: Gustavo Sanmartin', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.homeButton = new Button(this, config.width / 1.3, config.height - 80, 'greenButton1', 'greenButton2', 'Home', 'Menu');
  }
}