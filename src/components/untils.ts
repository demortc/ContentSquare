import {Coords, Direction, Rotation} from "../types/coords";
import UnexpectedInput from "../error/unexpectedInput";

export namespace Untils {
    export let directionToCoords = (direction: Direction): Coords => {
        switch (direction) {
            case Direction.NORTH:
                return { x: 0, y: 1 };
            case Direction.SUD:
                return { x: 0, y: -1 };
            case Direction.WEST:
                return { x: -1, y: 0 };
            case Direction.EST:
                return { x: 1, y: 0 };
            default:
                throw new UnexpectedInput(`Invalid letter ${direction} Cardinal direction are represended only by this next letters: N, E, W, S`);
        }
    }

    export let coordsToDirection = (coords: Coords): Direction => {
        switch (JSON.stringify(coords)) {
            case JSON.stringify({ x: 0, y: 1 }):
                return Direction.NORTH;
            case JSON.stringify({ x: 0, y: -1 }):
                return Direction.SUD;
            case JSON.stringify({ x: -1, y: 0 }):
                return Direction.WEST;
            case JSON.stringify({ x: 1, y: 0 }):
                return Direction.EST;
            default:
                throw new UnexpectedInput(`Invalid coords ${coords}`);
        }
    }

    export let rotate = (rotation: Rotation, direction: Coords): Coords => {
        switch (rotation) {
        case Rotation.LEFT:
            return {
                x: -direction.y,
                y: direction.x,
            }
        case Rotation.RIGHT:
            return {
                x: direction.y,
                y: -direction.x,
            }
        }
    }
}