import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button'
import clear from '../module/clear'
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  

 create() {

  //
  
  this.titleText = this.add.text(0, 0, 'Robot runner', { fontSize: '32px', fill: '#fff' });
  this.pargraphText1 = this.add.text(0, 0, `An innocent robot is trying to escape from his "home."`, { fontSize: '26px', fill: '#fff' })
  this.pargraphText2 = this.add.text(0, 0, `His creator is evil engineering and will use him to conquest the world.`, { fontSize: '26px', fill: '#fff' })
  this.pargraphText3 = this.add.text(0, 0, `Our robot wants to be free.`, { fontSize: '26px', fill: '#fff' })

  
  this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height)

  Phaser.Display.Align.In.Center(
      this.titleText,
      this.zone
  );

  Phaser.Display.Align.In.Center(
      this.pargraphText1,
      this.zone
  );
  Phaser.Display.Align.In.Center(
    this.pargraphText2,
    this.zone
);
Phaser.Display.Align.In.Center(
  this.pargraphText3,
  this.zone
);

  this.pargraphText1.setY(1000)
  this.pargraphText2.setY(1060)
  this.pargraphText3.setY(1120)

  this.titleTween = this.tweens.add({
      targets: this.titleText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
          this.destroy
      }
  })

  this.paragraph1Tween = this.tweens.add({
      targets: this.pargraphText1,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
          this.paragraphTween1.destroy;
  }
})

  this.paragraph2Tween = this.tweens.add({
      targets: this.pargraphText2,
      y: -360,
      ease: 'Power1',
      duration: 9000,
      delay: 1000,
      onComplete: function() {
          this.paragraphTween2.destroy;}
      })

      // this.paragraph3Tween = this.tweens.add({
      //   targets: [this.pargraphText1, this.pargraphText2, this.pargraphText3],
      //   y: -300,
      //   ease: 'Power0',
      //   duration: 8000,
      //   // delay: 1000,
      //   onComplete: function() {
      //       this.paragraphTween3.destroy;

      this.paragraph2Tween = this.tweens.add({
      targets: this.pargraphText3,
      y: -420,
      ease: 'Power1',
      duration: 10000,
      delay: 1000,
      onComplete: function() {
          this.paragraphTween2.destroy;





  //
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
}.bind(this)
})

      
}
}