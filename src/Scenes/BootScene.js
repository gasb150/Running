import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', '/src/assets/images/logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}