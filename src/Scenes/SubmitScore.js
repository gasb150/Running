import Phaser from 'phaser';
import leaderboard from '../module/leaderboard';


export default class SubmitScore extends Phaser.Scene {
  init(data) {
    this.score = data;
  }

  constructor() {
    super('SubmitScore');
  }

  create() {


    //   let bmd = this.add.bitmapData(400, 50);
    //   let myInput = this.game.add.sprite(15, 15, bmd);

    //   myInput.canvasInput = new CanvasInput({
    //     canvas: bmd.canvas,
    //   });
    //   myInput.inputEnabled = true;
    //   myInput.input.useHandCursor = true;

    //   console.log(typeof this.score)

    //   //  Using the Scene Data Plugin we can store data on a Scene level

    //   var text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });

    //   // let player = prompt ("please enter player")






    this.add.text(280, 100, "Enter your name", {
      color: '#5d1512', fontFamily: 'Arial', fontSize: '60px ', fontWeight: '900',
    });
    const element = document.getElementById('form');
    element.style.display = 'flex';
    element.addEventListener('click', (event) => {
      if (event.target.name === 'submit') {
        const user = document.getElementById('user');
        if (user.value !== '') {
          element.style.display = 'none';
          var text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });
          element.style.display = 'none';
          localStorage.setItem("playerName", user.value)
          console.log(localStorage.getItem("playerName"))
          text.setText([
            'Score: ' + this.score,
            'Player: ' + localStorage.getItem("playerName")
          ]);
          // this.scene.start('Over');
        }
      }
    });

  }


}

