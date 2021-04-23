import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button'
import clear from '../module/clear'
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {

    const n = this.add.text(280, 100, "Enter your name", {
      color: '#5d1512', fontFamily: 'Arial', fontSize: '60px ', fontWeight: '900',
    });
    const element = document.getElementById('container');
    element.innerHTML = ''

    element.innerHTML = `<form class="flex-column" id="form">
      <input
        type="text"
        placeholder="Wrte Your Name"
        name="user"
        id="user"
        class=""
      />
      <input
        type="button"
        name="submit"
        id="submit"
        value="Submit"
        class="btn btn-warning text-white"
      />
    </form>`

    element.addEventListener('click', (event) => {
      if (event.target.name === 'submit') {

        let user = document.getElementById('user');
        console.log(user.value)
        if (user.value !== '') {
          n.setText('')
          element.innerHTML = ''

          localStorage.setItem("playerName", user.value)

           this.text = this.add.text(config.width / 2, 20, 'ROBOT RUNNER', { fontSize: '48px', fill: 'black', fontFamily: 'bold' })
           //Game Button
           this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

          // //Options
          this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');


          // //Credits 
          this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');


           this.model = this.sys.game.globals.model;
           if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.model.bgMusicPlaying = false
             this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
             this.bgMusic.play();
             this.sys.game.globals.bgMusic = this.bgMusic
           }
        }
      }
    }
    )
  }
}
