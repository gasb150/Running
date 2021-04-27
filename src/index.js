import '../style.css';
import '../reset.css';

import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene'; //
import BootScene from './Scenes/BootScene'; //
import PreloaderScene from './Scenes/PreloaderScene'; //
import TitleScene from './Scenes/TitleScene'; //
import OptionsScene from './Scenes/OptionsScene'; //
import CreditsScene from './Scenes/CreditsScene'; //
import Model from './Model'; //
import SubmitScore from './Scenes/SubmitScore'; //
import MenuScene from './Scenes/MenuScene'; //
import OverScene from './Scenes/OverScene'; //
import IntroScene from './Scenes/IntroScene';
import Instructions from './Scenes/InstructionScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Over', OverScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Instructions', Instructions);
    this.scene.add('SubmitScore', SubmitScore);

    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();