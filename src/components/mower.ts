import { Coords, Movement, Rotation } from "../types/coords";
import { MowerPosition } from "../types/mower";
import { SquareProperties } from "../types/square";
import { Utils } from "./utils";
import coordsToDirection = Utils.coordsToDirection;

export class Mower {
    private readonly square: SquareProperties;
    private readonly mowerPosition: MowerPosition;
    private controls: {[key: string]: () => void} = {};

    constructor(square: SquareProperties, initialPosition: MowerPosition) {
        if (initialPosition.pos.x <= square.xMax && initialPosition.pos.x >= 0
            && initialPosition.pos.y <= square.yMax && initialPosition.pos.y >= 0) {

            this.square = square;
            this.mowerPosition = initialPosition;

            this.controls[Movement.FRONT] = this.moveFront.bind(this);
            this.controls[Movement.LEFT] = this.moveLeft.bind(this);
            this.controls[Movement.RIGHT] = this.moveRight.bind(this);
        } else {
            throw new Error("Mower is out of map");
        }
    }

    public control(movement: Movement): void {
        if (this.controls.hasOwnProperty(movement)) {
            this.controls[movement]();
        } else {
            throw new Error("Invalid movement. Movements should be F, L or R");
        }
    }

    public getPosition(): MowerPosition {
        return this.mowerPosition;
    }

    public getPositionAsString(): string {
        return `${this.mowerPosition.pos.x} ${this.mowerPosition.pos.y}
            ${coordsToDirection(this.mowerPosition.direction)}`;
    }

    protected moveLeft(): void {
        this.rotate(Rotation.LEFT);
    }

    protected moveRight(): void {
        this.rotate(Rotation.RIGHT);
    }

    protected moveFront(): void {
        const position: Coords = {
            x: this.mowerPosition.pos.x + this.mowerPosition.direction.x,
            y: this.mowerPosition.pos.y + this.mowerPosition.direction.y,
        };

        if (position.x <= this.square.xMax && position.y <= this.square.yMax && position.x >= 0 && position.y >= 0) {
            this.mowerPosition.pos = position;
        }
    }

    protected rotate(rotation: Rotation): void {
        const direction: Coords = { ...this.mowerPosition.direction };

        switch (rotation) {
            case Rotation.LEFT:
                this.mowerPosition.direction.x = -direction.y;
                this.mowerPosition.direction.y = direction.x;
                break;
            case Rotation.RIGHT:
                this.mowerPosition.direction.x = direction.y;
                this.mowerPosition.direction.y = -direction.x;
                break;
        }
    }
}
