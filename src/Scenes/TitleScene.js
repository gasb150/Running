import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import clear from '../module/clear';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.add.text(280, 100, 'Enter your player name', {
      color: '#5d1512', fontFamily: 'Arial', fontSize: '60px ', fontWeight: '900',
    });
    const element = document.getElementById('container');
    element.innerHTML = '';

    element.innerHTML = `<form class="flex-column" id="form">
  <input
    type="text"
    placeholder="player name"
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
</form>`;

    element.addEventListener('click', (event) => {
      if (event.target.name === 'submit') {
        const user = document.getElementById('user');

        if (user.value !== '') {
          element.innerHTML = '';

          localStorage.setItem('playerName', user.value);


          this.scene.start('Menu');
        }
      }
    });

    element.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const user = document.getElementById('user');

        if (user.value !== '') {
          element.innerHTML = '';

          localStorage.setItem('playerName', user.value);


          this.scene.start('Menu');
        }
      }
    });
  }
}
