import { Direction } from "../enums/direction";
import { Robot } from "./moving-object";


describe('robot class test', () => {

    test('just initialise', () => {
        const robot = new Robot();

        // x,y,direction are not yet set
        expect(robot['x']).toBeUndefined();
        expect(robot['y']).toBeUndefined();
        expect(robot['direction']).toBeUndefined();
    });

    test('set position()', () => {
        const robot = new Robot();

        const xPos = 1;
        const yPos = 2;
        const direction = Direction.WEST;

        robot.setPosition(xPos, yPos, direction);

        // x,y,direction are not yet set
        expect(robot['x']).toEqual(xPos);
        expect(robot.currentX()).toEqual(xPos);
        expect(robot['y']).toEqual(yPos);
        expect(robot.currentY()).toEqual(yPos);
        expect(robot['direction']).toEqual(direction);
        expect(robot.currentDirection()).toEqual(direction);
    });

    test('getter/setter', () => {
        const robot = new Robot();

        // x is not yet initialised
        expect(robot['x']).toBeUndefined();

        const xPos = 3;
        robot.setCurrentX(xPos);
        expect(robot['x']).toEqual(xPos);
        expect(robot.currentX()).toEqual(xPos);


        // y is not yet initialised
        expect(robot['y']).toBeUndefined();

        const yPos = 4;
        robot.setCurrentY(yPos);
        expect(robot['y']).toEqual(yPos);
        expect(robot.currentY()).toEqual(yPos);


        // direction is not yet initialised
        expect(robot['direction']).toBeUndefined();

        const direction = Direction.NORTH;
        robot.setCurrentDirection(direction);
        expect(robot['direction']).toEqual(direction);
        expect(robot.currentDirection()).toEqual(direction);
    });

});