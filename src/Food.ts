import { CANVAS_HEIGHT, CANVAS_WIDTH, Cell, GRID_SIZE } from './constant';

export class Food {
  ctx: CanvasRenderingContext2D;
  x = Math.floor((Math.random() * CANVAS_WIDTH) / GRID_SIZE) * GRID_SIZE;
  y = Math.floor((Math.random() * CANVAS_HEIGHT) / GRID_SIZE) * GRID_SIZE;

  constructor(ctx: CanvasRenderingContext2D, snakeHead: Cell, snakeBody: Cell[]) {
    this.ctx = ctx;
    
  }

  draw() {
    this.ctx.fillStyle = 'lime';
    this.ctx.fillRect(this.x, this.y, GRID_SIZE, GRID_SIZE);
  }


}
