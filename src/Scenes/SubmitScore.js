import Phaser from 'phaser';
import Button from '../Objects/Button';
import leaderboard from '../module/apiScore';


export default class SubmitScore extends Phaser.Scene {
  init(data) {
    this.score = data;
  }

  constructor() {
    super('SubmitScore');
  }


  create() {
    const player = localStorage.getItem('playerName');

    const submit = async () => {
      const response = await leaderboard.addScore(player, this.score);


      this.scene.start('Over');
    };

    submit();
  }
}
