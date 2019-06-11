import { Coords, Direction } from "../types/coords";

export namespace Utils {
    export let directionToCoords = (direction: Direction): Coords => {
        switch (direction) {
            case Direction.NORTH:
                return { x: 0, y: 1 };
            case Direction.SOUTH:
                return { x: 0, y: -1 };
            case Direction.WEST:
                return { x: -1, y: 0 };
            case Direction.EAST:
                return { x: 1, y: 0 };
            default:
                throw new Error(`Invalid letter ${direction} Cardinal direction are represended only by this next letters: N, E, W, S`);
        }
    };

    export let coordsToDirection = (coords: Coords): Direction => {
        switch (JSON.stringify(coords)) {
            case JSON.stringify({ x: 0, y: 1 }):
                return Direction.NORTH;
            case JSON.stringify({ x: 0, y: -1 }):
                return Direction.SOUTH;
            case JSON.stringify({ x: -1, y: 0 }):
                return Direction.WEST;
            case JSON.stringify({ x: 1, y: 0 }):
                return Direction.EAST;
            default:
                throw new Error(`Invalid coords ${JSON.stringify(coords)}`);
        }
    };
}
