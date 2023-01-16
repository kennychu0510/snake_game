import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION } from './constant';
import Game from './game';

function getElement(selector: string) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(selector + ' not found');
  return element;
}

const canvas = getElement('canvas') as HTMLCanvasElement;
const LEFT_BUTTON = getElement('#left-button') as HTMLButtonElement;
const RIGHT_BUTTON = getElement('#right-button') as HTMLButtonElement;
const DOWN_BUTTON = getElement('#down-button') as HTMLButtonElement;
const UP_BUTTON = getElement('#up-button') as HTMLButtonElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
window.devicePixelRatio = 2;

const game = new Game(ctx);

function render() {
  clear(ctx);
  game.draw();
  requestAnimationFrame(render);
}

function clear(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

render();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
    case 'ArrowLeft':
      game.snake.changeDirection(DIRECTION.LEFT);
      break;
    case 's':
    case 'ArrowDown':
      game.snake.changeDirection(DIRECTION.DOWN);
      break;
    case 'd':
    case 'ArrowRight':
      game.snake.changeDirection(DIRECTION.RIGHT);
      break;
    case 'w':
    case 'ArrowUp':
      game.snake.changeDirection(DIRECTION.UP);
      break;
  }
});

LEFT_BUTTON.addEventListener('click', () => {
  game.snake.changeDirection(DIRECTION.LEFT);
})
RIGHT_BUTTON.addEventListener('click', () => {
  game.snake.changeDirection(DIRECTION.RIGHT);
})
DOWN_BUTTON.addEventListener('click', () => {
  game.snake.changeDirection(DIRECTION.DOWN);
})
UP_BUTTON.addEventListener('click', () => {
  game.snake.changeDirection(DIRECTION.UP);
})