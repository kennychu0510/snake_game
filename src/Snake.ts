import { CellState, COLUMNS, DIRECTION, GRID_SIZE, Position, ROWS, SPEED } from './constant';
import { getElement } from './helper';

const LEVEL = getElement('#game-header span') as HTMLSpanElement;

export default class Snake {
  color = 'red';
  position: Position[];

  ctx: CanvasRenderingContext2D;
  private direction: DIRECTION;
  tick = 0;
  alive = true;

  constructor(ctx: CanvasRenderingContext2D, board: CellState[][]) {
    this.ctx = ctx;
    this.direction = DIRECTION.RIGHT;
    this.position = [{ x: Math.floor(COLUMNS / 2), y: Math.floor(ROWS / 2) }, 
    { x: Math.floor(COLUMNS / 2) - 1, y: Math.floor(ROWS / 2) },
    { x: Math.floor(COLUMNS / 2) - 2, y: Math.floor(ROWS / 2) },
    { x: Math.floor(COLUMNS / 2) - 3, y: Math.floor(ROWS / 2) },
  ];
    this.genFood(board)
  }

  draw(board: CellState[][]) {
    this.tick++;

    for (let position of this.position) {
      const row = position.x;
      const col = position.y;
      board[row][col] = 'S';
    }

    if (this.checkCollision()) {
      this.alive = false;
    }

    if (this.tick % SPEED === 0 && this.alive) {
      this.update(board);
    }

  }

  update(board: CellState[][]) {
    /* SNAKE DIRECTION CHANGE */
    const head = { x: this.position[0].x, y: this.position[0].y };

    switch (this.direction) {
      case DIRECTION.RIGHT:
        if (head.x === COLUMNS - 1) {
          head.x = 0;
        } else {
          head.x += 1;
        }
        break;
      case DIRECTION.DOWN:
        if (head.y === ROWS - 1) {
          head.y = 0;
        } else {
          head.y += 1;
        }
        break;
      case DIRECTION.LEFT:
        if (head.x === 0) {
          head.x = COLUMNS - 1;
        } else {
          head.x -= 1;
        }
        break;
      case DIRECTION.UP:
        if (head.y === 0) {
          head.y = ROWS - 1;
        } else {
          head.y -= 1;
        }
        break;
    }

    /* SNAKE MOVEMENT */
    this.position = [head, ...this.position];

    if (board[head.x][head.y] === 'F') {
      this.genFood(board)
      LEVEL.innerText = String(this.position.length)
      console.log(this.position.length)
    } else {
      const tail = this.position.pop();
      if (tail) {
        board[tail.x][tail.y] = null;
      }
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
    const head = this.position[0];
    for (let i = 1; i < this.position.length; i++) {
      if (this.position[i].x === head.x && this.position[i].y === head.y) return true;
    }
    return false;
  }

  private clearSnake(board: CellState[][]) {
    for (let position of this.position) {
      board[position.x][position.y] = null;
    }
  }

  private genFood(board: CellState[][]) {
    const emptyCells: Position[] = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          emptyCells.push({x: i, y: j})
        }
      }
    }
    const randomCell = Math.floor(Math.random() * emptyCells.length)
    const x = emptyCells[randomCell].x
    const y = emptyCells[randomCell].y
    board[x][y] = 'F'
  }
}
