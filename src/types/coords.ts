export interface Coords {
  x: number;
  y: number;
}

export enum Direction {
  NORTH = "N",
  EST = "E",
  WEST = "W",
  SUD = "S"
}

export enum Rotation {
  LEFT = "L",
  RIGHT = "R"
}

export enum Movement {
    L = "L",
    R = "R",
    F = "F"
}
