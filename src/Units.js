import { UNIT_SIZE, COLLISION_WIDTH, UNIT_POWER_GROWTH } from './constants';
import AudioPlayer from './AudioPlayer';
import Unit from './Unit';

export default class Units {
  constructor(ctx, unitsTotal, sides, score) {
    this.$ctx = ctx;
    this.units = this.generateRandomUnits(unitsTotal, sides);
    this.score = score;
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

        AudioPlayer.bump();

        if (unit.power >= collidedUnit.power) {
          unit.setPower(0);
          this.killUnit(collidedUnit);
          this.score.changeScore(unit.side.color, 1);
        } else {
          collidedUnit.setPower(0);
          this.killUnit(unit);
          this.score.changeScore(collidedUnit.side.color, 1);
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
