import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button'
import clear from '../module/clear'
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

 create() {
  console.log('llala')
  const textInitial = this.add.text(280, 100, "Enter your name", {
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


  element.addEventListener('click', (event)=> {
 
    if (event.target.name === 'submit') {

      let user = document.getElementById('user');
      console.log(user.value)
      if (user.value !== '') {
      
        element.innerHTML = ''

        localStorage.setItem("playerName", user.value)
  
     
     
        this.scene.start('Menu')
      }
    }

  })

  element.addEventListener('keypress', (event)=> {
 
    if (event.key === 'Enter') {

      let user = document.getElementById('user');
      console.log(user.value)
      if (user.value !== '') {
      
        element.innerHTML = ''

        localStorage.setItem("playerName", user.value)
  
     
     
        this.scene.start('Menu')
      }
    }

  })

}
}




