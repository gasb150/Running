import Phaser from 'phaser';
import api from '../module/apiScore';
import Button from '../Objects/Button'

export default class OverScene extends Phaser.Scene {
  constructor() {
    super('Over');
  }

  create() {
    console.log(game.config.width)
     this.add.text(game.config.width/2.7, 50, 'Game Over', { fontSize: '48px', fill: 'black', fontFamily: 'bold' });
     this.musicButton = this.add.image(game.config.width/3, 150, 'scoreIcon')

     this.gameButton = new Button(this, game.config.width/4 , game.config.height - 80, 'blueButton1', 'blueButton2', 'Re-play', 'Game');
     this.gameButton = new Button(this, game.config.width/1.3 , game.config.height - 80, 'blueButton1', 'blueButton2', 'Home', 'Title');

    async function result() {
      const response = await api.getInfo()
    
      console.log(response)
      
      return response;
    }

    

      async function display (){
        const response = await result()
      
        response.result.sort((a, b) =>b.score - a.score);
        const arrayTop = response.result.slice(0,10);
        const divLeaderboard = document.createElement('div');
        const divNoLeaders = document.createElement('div')
        arrayTop.forEach((score, index) => {
        const p1 = document.createElement('p');
        const p2 = document.createElement('p')
        p1.classList.add("scoreInfo", "leaders")
        p2.classList.add("scoreInfo")

        if (index < 3){
          p1.style.color = "red"
        }
        if (index < 2){
          p1.style.color = "yellow"
        }
        if (index < 1){
          p1.style.color ="green"
        }
        if (index < 3){ 
        p1.innerText = `#${index + 1} - ${score.user}  ................. ${score.score}`;
        } else {
          p2.innerText = `#${index + 1} - ${score.user}  ................. ${score.score}`;
        }
        divLeaderboard.appendChild(p1);
        divNoLeaders.appendChild(p2);
      });



      const score = document.getElementById("score")
      score.appendChild(divLeaderboard)
      score.appendChild(divNoLeaders)

      score.style.display="grid"
      score.style.gridTemplateColumns="2fr 2fr"
      score.style.columnGap ="50px"
      score.style.top="200px"
      score.style.left="200px"
    
    

        
        console.log(response)
    }
    display()
  }
}



