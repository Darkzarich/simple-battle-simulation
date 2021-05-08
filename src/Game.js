import Score from './Score';
import UI from './UI';
import Units from './Units';
import AudioPlayer from './AudioPlayer';

export default class Game {
  constructor(ctx, unitsTotal, sides) {
    this.$ctx = ctx;
    this.score = new Score(sides);
    this.ui = new UI(ctx, this.score);
    this.units = new Units(ctx, unitsTotal, sides, this.score);
    this.init();
  }

  init() {
    AudioPlayer.playBackgroundMusic();
  }

  startSimulation() {
    this.ui.clearFrame();

    this.units.moveUnits();

    this.ui.drawInterface();

    window.requestAnimationFrame(this.startSimulation.bind(this));
  }
}
