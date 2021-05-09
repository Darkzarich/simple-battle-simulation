import {
  SCORE_WIDTH,
  UNIT_SIZE,
  COLLISION_COLOR,
  COLLISION_WIDTH,
  UNIT_BASE_SPEED,
} from './constants';

export default class Unit {
  constructor({ x, y, side }, ctx) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.collided = false;
    this.direction = side.direction;
    this.$ctx = ctx;
    this.power = 0;
    this.speed = UNIT_BASE_SPEED;
  }

  move() {
    this.renderUnit(this.x, this.y, this.side);

    this.handleOutOfBorder();

    this.speed = Math.max(1, Math.floor(this.power / 50) + 1); // every 50 power +1 speed

    this.x = this.x + this.speed * this.direction;
  }

  handleOutOfBorder() {
    if (this.x > this.$ctx.canvas.width - SCORE_WIDTH) {
      this.y = this.y + (Math.floor(Math.random() * 100) % UNIT_SIZE) * 2; // random drop down
      this.x = 0;
    }

    if (this.x < 0) {
      this.y = this.y + (Math.floor(Math.random() * 100) % UNIT_SIZE) * 2; // random drop down
      this.x = this.$ctx.canvas.width - SCORE_WIDTH;
    }

    if (this.y > this.$ctx.canvas.height) {
      this.y = 0;
    }
  }

  setPower(power) {
    this.power = power;
  }

  renderUnit() {
    // draw trace

    for (let i = 1; i < this.side.trace.length + 1; i++) {
      this.$ctx.fillStyle = this.side.trace[i - 1];
      this.$ctx.fillRect(
        this.x - 3 * i * this.direction,
        this.y + 1 * i,
        UNIT_SIZE,
        UNIT_SIZE - 2 * i
      );
    }

    // draw unit
    this.$ctx.fillStyle = this.side.color;
    this.$ctx.fillRect(this.x, this.y, UNIT_SIZE, UNIT_SIZE);

    // collision border
    if (this.collided) {
      const offset = this.direction === 1 ? UNIT_SIZE - COLLISION_WIDTH : 0;

      this.$ctx.fillStyle = COLLISION_COLOR;
      this.$ctx.fillRect(
        this.x + offset,
        this.y,
        COLLISION_WIDTH + 10,
        UNIT_SIZE
      );
    }
  }
}
