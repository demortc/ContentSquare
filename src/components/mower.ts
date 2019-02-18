import {SquareProperties} from "../types/square";
import {Coords, Movement, Rotation} from "../types/coords";
import {MowerPosition} from "../types/mower";
import {Untils} from "./untils";
import coordsToDirection = Untils.coordsToDirection;
import rotate = Untils.rotate;

export class Mower {
    private readonly square: SquareProperties;
    private mowerPosition: MowerPosition;
    private controls: {[key: string]: () => void} = {};

    constructor(square: SquareProperties, initialPosition: MowerPosition) {
        this.square = square;
        this.mowerPosition = initialPosition;

        this.controls[Movement.F] = this.moveFront.bind(this);
        this.controls[Movement.L] = this.moveLeft.bind(this);
        this.controls[Movement.R] = this.moveRight.bind(this);
    }


    control(movement: Movement): void {
        this.controls[movement]();
    }

    getPosition(): MowerPosition {
        return this.mowerPosition;
    }

    getPositionAsString(): string {
        return `${this.mowerPosition.pos.x} ${this.mowerPosition.pos.y} ${coordsToDirection(this.mowerPosition.direction)}`;
    }

    protected moveLeft(): void {
        this.rotate(Rotation.LEFT);
    }

    protected moveRight(): void {
        this.rotate(Rotation.RIGHT);
    }

    protected moveFront(): void {
        let position: Coords = {
            x: this.mowerPosition.pos.x + this.mowerPosition.direction.x,
            y: this.mowerPosition.pos.y + this.mowerPosition.direction.y
        };

        if (position.x <= this.square.xMax && position.y <= this.square.yMax && position.x >= 0 && position.y >= 0) {
            this.mowerPosition.pos = position;
        }
    }

    protected rotate(rotation: Rotation): void {
        switch (rotation) {
            case Rotation.LEFT:
                this.mowerPosition.direction.x = -this.mowerPosition.direction.y;
                this.mowerPosition.direction.y = this.mowerPosition.direction.x;
                break;
            case Rotation.RIGHT:
                this.mowerPosition.direction.x = this.mowerPosition.direction.y;
                this.mowerPosition.direction.y = -this.mowerPosition.direction.x;
                break;
        }
    }
}