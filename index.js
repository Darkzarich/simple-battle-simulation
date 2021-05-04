const canv = document.getElementById('canv');
var ctx = canv.getContext('2d');

window.requestAnimationFrame(renderFrame);

const BORDER = 400;

const greenUnits = generateRandomUnits(30);
const redUnits = generateRandomUnits(30);

function generateRandomUnits(count) {
  const _units = new Array(count).fill().map(() => {
    return {
      x: Math.floor(Math.random() * 1000) % 400,
      y: Math.floor(Math.random() * 1000) % 400,
    };
  });

  return _units;
}

function renderFrame() {
  clearFrame();

  greenUnits.forEach((unit) => {
    move(unit, 1);
  });

  redUnits.forEach((unit) => {
    move(unit, -1);
  });

  drawInterface();

  window.requestAnimationFrame(renderFrame);
}

function drawInterface() {
  const separatorWidth = 3;

  ctx.fillStyle = 'white';
  ctx.fillRect(BORDER, 0, separatorWidth, BORDER);

  ctx.fillStyle = 'green';
  ctx.fillRect(
    BORDER + separatorWidth,
    0,
    BORDER - separatorWidth + 100,
    BORDER / 2
  );

  ctx.fillStyle = 'maroon';
  ctx.fillRect(
    BORDER + separatorWidth,
    BORDER / 2,
    BORDER - separatorWidth + 100,
    BORDER / 2
  );
}

function move(unit, direction) {
  renderUnit(unit.x, unit.y, direction === 1 ? 'green' : 'maroon');

  if (unit.x > BORDER) {
    unit.y = unit.y + 16;
    unit.x = 0;
  }

  if (unit.x < 0) {
    unit.y = unit.y + 16;
    unit.x = BORDER;
  }

  if (unit.y > BORDER) {
    unit.y = 0;
  }

  unit.x = unit.x + 1 * direction;
}

function clearFrame() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);
}

function renderUnit(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 14, 14);
}
