import Background from './Background';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant';
import Snake from './snake';

export default class Game {
  ctx: CanvasRenderingContext2D;
  snake: Snake;
  background = new Background();

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.snake = new Snake(this.ctx);
  }

  draw() {
    this.snake.draw();
    
    this.background.draw(this.ctx);

    if (!this.snake.alive) {
      this.ctx.font = '24px serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('You are dead', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
  }
}
