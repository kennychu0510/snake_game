import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION } from './constant';
import Game from './game';

function getElement(selector: string) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(selector + ' not found');
  return element;
}

const canvas = getElement('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
window.devicePixelRatio = 2;

const GAME = new Game(ctx);

function render() {
  clear(ctx);
  GAME.draw();
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
      GAME.snake.direction = DIRECTION.LEFT;
      break;
    case 's':
    case 'ArrowDown':
      GAME.snake.direction = DIRECTION.DOWN;
      break;
    case 'd':
    case 'ArrowRight':
      GAME.snake.direction = DIRECTION.RIGHT;
      break;
    case 'w':
    case 'ArrowUp':
      GAME.snake.direction = DIRECTION.UP;
      break;
  }
});
