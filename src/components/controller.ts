import * as fs from "fs";
import * as readline from "readline";
import { Direction, Movement } from "../types/coords";
import { SquareProperties } from "../types/square";
import { Mower } from "./mower";
import { Utils } from "./utils";
import directionToCoords = Utils.directionToCoords;

export class Controller {

    public static start = (filename: string): Promise<void> =>
        new Promise((resolve, reject) => {
            const onError = (error) => reject(error);

            const stream = fs.createReadStream(filename);

            stream.on("error", onError);

            stream.on("readable", () => {
                let mowner: Mower | null = null;
                let square: SquareProperties | null = null;

                const reader = readline.createInterface({
                    input: fs.createReadStream(filename),
                    output: process.stdout,
                    terminal: false,
                });

                reader.on("line", (input) => {
                    try {
                        if (square === undefined) {
                            const coords: number[] = input.split(" ").map((value) => parseInt(value));

                            square = {
                                xMax: coords[0],
                                yMax: coords[1],
                            };

                        } else if (mowner === undefined) {
                            const initialPosition: string[] = input.split(" ");
                            const direction = directionToCoords(initialPosition[2] as Direction);

                            mowner = new Mower(square, {
                                pos: {
                                    x: parseInt(initialPosition[0]),
                                    y: parseInt(initialPosition[1]),
                                },
                                direction,
                            });
                        } else if (mowner !== undefined && square !== undefined) {
                            const array: string[] = [...input];

                            array.forEach((movement) => {
                                mowner.control(movement as Movement);
                            });

                            console.log(mowner.getPositionAsString());

                            mowner = null;
                        }
                    } catch (e) {
                        onError(e);
                    }
                });

                reader.on("close", () => resolve());
            });
        })
}
