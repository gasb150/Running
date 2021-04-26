import 'phaser';
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

     this.gameButton = new Button(this, game.config.width/4 , game.config.height - 80, 'greenButton1', 'greenButton2', 'Re-play', 'Game');
     this.homeButton = new Button(this, game.config.width/1.3 , game.config.height - 80, 'greenButton1', 'greenButton2', 'Home', 'Menu');
    
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
        const pdivp1 = document.createElement('p');
        const pdivp2 = document.createElement('p')
        pdivp1.classList.add("scoreInfo", "leaders")
        pdivp2.classList.add("scoreInfo")

        if (index < 3){
          pdivp1.style.color = "red"
        }
        if (index < 2){
          pdivp1.style.color = "yellow"
        }
        if (index < 1){
          pdivp1.style.color ="green"
        }
        if (index < 3){ 
          pdivp1.innerHTML = `<p> #${index + 1}</p> <p>-${score.user}</p>  <p>${score.score}</p>`;
        } else {
          pdivp2.innerHTML = `<p> #${index + 1}</p> <p>-${score.user}</p>  <p>${score.score}</p>`;
        }
        divLeaderboard.appendChild(pdivp1);
        divNoLeaders.appendChild(pdivp2);
      });



      const score = document.getElementById("score")
      score.appendChild(divLeaderboard)
      score.appendChild(divNoLeaders)

      score.style.display="grid"
      score.style.gridTemplateColumns="2fr 2fr"
      score.style.columnGap ="50px"
      score.style.top="200px"
      score.style.left="200px"
    
      this.model = this.sys.game.globals.model;
      if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
        this.model.bgMusicPlaying = false
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
        this.bgMusic.play();
        this.sys.game.globals.bgMusic = this.bgMusic
      }

   
    }
    display()
  }
}



