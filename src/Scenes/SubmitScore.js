import Button from '../Objects/Button'
import Phaser from 'phaser';
import leaderboard from '../module/leaderboard';


export default class SubmitScore extends Phaser.Scene {
  init(data) {
    this.score = data;
  }

  constructor() {
    super('SubmitScore');
  }

  preload(){

  }

  create() {

    console.log(8)
   
    console.log(10)
    
   
    let player = localStorage.getItem("playerName")
    console.log(player)
          leaderboard.addScore(player, this.score)
          this.scene.start('Over');
          this.okButton = new Button(this, 400, 500, 'checkedM', 'noChekedM', '', 'Over')
          console.log(6)
  
        }
  


}

