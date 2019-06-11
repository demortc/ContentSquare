import { assert, expect } from "chai";
import "mocha";
import { Mower } from "../components/mower";
import { Utils } from "../components/utils";
import { Direction, Movement } from "../types/coords";
import directionToCoords = Utils.directionToCoords;

describe("Mower class tests", () => {
    it("init test", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.NORTH), pos: {x: 0, y: 0}});

        expect(mower.getPositionAsString()).to.equal("0 0 N");
    });

    it("rotate LEFT from NORTH", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.NORTH), pos: {x: 0, y: 0}});

        mower.control(Movement.LEFT);

        expect(mower.getPositionAsString()).to.equal("0 0 W");
    });

    it("rotate RIGHT from NORTH", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.NORTH), pos: {x: 0, y: 0}});

        mower.control(Movement.RIGHT);

        expect(mower.getPositionAsString()).to.equal("0 0 E");
    });

    it("rotate RIGHT from EAST", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.EAST), pos: {x: 0, y: 0}});

        mower.control(Movement.RIGHT);

        expect(mower.getPositionAsString()).to.equal("0 0 S");
    });

    it("rotate LEFT from EAST", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.EAST), pos: {x: 0, y: 0}});

        mower.control(Movement.LEFT);

        expect(mower.getPositionAsString()).to.equal("0 0 N");
    });

    it("double LEFT rotate from SOUTH", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.SOUTH), pos: {x: 0, y: 0}});

        mower.control(Movement.LEFT);
        mower.control(Movement.LEFT);

        expect(mower.getPositionAsString()).to.equal("0 0 N");
    });

    it("full rotate from SOUTH", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.SOUTH), pos: {x: 0, y: 0}});

        mower.control(Movement.LEFT);
        mower.control(Movement.LEFT);
        mower.control(Movement.LEFT);
        mower.control(Movement.LEFT);

        expect(mower.getPositionAsString()).to.equal("0 0 S");
    });

    it("LEFT & RIGHT rotate from WEST", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.WEST), pos: {x: 0, y: 0}});

        mower.control(Movement.LEFT);
        mower.control(Movement.RIGHT);

        expect(mower.getPositionAsString()).to.equal("0 0 W");
    });

    it("Move FRONT from NORTH", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.NORTH), pos: {x: 0, y: 0}});

        mower.control(Movement.FRONT);

        expect(mower.getPositionAsString()).to.equal("0 1 N");
    });

    it("Move FRONT from EAST", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.EAST), pos: {x: 0, y: 0}});

        mower.control(Movement.FRONT);

        expect(mower.getPositionAsString()).to.equal("1 0 E");
    });

    it("Invalid position : Mower is out of map", () => {
        assert.throws(() => new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.WEST), pos: {x: 3, y: -1}}), Error, "Mower is out of map");
    });

    it("Invalid movement : out of min square", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.WEST), pos: {x: 0, y: 0}});

        mower.control(Movement.FRONT);

        expect(mower.getPositionAsString()).to.equal("0 0 W");
    });

    it("Invalid movement : out of max square", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.NORTH), pos: {x: 2, y: 2}});

        mower.control(Movement.FRONT);

        expect(mower.getPositionAsString()).to.equal("2 2 N");
    });

    it("Invalid movement : invalid letter", () => {
        const mower: Mower = new Mower({xMax: 2, yMax: 2}, {direction: directionToCoords(Direction.NORTH), pos: {x: 2, y: 2}});

        assert.throws(() => mower.control("B" as Movement), Error, "Invalid movement. Movements should be F, L or R");
    });
});
