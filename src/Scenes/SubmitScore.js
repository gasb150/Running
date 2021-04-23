import Button from '../Objects/Button'
import Phaser from 'phaser';
import leaderboard from '../module/apiScore';


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
   
    let player = localStorage.getItem("playerName")
    console.log(player)
    const submit = async () => {

      const response = await  leaderboard.addScore(player, this.score)
      console.log(response.status)
      
        console.log(response.status)
        this.scene.start('Over')
     
    
    
    }

    submit()
  
        }
  


}

