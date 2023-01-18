import Background from './Background';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CellState, COLUMNS, GRID_SIZE, Position, ROWS } from './constant';
import Snake from './snake';

export default class Game {
  ctx: CanvasRenderingContext2D;
  snake: Snake;
  background = new Background();
  board: CellState[][] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    for (let i = 0; i < COLUMNS; i++) {
      const column = [];
      for (let j = 0; j < ROWS; j++) {
        column.push(null)
      }
      this.board.push(column)
    }
    this.snake = new Snake(this.ctx, this.board);
  }

  draw() {
    // this.background.draw(this.ctx);
    // this.clearBoard();
    this.snake.draw(this.board);
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
        switch (this.board[i][j]) {
          case null: 
            this.drawNull(i, j);
            break;
          case 'F':
            this.drawFood(i, j);
            break;
          case 'S':
            this.drawSnake(i, j);
            break;
        }
      }
    }
    // this.snake.draw();
    

    if (!this.snake.alive) {
      this.ctx.font = '24px serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('You are dead', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
  }

  private drawSnake(row: number, col: number) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(row * GRID_SIZE, col * GRID_SIZE, GRID_SIZE, GRID_SIZE)
  }

  private drawNull(row: number, col: number) {
    this.ctx.strokeStyle = 'grey';
    this.ctx.strokeRect(row * GRID_SIZE, col * GRID_SIZE, GRID_SIZE, GRID_SIZE)
  }

  private drawFood(row: number, col: number) {
    this.ctx.fillStyle = 'lime';
    this.ctx.fillRect(row * GRID_SIZE, col * GRID_SIZE, GRID_SIZE, GRID_SIZE)
  }

  private clearBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = null
      }
    }
  }

  
}
