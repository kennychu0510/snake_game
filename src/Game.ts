import Background from './Background';
import Snake from './snake';

export default class Game {
  ctx: CanvasRenderingContext2D;
  snake: Snake;
  background = new Background();

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.snake = (new Snake(this.ctx));

  }

  draw() {
    this.snake.draw();
    this.background.draw(this.ctx);
  }

}
