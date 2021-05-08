export default class Score {
  constructor(sides) {
    this.score = {};
    this.sides = sides;

    sides.forEach((side) => {
      this.score[side.color] = 0;
    });
  }

  getScore() {
    return this.score;
  }

  changeScore(player, value) {
    this.score[player] += value;
  }
}
