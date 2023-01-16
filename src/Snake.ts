import { COLUMNS, DIRECTION, GRID_SIZE, ROWS, SPEED } from './constant';
import { Food } from './Food';

export default class Snake {
  length = 2;
  color = 'red';
  head = {
    x: Math.floor(COLUMNS / 2),
    y: ROWS / 2,
  };
  body: {
    x: number;
    y: number;
  }[];

  ctx: CanvasRenderingContext2D;
  private direction: DIRECTION;
  tick = 0;
  food: Food;
  alive = true;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.direction = DIRECTION.RIGHT;
    this.body = [{ x: this.head.x - 1, y: this.head.y }];
    this.food = new Food(ctx, this.head, this.body)
  }

  draw() {
    this.food.draw();
    this.ctx.fillStyle = this.color;
    this.tick++;
    this.ctx.fillRect(this.head.x * GRID_SIZE, this.head.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    for (let cell of this.body) {
      this.ctx.fillRect(cell.x * GRID_SIZE, cell.y * GRID_SIZE, GRID_SIZE, GRID_SIZE); 
    }
    if (this.tick % SPEED === 0) {
      if (this.alive) {
        this.update();
      }
    }
  }

  update() {
    if (this.checkCollision()) {
      this.alive = false;
      return
    }
    this.body.unshift({ x: this.head.x, y: this.head.y })
    this.body = this.body.slice(0, this.length - 1)
    
    switch (this.direction) {
      case DIRECTION.RIGHT:
        if (this.head.x === COLUMNS - 1) {
          this.head.x = 0;
        } else {
          this.head.x += 1;
        }
        break;
      case DIRECTION.DOWN:
        if (this.head.y === ROWS - 1) {
          this.head.y = 0;
        } else {
          this.head.y += 1;
        }
        break;
      case DIRECTION.LEFT:
        if (this.head.x === 0) {
          this.head.x = COLUMNS - 1;
        } else {
          this.head.x -= 1;
        }
        break;
      case DIRECTION.UP:
        if (this.head.y === 0) {
          this.head.y = ROWS - 1;
        } else {
          this.head.y -= 1;
        }
        break;
    }
    if (this.head.x === this.food.x && this.head.y === this.food.y) {
      this.food.spawn()
      this.length++;
      this.update()
    }
  }

  changeDirection(d: DIRECTION) {
    if (this.direction === DIRECTION.RIGHT && d === DIRECTION.LEFT) return;
    if (this.direction === DIRECTION.LEFT && d === DIRECTION.RIGHT) return;
    if (this.direction === DIRECTION.UP && d === DIRECTION.DOWN) return;
    if (this.direction === DIRECTION.DOWN && d === DIRECTION.UP) return;
    this.direction = d;
  }

  private checkCollision(): boolean {
    for (let cell of this.body) {
      if (cell.x === this.head.x && cell.y === this.head.y) return true
    }
    return false
  }
}
