const BORDER = 400;
const SCORE_SEPARATOR_WIDTH = 4;
const UNIT_SIZE = 14;
const PLAYER1_COLOR = 'green';
const PLAYER2_COLOR = 'maroon';
const COLLISION_COLOR = 'yellow';
const COLLISION_WIDTH = 2;
const UNIT_POWER_GROWTH = 1;
const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = -1;

class Unit {
  constructor({ x, y, side }, ctx) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.collided = false;
    this.direction = side.direction;
    this.$ctx = ctx;
    this.power = 0;
  }

  move() {
    this.renderUnit(this.x, this.y, this.side);

    this.handleOutOfBorder();

    this.x = this.x + 1 * this.direction;
  }

  handleOutOfBorder() {
    if (this.x > BORDER) {
      this.y = this.y + (Math.floor(Math.random() * 100) % UNIT_SIZE); // random drop down
      this.x = 0;
    }

    if (this.x < 0) {
      this.y = this.y + (Math.floor(Math.random() * 100) % UNIT_SIZE); // random drop down
      this.x = BORDER;
    }

    if (this.y > BORDER) {
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

class UI {
  constructor(ctx) {
    this.$ctx = ctx;
  }

  clearFrame() {
    this.$ctx.fillStyle = 'black';
    this.$ctx.fillRect(0, 0, canv.width, canv.height);
  }

  drawInterface() {
    // Draw separator
    this.$ctx.fillStyle = 'white';
    this.$ctx.fillRect(BORDER, 0, SCORE_SEPARATOR_WIDTH, BORDER);

    // Draw player1 UI side
    this.$ctx.fillStyle = PLAYER1_COLOR;
    this.$ctx.fillRect(
      BORDER + SCORE_SEPARATOR_WIDTH,
      0,
      BORDER - SCORE_SEPARATOR_WIDTH + 100,
      BORDER / 2
    );

    // Draw player2 UI side
    this.$ctx.fillStyle = PLAYER2_COLOR;
    this.$ctx.fillRect(
      BORDER + SCORE_SEPARATOR_WIDTH,
      BORDER / 2,
      BORDER - SCORE_SEPARATOR_WIDTH + 100,
      BORDER / 2
    );
  }
}

class Units {
  constructor(ctx, unitsTotal, sides) {
    this.$ctx = ctx;
    this.units = this.generateRandomUnits(unitsTotal, sides);
  }

  generateRandomUnits(unitsTotal, sides) {
    let i = 0;

    return new Array(unitsTotal).fill().map(() => {
      if (i < sides.length - 1) i = i + 1;
      else i = 0;

      return this.generateRandomUnit(sides[i]);
    });
  }

  generateRandomUnit(side) {
    return new Unit(
      {
        x: Math.floor(Math.random() * 1000) % 400,
        y: Math.floor(Math.random() * 1000) % 400,
        side,
      },
      this.$ctx
    );
  }

  moveUnits() {
    this.units.forEach((unit) => {
      unit.move();
      const collidedUnit = this.getCollidedUnit(unit);

      if (collidedUnit) {
        // draw collision border
        collidedUnit.collided = true;
        unit.collided = true;

        // AudioPlayer.bump();

        if (unit.power >= collidedUnit.power) {
          unit.setPower(0);
          this.killUnit(collidedUnit);
        } else {
          collidedUnit.setPower(0);
          this.killUnit(unit);
        }

        return;
      }

      unit.collided = false;
      unit.setPower(unit.power + UNIT_POWER_GROWTH);
    });
  }

  killUnit(unit) {
    this.units = this.units.filter((u) => u !== unit);
    this.units.push(this.generateRandomUnit(unit.side));
  }

  getCollidedUnit(unit) {
    for (const otherUnit of this.units) {
      if (
        Math.abs(otherUnit.x - unit.x) <= UNIT_SIZE - COLLISION_WIDTH &&
        Math.abs(otherUnit.y - unit.y) <= UNIT_SIZE - COLLISION_WIDTH &&
        otherUnit.side.color !== unit.side.color
      ) {
        return otherUnit;
      }
    }
  }
}

class Game {
  constructor(ctx, ui, unitsTotal, sides) {
    this.$ctx = ctx;
    this.ui = ui;
    this.units = new Units(ctx, unitsTotal, sides);
    this.init();
  }

  init() {
    // AudioPlayer.playBackgroundMusic();
  }

  startSimulation() {
    this.ui.clearFrame();

    this.units.moveUnits();

    this.ui.drawInterface();

    window.requestAnimationFrame(this.startSimulation.bind(this));
  }
}

class AudioPlayer {
  static playBackgroundMusic() {
    const audio = new Audio('/loop.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audio.play();
  }

  static bump() {
    const audio = new Audio('/bump.mp3');
    audio.volume = 0.2;
    audio.play();
  }
}

// main

(function () {
  const canv = document.getElementById('canv');
  const $ctx = canv.getContext('2d');

  const PLAYER1 = {
    color: PLAYER1_COLOR,
    trace: ['#008000a8', '#00800054'],
    direction: DIRECTION_RIGHT,
  };

  const PLAYER2 = {
    color: PLAYER2_COLOR,
    trace: ['#800000a8', '#80000054'],
    direction: DIRECTION_LEFT,
  };

  const startButton = document.querySelector('#start');
  startButton.addEventListener('click', () => {
    new Game($ctx, new UI($ctx), 50, [PLAYER1, PLAYER2]).startSimulation();

    startButton.remove();
  });
})();
