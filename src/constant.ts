export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 400;
export const GRID_SIZE = 20;

export const ROWS = CANVAS_HEIGHT / GRID_SIZE;
export const COLUMNS = CANVAS_WIDTH / GRID_SIZE;

export enum DIRECTION {
  RIGHT = 0,
  DOWN = 1,
  LEFT = 2,
  UP = 3,
}

export const SPEED = 20;

export type Cell = {
  x: number,
  y: number
}
