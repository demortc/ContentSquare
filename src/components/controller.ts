import * as fs from "fs";
import * as readline from "readline";
import {Mower} from "./mower";
import {SquareProperties} from "../types/square";
import {Untils} from "./untils";
import {Direction, Movement} from "../types/coords";

export namespace Controller {
    import directionToCoords = Untils.directionToCoords;

    export let start = (filename: string): void => {
        let mowner: Mower | null = null;
        let square: SquareProperties | null = null;

        let reader = readline.createInterface({
            input: fs.createReadStream(filename)
        });

        reader.on('line', (input) => {
            if (square == null) {
                const coords: number[] = input.split(" ").map(parseInt);

                square = {
                    xMax: coords[0],
                    yMax: coords[1]
                }
            } else if (mowner === null) {
                const initialPosition: string[] = input.split(" ");
                const direction = directionToCoords(initialPosition[2] as Direction);

                mowner = new Mower(square, {
                    pos: {
                        x: parseInt(initialPosition[0]),
                        y: parseInt(initialPosition[1])
                    },
                    direction
                });
            } else if (mowner != null && square != null) {
                const array: string[] = [...input];

                array.forEach((movement) => {
                    mowner.control(movement as Movement);
                });

                console.log(mowner.getPositionAsString());

                mowner = null;
            }
        });
    }
}