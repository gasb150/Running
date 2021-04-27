import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import clear from '../module/clear';



export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }


  create() {
 

    this.text = this.add.text(300, 100, 'Instruction', { fontSize: 40 });

    this.text = this.add.text(100, 200, 'Jump', { fontSize: 30 })

    this.text = this.add.text(50, 250, 'To jump you can use ENTER keyboard or click, if try again and you will jump twice', { fontSize: 20 })


    this.text = this.add.text(100, 310, 'Collect coins', { fontSize: 30 })

    this.text= this.add.text(50, 360, 'Collect many coins as posible', { fontSize: 20 })


    this.text = this.add.text(100, 420, 'Evade other robots and spikes', { fontSize: 30 })

    this.text = this.add.text(50, 470, 'Collect many coins as posible', { fontSize: 20 })

    this.text = this.add.text(100, 530, 'Score', { fontSize: 30 })

    this.text= this.add.text(50, 580, 'The score will increese wile you keep runnin, collect coins, or evade obstacles', { fontSize: 20 })
  
  }
}