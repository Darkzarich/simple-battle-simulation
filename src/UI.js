import { SCORE_SEPARATOR_WIDTH, SCORE_WIDTH } from './constants';

export default class UI {
  constructor(ctx, score) {
    this.$ctx = ctx;
    this.score = score;
  }

  clearFrame() {
    this.$ctx.fillStyle = 'black';
    this.$ctx.fillRect(0, 0, this.$ctx.canvas.width, this.$ctx.canvas.height);
  }

  drawInterface() {
    // Draw separator
    this.$ctx.fillStyle = 'white';
    this.$ctx.fillRect(
      this.$ctx.canvas.width - SCORE_WIDTH,
      0,
      SCORE_SEPARATOR_WIDTH,
      this.$ctx.canvas.height
    );

    // Calc score appearance
    const totalScore = Object.keys(this.score.score).reduce((prev, cur) => {
      return prev + this.score.score[cur];
    }, 0);

    let scoreOffset = 0;

    Object.keys(this.score.score).forEach((color) => {
      const percentFromTotal = this.score.score[color] / totalScore;

      this.$ctx.fillStyle = color;
      this.$ctx.fillRect(
        this.$ctx.canvas.width - SCORE_WIDTH + SCORE_SEPARATOR_WIDTH,
        scoreOffset,
        SCORE_WIDTH,
        this.$ctx.canvas.height * percentFromTotal
      );

      this.$ctx.font = '20px arial';
      this.$ctx.fillStyle = 'white';
      this.$ctx.fillText(
        String(`${(percentFromTotal * 100).toFixed(1)}%`),
        this.$ctx.canvas.width -
          SCORE_WIDTH -
          SCORE_SEPARATOR_WIDTH +
          SCORE_WIDTH / 5,
        (this.$ctx.canvas.height * percentFromTotal) / 2 + scoreOffset
      );

      scoreOffset =
        scoreOffset + Math.ceil(this.$ctx.canvas.height * percentFromTotal) + 2;
    });
  }
}
