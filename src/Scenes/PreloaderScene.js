import Phaser from 'phaser';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'logo');



    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);


    this.load.on('progress', (percent) => {
      percentText.setText(`${parseInt(percent * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * percent, 30);
    });


    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset:${file.key}`);
    });


    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();

      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);


    this.load.image('greenButton1', '/src/assets/ui/greenButton1.png');
    this.load.image('greenButton2', '/src/assets/ui/greenButton2.png');
    this.load.image('scoreIcon', '/src/assets/ui/score.png');
    this.load.image('logo', '/src/assets/logo.png');
    this.load.image('noChekedM', '/src/assets/ui/disableMusic.png');
    this.load.image('checkedM', '/src/assets/ui/ableMusic.png');
    this.load.image('noChekedS', '/src/assets/ui/disableSounds.png');
    this.load.image('checkedS', '/src/assets/ui/ableSounds.png');
    this.load.audio('bgMusic', ['/src/assets/Sounds/TownTheme.mp3']);
    this.load.audio('powerOff', ['/src/assets/Sounds/MachinePowerOff.ogg']);
    this.load.audio('robot', ['/src/assets/Sounds/robot.mp3']);
    this.load.audio('burning', ['/src/assets/Sounds/burning.wav']);
    this.load.audio('jump', ['/src/assets/Sounds/jump.wav']);
    this.load.audio('coin', ['/src/assets/Sounds/coin.ogg']);
    this.load.image('platform', '/src/assets/images/platform.png');
    this.load.image('spike', '/src/assets/images/Spike.png');


    this.load.spritesheet('explode', '/src/assets/images/explode.png', {
      frameWidth: 341.33,
      frameHeight: 341.33,
    });

    this.load.spritesheet('player', '/src/assets/images/player.png', {
      frameWidth: 58.75,
      frameHeight: 57,
    });

    this.load.spritesheet('playerJump', '/src/assets/images/player.png', {
      frameWidth: 58.75,
      frameHeight: 62.5,
    });

    this.load.spritesheet('coin', '/src/assets/images/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });

    this.load.spritesheet('robot', '/src/assets/images/robotEnemy.png',
      {
        frameWidth: 64,
        frameHeight: 64,
      });

    this.load.spritesheet('city', '/src/assets/images/nightCity.png', {
      frameWidth: 640,
      frameHeight: 320,
    });
  }

  ready() {
    this.scene.start('Instructions');
    this.readyCount += 1;

    if (this.readyCount === 2) {
      this.scene.start('Instructions');
    }
  }
}