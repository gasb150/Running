
let gameOptions = {

  // platform speed range, in pixels per second
  platformSpeedRange: [100, 150],

  // mountain speed, in pixels per second
  mountainSpeed: 80,

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [90, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 900,

  // player jump force
  jumpForce: 400,

  // player starting X position
  playerStartPosition: 400,

  // consecutive jumps allowed
  jumps: 2,

  // % of probability a coin appears on the platform
  coinPercent: 25,

  // % of probability a fire appears on the platform
  firePercent: 25
}



export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }


  create() {
    const { anims, physics, add } = this;


    this.score = 0;

    this.mountainGroup = this.add.group();

    // Creating animations
    anims.create({
      key: 'run',
      frames: anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    // setting coin animation
    anims.create({
      key: "rotate",
      frames: anims.generateFrameNumbers("coin", {
        start: 0,
        end: 5
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
    });

    anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 20,
    });

    anims.create({
      key: "burn",
      frames: anims.generateFrameNumbers("fire", {
          start: 0,
          end: 4
      }),
      frameRate: 15,
      repeat: -1
  });



    // /Platform Group and Pool//

    this.platformGroup = add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });


    // COIN GROUP AND POOL //

    // group with all active coins.
    this.coinGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback: (coin) => {
        coin.scene.coinPool.add(coin)
      }
    });


    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: (coin) => {
        coin.scene.coinGroup.add(coin)
      }
    });


    // group with all active firecamps.
    this.fireGroup = this.add.group({

      // once a firecamp is removed, it's added to the pool
      removeCallback: (fire) => {
        fire.scene.firePool.add(fire)
      }
    });

    // fire pool
    this.firePool = this.add.group({

      // once a fire is removed from the pool, it's added to the active fire group
      removeCallback: (fire) => {
        fire.scene.fireGroup.add(fire)
      }
    });


    // adding a mountain
    this.addMountains()

    // keeping track of added platforms
    this.addedPlatforms = 0;


    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);


    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    // the player is not dying
    this.dying = false;


    // setting collisions between the player and the platform group
    physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    });

    physics.add.overlap(this.player, this.coinGroup, this.collectStar, null, this);


    physics.add.overlap(this.player, this.fireGroup, this.touchFire, null, this);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);



  }
  addMountains() {
    let rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < game.config.width * 2) {
      let mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), game.config.height + Phaser.Math.Between(0, 100), "mountain");
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1)
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3))
      this.addMountains()
    }
  }
  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    })
    return rightmostMountain;
  }
  collectStar(player, coin) {
    this.tweens.add({
      targets: coin,
      y: coin.y - 100,
      alpha: 0,
      duration: 800,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onComplete: () => {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    });


  }

  touchFire(player, fire) {
    this.dying = true;
    this.player.anims.stop();
    this.player.setFrame(2);
    this.player.body.setVelocityY(-200);
    this.physics.world.removeCollider(this.platformCollider);
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      let newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    }
    else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);


    if (this.addedPlatforms > 1) {

      // is there a coin over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          let coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        }
        else {
          let coin = this.physics.add.sprite(posX, posY - 96, "coin");
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play("rotate");
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }
      if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          let fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        }
        else {
          let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true)
           fire.anims.play("burn");
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps
  // left and the first jump was on the ground
  jump() {
    if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;

      // stops animation
      this.player.anims.stop();
    }
  }



  update() {
    // game over
    // if (this.player.y > 600) {
    //   this.scene.start('Submit', this.score);
    // }
    if (this.player.y > game.config.height) {
      this.scene.start("Game");
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < - platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);


    // recycling coins
    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < - coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    this.fireGroup.getChildren().forEach((fire) => {
      if (fire.x < - fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    // recycling mountains
    this.mountainGroup.getChildren().forEach((mountain) => {
      if (mountain.x < - mountain.displayWidth) {
        let rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = game.config.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3))
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
      let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
      let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }



  }
}
const resize = () => {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
