import {
    BORDER,
    SCORE_SEPARATOR_WIDTH,
    SCORE_WIDTH
  } from './constants';

export default class UI {
  constructor(ctx, score) {
    this.$ctx = ctx;
    this.score = score;
  }

  clearFrame() {
    this.$ctx.fillStyle = 'black';
    this.$ctx.fillRect(0, 0, canv.width, canv.height);
  }

  drawInterface() {
    // Draw separator
    this.$ctx.fillStyle = 'white';
    this.$ctx.fillRect(BORDER, 0, SCORE_SEPARATOR_WIDTH, BORDER);

    // Calc score appearance
    const totalScore = Object.keys(this.score.score).reduce((prev, cur) => {
      return prev + this.score.score[cur];
    }, 0);

    let scoreOffset = 0;

    Object.keys(this.score.score).forEach((color) => {
      const percentFromTotal = this.score.score[color] / totalScore;

      this.$ctx.fillStyle = color;
      this.$ctx.fillRect(
        BORDER + SCORE_SEPARATOR_WIDTH,
        scoreOffset,
        SCORE_WIDTH,
        BORDER * percentFromTotal
      );

      this.$ctx.font = '25px arial';
      this.$ctx.fillStyle = 'white';
      this.$ctx.fillText(
        String(`${Math.ceil(percentFromTotal * 100)}%`),
        BORDER + SCORE_SEPARATOR_WIDTH + SCORE_WIDTH / 4,
        (BORDER * percentFromTotal) / 2 + scoreOffset
      );

      scoreOffset = scoreOffset + Math.ceil(BORDER * percentFromTotal) + 2;
    });
  }
}
