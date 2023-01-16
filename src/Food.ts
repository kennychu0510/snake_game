import { Cell, COLUMNS, GRID_SIZE, ROWS } from './constant';

export class Food {
  ctx: CanvasRenderingContext2D;
  x = Math.ceil(Math.random() * COLUMNS);
  y = Math.ceil(Math.random() * ROWS);

  constructor(ctx: CanvasRenderingContext2D, snakeHead: Cell, snakeBody: Cell[]) {
    this.ctx = ctx;
    let clash = false;
    do {
      this.spawn()
      clash = this.checkClash(snakeHead, snakeBody)
    } while (clash)
  }

  draw() {
    this.ctx.fillStyle = 'lime';
    this.ctx.fillRect(this.x * GRID_SIZE, this.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }

  spawn() {
    this.x = Math.floor(Math.random() * COLUMNS);
    this.y = Math.floor(Math.random() * ROWS);
  }

  private checkClash(snakeHead: Cell, snakeBody: Cell[]): boolean {
    if (snakeHead.x === this.x && snakeHead.y === this.y) return true
    for (let cell of snakeBody) {
      if (cell.x === this.x && cell.y === this.y) return true
    }
    return false
  }


}
