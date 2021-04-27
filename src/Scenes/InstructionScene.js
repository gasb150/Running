import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }


  create() {
    this.homeButton = new Button(this, config.width / 1.3, config.height / 5, 'greenButton1', 'greenButton2', 'Home', 'Menu');

    this.text = this.add.text(config.width / 4, config.height / 6, 'Instruction', { fontSize: 40 });

    this.text = this.add.text(config.width / 10, config.height / 3, 'Jump', { fontSize: 30 });

    this.text = this.add.text(config.width / 20, config.height / 2.5, 'To jump you can use ENTER keyboard or click, if try again and you will jump twice', { fontSize: 20 });


    this.text = this.add.text(config.width / 10, config.height / 2, 'Collect coins', { fontSize: 30 });

    this.text = this.add.text(config.width / 20, config.height / 1.75, 'Collect many coins as posible', { fontSize: 20 });


    this.text = this.add.text(config.width / 10, config.height / 1.5, 'Evade other robots and spikes', { fontSize: 30 });

    this.text = this.add.text(config.width / 20, config.height / 1.3, 'Collect many coins as posible', { fontSize: 20 });

    this.text = this.add.text(config.width / 10, config.height / 1.17, 'Score', { fontSize: 30 });

    this.text = this.add.text(config.width / 20, config.height / 1.08, 'The score will increese wile you keep runnin, collect coins, or evade obstacles', { fontSize: 20 });
  }
}