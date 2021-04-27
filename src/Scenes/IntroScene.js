import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import clear from '../module/clear';



export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }


  create() {
    //

    this.titleText = this.add.text(config.width / 2 - 200, 100, 'Robot runner', { fontSize: '32px', fill: '#fff' });
    this.pargraphText1 = this.add.text(config.width / 2 - 500, 250, 'An innocent robot is trying to escape from his "home."', { fontSize: '26px', fill: '#fff' });
    this.pargraphText2 = this.add.text(config.width / 2 - 500, 280, 'His creator is evil engineering and will use him to conquest the world.', { fontSize: '26px', fill: '#fff' });
    this.pargraphText3 = this.add.text(config.width / 2 - 500, 310, 'Our robot wants to be free.', { fontSize: '26px', fill: '#fff' });
    this.homeButton = new Button(this, config.width / 1.3, config.height - 80, 'greenButton1', 'greenButton2', 'Next ->', 'Title');
  }
}