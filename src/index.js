// import completeGame from './module/game'

// completeGame()

import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model'
import SubmitScore from './Scenes/SubmitScore';
import MenuScene from './Scenes/MenuScene'
import OverScene from './Scenes/OverScene'


class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null }
    this.scene.add('Boot', BootScene);
    this.scene.add('Over', OverScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('MenuScene', MenuScene)
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    
    this.scene.add('SubmitScore', SubmitScore);

    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();