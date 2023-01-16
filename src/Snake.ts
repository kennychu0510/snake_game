import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION, GRID_SIZE, SPEED } from './constant';
import { Food } from './Food';

export default class Snake {
  length = 2;
  color = 'red';
  head = {
    x: CANVAS_WIDTH / 2 - GRID_SIZE / 2,
    y: CANVAS_HEIGHT / 2,
  };
  body: {
    x: number;
    y: number;
  }[];

  ctx: CanvasRenderingContext2D;
  direction: DIRECTION;
  tick = 0;
  food: Food;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.direction = DIRECTION.RIGHT;
    this.body = [{ x: CANVAS_WIDTH / 2 - GRID_SIZE / 2 - GRID_SIZE, y: CANVAS_HEIGHT / 2 }];
    this.food = new Food(ctx, this.head, this.body)
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.tick++;
    this.ctx.fillRect(this.head.x, this.head.y, GRID_SIZE, GRID_SIZE);
    for (let cell of this.body) {
      this.ctx.fillRect(cell.x, cell.y, GRID_SIZE, GRID_SIZE); 
    }
    if (this.tick % SPEED === 0) {
      this.update();
    }
    
  }

  update() {
    this.body.unshift({ x: this.head.x, y: this.head.y })
    this.body = this.body.slice(0, this.length - 1)
    switch (this.direction) {
      case DIRECTION.RIGHT:
        if (this.head.x === CANVAS_WIDTH - GRID_SIZE) {
          this.head.x = 0;
        } else {
          this.head.x += GRID_SIZE;
        }
        break;
      case DIRECTION.DOWN:
        if (this.head.y === CANVAS_HEIGHT - GRID_SIZE) {
          this.head.y = 0;
        } else {
          this.head.y += GRID_SIZE;
        }
        break;
      case DIRECTION.LEFT:
        if (this.head.x === 0) {
          this.head.x = CANVAS_WIDTH - GRID_SIZE;
        } else {
          this.head.x -= GRID_SIZE;
        }
        break;
      case DIRECTION.UP:
        if (this.head.y === 0) {
          this.head.y = CANVAS_HEIGHT - GRID_SIZE;
        } else {
          this.head.y -= GRID_SIZE;
        }
        break;
    }
  }

  changeDirection(d: DIRECTION) {
    if (this.direction === DIRECTION.RIGHT && d === DIRECTION.LEFT) return;
    if (this.direction === DIRECTION.LEFT && d === DIRECTION.RIGHT) return;
    if (this.direction === DIRECTION.UP && d === DIRECTION.DOWN) return;
    if (this.direction === DIRECTION.DOWN && d === DIRECTION.UP) return;
    this.direction = d;
  }
}
