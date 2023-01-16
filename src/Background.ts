import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SIZE } from "./constant";

export default class Background {
  rows = CANVAS_WIDTH / GRID_SIZE;
  columns = CANVAS_HEIGHT / GRID_SIZE;
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'grey'
    for (let i = 0; i < this.rows * GRID_SIZE; i+= GRID_SIZE) {
      for (let j = 0; j < this.columns * GRID_SIZE; j += GRID_SIZE) {
        ctx.strokeRect(i, j, GRID_SIZE, GRID_SIZE)
      }
    }
  }

}