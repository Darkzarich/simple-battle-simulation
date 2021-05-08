import Game from './src/Game';
import {
  PLAYER1_COLOR,
  PLAYER2_COLOR,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  BORDER,
  SCORE_WIDTH
} from './src/constants';

const canv = document.getElementById('canv');
const $ctx = canv.getContext('2d');

canv.height = BORDER
canv.width = BORDER + SCORE_WIDTH

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
  new Game($ctx, 50, [PLAYER1, PLAYER2]).startSimulation();
  startButton.remove();
});
