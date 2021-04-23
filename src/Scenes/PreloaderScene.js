import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {

    this.add.image(400, 200, 'logo')


    let progressBar = this.add.graphics()
    let progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5)

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5);


    this.load.on('progress', (percent) => {
      percentText.setText(parseInt(percent * 100) + '%')
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * percent, 30)
    })


    this.load.on('fileprogress', (file) => {
      assetText.setText('Loading asset:' + file.key)
    })


    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();

      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);


    this.load.image('blueButton1', '/src/assets/ui/greenButton1.png');
    this.load.image('blueButton2', '/src/assets/ui/greenButton2.png');
    this.load.image('phaserLogo', '/src/assets/logo.png');
    this.load.image('noChekedM', '/src/assets/ui/disableMusic.png')
    this.load.image('checkedM', '/src/assets/ui/ableMusic.png');
    this.load.image('noChekedS', '/src/assets/ui/disableSounds.png')
    this.load.image('checkedS', '/src/assets/ui/ableSounds.png');
    this.load.audio('bgMusic', ['/src/assets/Sounds/TownTheme.mp3']);
    this.load.audio('gameMusic', ['assets/Sounds/Game.mp3']);
    this.load.audio('fire', ['/src/assets/Sounds/fire.wav'])
    this.load.audio('burning', ['/src/assets/Sounds/burning.wav'])
    this.load.audio('jump', ['/src/assets/Sounds/jump.wav']);
    this.load.audio('coin', ['/src/assets/Sounds/coin.ogg']);
    this.load.image("platform", "platform.png");
    this.load.image("water", "Spike.png");
    this.load.spritesheet('loadIcon', 'load.png', {
      frameWidth: 100,
      frameHeight: 110,
    });
    // this.load.spritesheet("water", 'water.png', {
    //   frameWidth: 112.6,
    //   frameHeight: 89.5
    // })

    this.load.spritesheet("explode", "explode.png", {
      frameWidth: 341.33,
      frameHeight: 341.33
    })

    this.load.spritesheet("player", "/src/assets/player.png", {
      frameWidth: 58.75,
      frameHeight: 57
    });

    this.load.spritesheet("playerJump", "/src/assets/player.png", {
      frameWidth: 58.75,
      frameHeight: 62.5
    });

    this.load.spritesheet("coin", "coin.png", {
      frameWidth: 20,
      frameHeight: 20
    });

    this.load.spritesheet("fire", "fire.png",
      {
        frameWidth: 40,
        frameHeight: 70
      }
    );

    this.load.spritesheet("mountain", "mountain.png", {
      frameWidth: 512,
      frameHeight: 512
    });

  }

  ready() {
    this.scene.start('SubmitScore')
    this.readyCount++;

    if (this.readyCount === 2) {
      this.scene.start('SubmitScore');
    }
  }

  create() {

  }

}