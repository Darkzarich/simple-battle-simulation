const BORDER = 400;
const SCORE_SEPARATOR_WIDTH = 4;
const PLAYER1_COLOR = 'green';
const PLAYER2_COLOR = 'maroon';
class Unit {
  constructor({x, y, side}, ctx) {
    this.x = x
    this.y = y
    this.side = side
    this.$ctx = ctx
  }

  move() {
    this.renderUnit(this.x, this.y, this.side);
  
    if (this.x > BORDER) {
      this.y = this.y + 16;
      this.x = 0;
    }
  
    if (this.x < 0) {
      this.y = this.y + 16;
      this.x = BORDER;
    }
  
    if (this.y > BORDER) {
      this.y = 0;
    }
  
    this.x = this.x + 1 * getDirectionBySide(this.side);
  }

  renderUnit() {
    this.$ctx.fillStyle = this.side;
    this.$ctx.fillRect(this.x, this.y, 14, 14);
  }
}

class UI {
  constructor(ctx) {
    this.$ctx = ctx
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

class Game {
  constructor(ctx, ui, unitsTotal, sides) {
    this.$ctx = ctx
    this.ui = ui;
    this.units = this.generateRandomUnits(unitsTotal, sides)
  }

  generateRandomUnits(unitsTotal, sides) {
    let i = 0
  
    return new Array(unitsTotal).fill().map(() => {
      if (i < sides.length - 1) i = i + 1;
      else i = 0

      return new Unit({
        x: Math.floor(Math.random() * 1000) % 400,
        y: Math.floor(Math.random() * 1000) % 400,
        side: sides[i],
      }, this.$ctx);
    });
  }

  startSimulation() {
    this.ui.clearFrame();

    this.units.forEach((unit) => {
      unit.move();
    });
  
    this.ui.drawInterface();
  
    window.requestAnimationFrame(this.startSimulation.bind(this));
  }
}

// utils

function getDirectionBySide(side) {
  switch (side) {
    case PLAYER1_COLOR: return 1
    case PLAYER2_COLOR: return -1
  }
}

// main

(function() {
  const canv = document.getElementById('canv');
  const $ctx = canv.getContext('2d');

  new Game($ctx, new UI($ctx), 50, [PLAYER1_COLOR, PLAYER2_COLOR])
    .startSimulation()
}());