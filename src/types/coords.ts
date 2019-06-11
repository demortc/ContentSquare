export interface Coords {
  x: number;
  y: number;
}

export enum Direction {
  NORTH = "N",
  EAST = "E",
  WEST = "W",
  SOUTH = "S",
}

export enum Rotation {
  LEFT = "L",
  RIGHT = "R",
}

export enum Movement {
    LEFT = "L",
    RIGHT = "R",
    FRONT = "F",
}
