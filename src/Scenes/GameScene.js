
import Phaser from 'phaser';
import clear from '../module/clear';
import config from '../Config/config';

const gameOptions = {

  // platform speed range, in pixels per second
  platformSpeedRange: [300, 300],

  // city speed, in pixels per second
  citySpeed: 80,

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

  // % of probability a robot appears on the platform
  robotPercent: 25,

  //
  waterPercent: 0,
};
// window.onload = () => {
//   resize();
//   window.addEventListener("resize", resize, false);
// }
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }


  create() {
    const { anims, physics, add } = this;


    clear('score');


    this.score = 0;


    this.cityGroup = this.add.group();

    // Creating animations
    anims.create({
      key: 'run',
      frames: anims.generateFrameNumbers('player', { start: 5, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    // setting coin animation
    anims.create({
      key: 'rotate',
      frames: anims.generateFrameNumbers('coin', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    anims.create({
      key: 'jump',
      frames: anims.generateFrameNumbers('playerJump', {
        start: 9,
        end: 11,
        repeat: -1,
      }),
      frameRate: 20,
    });

    anims.create({
      key: 'robotEnemy',
      frames: anims.generateFrameNumbers('robot', {
        start: 55,
        end: 62,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'explode',
      frames: anims.generateFrameNames('explode', {
        start: 0,
        end: 1,
      }),
      frameRate: 15,
      repeat: -1,

    });

    anims.create({
      key: 'explodeStrong',
      frames: anims.generateFrameNames('explode', {
        start: 0,
        end: 8,
      }),
      frameRate: 15,
      repeat: -1,

    });
    this.dismanteledSound = this.sound.add('powerOff');
    this.jumpSound = this.sound.add('jump');
    this.coinSound = this.sound.add('coin');
    this.robotSound = this.sound.add('robot', { allowMultiple: true });
    this.burningSoudns = this.sound.add('burning');


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
        coin.scene.coinPool.add(coin);
      },

    });


    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: (coin) => {
        coin.scene.coinGroup.add(coin);
      },
    });


    // group with all active robotcamps.
    this.robotGroup = this.add.group({

      // once a robotcamp is removed, it's added to the pool
      removeCallback: (robot) => {
        robot.scene.robotPool.add(robot);
      },
    });

    // robot pool
    this.robotPool = this.add.group({

      // once a robot is removed from the pool, it's added to the active robot group
      removeCallback: (robot) => {
        robot.scene.robotGroup.add(robot);
      },
    });

    this.waterGroup = this.add.group({

      removeCallback: (water) => {
        water.scene.waterPool.add(water);
      },
    });

    this.waterPool = this.add.group({

      removeCallback: (water) => {
        water.scene.waterGroup.add(water);
      },
    });


    // adding a city
    this.addCity();

    this.game.backgroundColor = '#101821';

    // keeping track of added platforms
    this.addedPlatforms = 0;


    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    const optPlatLimit = gameOptions.platformVerticalLimit;
    const optWidth = config.width;
    const optHeight = config.height;
    this.addPlatform(optWidth, optWidth / 2, optHeight * optPlatLimit[1]);


    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, config.height * 0.7, 'player');
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    // the player is not dying
    this.dying = false;

    if (this.dying === true) {
      this.robotSound.stop();
    }

    // setting collisions between the player and the platform group
    physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    });

    physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);


    physics.add.overlap(this.player, this.robotGroup, this.touchRobot, null, this);
    physics.add.overlap(this.player, this.waterGroup, this.touchWater, null, this);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);

    this.scoreText = add.text(16, 16, 'score: 0', {
      fontSize: '52px',
      fill: '#f9f9f9',
    });

    this.scoreText.setDepth(4);
  }


  // /////////////////////////////////
  addCity() {
    const rightmostCity = this.getRightmostCity();
    if (rightmostCity < config.width * 2) {
      const city = this.physics.add.sprite(rightmostCity + Phaser.Math.Between(100, 350), config.height + Phaser.Math.Between(0, 0), 'city');
      city.setOrigin(0.5, 1);
      city.setScale(2);
      city.body.setVelocityX(gameOptions.citySpeed * -1);
      this.cityGroup.add(city);
      if (Phaser.Math.Between(0, 1)) {
        city.setDepth(1);
      }
      city.setFrame(Phaser.Math.Between(0, 3));
      this.addCity();
    }
  }

  getRightmostCity() {
    let rightmostCity = -200;
    this.cityGroup.getChildren().forEach((city) => {
      rightmostCity = Math.max(rightmostCity, city.x);
    });
    return rightmostCity;
  }

  collectCoin(player, coin) {
    this.coinSound.play();


    this.coinGroup.killAndHide(coin);
    this.coinGroup.remove(coin);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }


  touchRobot(player, robot) {
    this.dying = true;
    this.player.anims.stop();
    player.anims.play('explode');
    this.player.setFrame(2);
    this.player.body.setVelocityY(-200);
    this.burningSoudns.play();
    this.physics.world.removeCollider(this.platformCollider);
  }

  touchWater(player, water) {
    this.dying = true;
    this.player.anims.stop();
    // player.anims.play("explode")
    this.player.setFrame(2);
    this.player.body.setVelocityY(-200);
    // this.burningSoudns.play()
    this.physics.world.removeCollider(this.platformCollider);
  }


  addPlatform(platformWidth, posX, posY) {
    increaseDifficulty(this.score, this.player);
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 31, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      const optSpeedRange = gameOptions.platformSpeedRange;
      platform.body.setVelocityX(Phaser.Math.Between(optSpeedRange[0], optSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    const optionsSpawnRange = gameOptions.spawnRange;
    this.nextPlatformDistance = Phaser.Math.Between(optionsSpawnRange[0], optionsSpawnRange[1]);


    if (this.addedPlatforms > 1) {
      // is there a coin over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }
      if (Phaser.Math.Between(1, 100) <= gameOptions.robotPercent) {
        if (this.robotPool.getLength()) {
          const robot = this.robotPool.getFirst();

          robot.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          robot.y = posY - 46;
          robot.alpha = 1;
          robot.active = true;
          robot.visible = true;
          this.robotPool.remove(robot);
        } else {
          const robot = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'robot');
          robot.setImmovable(true);
          robot.setVelocityX(platform.body.velocity.x);
          robot.setSize(8, 2, true);
          robot.anims.play('robotEnemy');
          robot.setDepth(2);
          this.robotGroup.add(robot);
          this.robotSound.play();
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions.waterPercent) {
        if (this.waterPool.getLength()) {
          const water = this.waterPool.getFirst();

          water.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          water.y = posY - 46;
          water.alpha = 1;
          water.active = true;
          water.visible = true;
          this.waterPool.remove(water);
        } else {
          const water = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'water');
          water.setImmovable(true);
          water.setVelocityX(platform.body.velocity.x);
          water.setSize(8, 2, true);
          // water.anims.play("wet");
          water.setDepth(2);
          this.waterGroup.add(water);
          // this.robotSound.play()
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps
  // left and the first jump was on the ground
  jump() {
    const touchDowm = this.player.body.touching.down;
    const { playerJumps } = this;
    if ((!this.dying) && (touchDowm || (playerJumps > 0 && playerJumps < gameOptions.jumps))) {
      this.jumpSound.play();
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
      this.player.anims.play('jump');
    }
  }


  update() {
    if (this.player.y > config.height) {
      this.dismanteledSound.play();
      this.scene.start('SubmitScore', this.score);
      // this.scene.start('Game')
    }
    this.player.x = gameOptions.playerStartPosition;


    // recycling platforms
    let minDistance = config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
        if (this.score < 300) {
          this.score += 1;
        } else {
          this.score += 3;
        }
        this.scoreText.setText(`Score: ${this.score}`);
      }
    }, this);


    // recycling coins
    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
        this.score -= 2;
        this.scoreText.setText(`Score: ${this.score}`);
      }
    }, this);
    // reciclin robot
    this.robotGroup.getChildren().forEach((robot) => {
      if (robot.x < -robot.displayWidth / 2) {
        this.robotGroup.killAndHide(robot);
        this.robotGroup.remove(robot);
        this.score += 5;
        this.scoreText.setText(`Score: ${this.score}`);
        this.robotSound.stop();
      }
    }, this);
    // reciclin water
    this.waterGroup.getChildren().forEach((water) => {
      if (water.x < -water.displayWidth / 2) {
        this.waterGroup.killAndHide(water);
        this.waterGroup.remove(water);
        this.score += 5;
        this.scoreText.setText(`Score: ${this.score}`);
        this.scoreText.setColor('#101821');
        //  this.waterSound.stop()
      }
    }, this);

    // recycling city
    this.cityGroup.getChildren().forEach((city) => {
      if (city.x < -city.displayWidth) {
        const rightmostCity = this.getRightmostCity();
        city.x = rightmostCity + Phaser.Math.Between(100, 350);
        city.y = config.height + Phaser.Math.Between(0, 100);
        city.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          city.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const optionsHeighRange = gameOptions.platformHeightRange;
      const optiosnSizeRange = gameOptions.platformSizeRange;
      const nextPlatformWidth = Phaser.Math.Between(optiosnSizeRange[0], optiosnSizeRange[1]);
      const platformRange = Phaser.Math.Between(optionsHeighRange[0], optionsHeighRange[1]);
      const platformRandomHeight = gameOptions.platformHeighScale * platformRange;
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformH = config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformH = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformH);
      const addPlatformWidth = config.width + nextPlatformWidth / 2;
      this.addPlatform(nextPlatformWidth, addPlatformWidth, nextPlatformH);
    }
  }
}

const increaseDifficulty = (score, player) => {
  if (score > 300) {
    player.setVelocityX(700);

    gameOptions.platformSpeedRange = [500, 900];

    gameOptions.robotPercent = 25 + score / 100;
    gameOptions.waterPercent = 40 + score / 100;
  } else if (score > 100) {
    gameOptions.robotPercent = 25 + score / 100;


    gameOptions.waterPercent = 40 + score / 100;
  } else {
    gameOptions.platformSpeedRange = [300, 300];
    gameOptions.robotPercent = 25;


    gameOptions.waterPercent = 0;
  }
};


const resize = () => {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = config.width / config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};
