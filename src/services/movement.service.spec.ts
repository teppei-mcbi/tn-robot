import { Direction } from '../enums/direction';
import { MovingObject } from '../models/moving-object';
import { RobotMovement } from './movement.service';

describe('test place() function', () => {

    test('test x pos', () => {
        const service = new RobotMovement(4,4);
        let robot;
        const yPos = 0;
        const dir = Direction.NORTH;

        // set x pos to 5 (exceed)
        service.place(5, yPos, dir);
        robot = service['robot'];
        expect(robot).toBeUndefined();

        // set x pos to -1 (negative)
        service.place(-1, yPos, dir);
        robot = service['robot'];
        expect(robot).toBeUndefined();

        // set x pos to 0-4
        [0,1,2,3,4].forEach(x => {
            service.place(x, yPos, dir);
            robot = service['robot'];
            expect(robot.currentX()).toEqual(x);
        });
    });

    test('test y pos', () => {
        const service = new RobotMovement(4,4);
        let robot: MovingObject;
        const xPos = 0;
        const dir = Direction.NORTH;

        // set y pos to 5 (exceed)
        service.place(xPos, 5, dir);
        robot = service['robot'];
        expect(robot).toBeUndefined();

        // set y pos to -1 (negative)
        service.place(xPos, -1, dir);
        robot = service['robot'];
        expect(robot).toBeUndefined();

        // set y pos to 0-4
        [0,1,2,3,4].forEach(y => {
            service.place(xPos, y, dir);
            robot = service['robot'];
            expect(robot.currentY()).toEqual(y);
        });
    });

});

describe('test moveForward() function', () => {

    test('no robot yet', () => {
        const service = new RobotMovement(4,4);
        service.moveForward();
        const robot = service['robot'];
        expect(robot).toBeUndefined();
    });

    test('facing North', () => {
        const maxY = 4
        const service = new RobotMovement(4,maxY);
        const xPos = 0;
        const northDir = Direction.NORTH;

        let yPos = 0;
        service.place(xPos, yPos, northDir); // x: 0, y:0, North
        const robot: MovingObject = service['robot'];

        // loop and increment y position up max
        do {
             // move forward
            service.moveForward();

            // expect y pos to be incremented
            expect(robot.currentX()).toEqual(xPos);
            expect(robot.currentY()).toEqual(yPos+1);
            expect(robot.currentDirection()).toEqual(northDir);

            // increment y position
            yPos++;

        } while(yPos < maxY);

        // once getting max y position, it will be ignored
        expect(yPos).toEqual(maxY);

        // try to move forward
        service.moveForward();

        // invalid move so position remains the same
        expect(robot.currentY()).toEqual(yPos);
    });

    test('facing South', () => {
        const maxY = 4;
        const service = new RobotMovement(4,maxY);
        const xPos = 0;
        const southDir = Direction.SOUTH;

        let yPos = 4;
        service.place(xPos, yPos, southDir); // x: 0, y:4, South
        const robot: MovingObject = service['robot'];

        // loop and decrement y position to 0
        do {
            //  move forward
            service.moveForward();

            // expect y pos to be incremented
            expect(robot.currentX()).toEqual(xPos);
            expect(robot.currentY()).toEqual(yPos-1);
            expect(robot.currentDirection()).toEqual(southDir);

            // decrement y position
            yPos--;

        } while(yPos > 0);

        // once getting to y position: 0, it will be ignored
        expect(yPos).toEqual(0);

        // try to move forward
        service.moveForward();

        // invalid move so position remains the same
        expect(robot.currentY()).toEqual(yPos);
    });


    test('facing East', () => {
        const maxX = 4;
        const service = new RobotMovement(maxX,4);
        const yPos = 4;
        const eastDir = Direction.EAST;

        let xPos = 0;
        service.place(xPos, yPos, eastDir); // x: 0, y:0, East
        const robot: MovingObject = service['robot'];

        // loop and increment x position to nax
        do {
            //  move forward
            service.moveForward();

            // expect y pos to be incremented
            expect(robot.currentX()).toEqual(xPos+1);
            expect(robot.currentY()).toEqual(yPos);
            expect(robot.currentDirection()).toEqual(eastDir);

            // increment x position
            xPos++;

        } while(xPos < maxX);

        // once getting to x position: max, it will be ignored
        expect(xPos).toEqual(maxX);

        // try to move forward
        service.moveForward();

        // invalid move so position remains the same
        expect(robot.currentX()).toEqual(xPos);
    });

    test('facing West', () => {
        const maxX = 4;
        const service = new RobotMovement(maxX,4);
        const yPos = 4;
        const westDir = Direction.WEST;

        let xPos = 4;
        service.place(xPos, yPos, westDir); // x: 4, y:0, West
        const robot: MovingObject = service['robot'];

        // loop and decrement x position to 0
        do {
            //  move forward
            service.moveForward();

            // expect y pos to be incremented
            expect(robot.currentX()).toEqual(xPos-1);
            expect(robot.currentY()).toEqual(yPos);
            expect(robot.currentDirection()).toEqual(westDir);

            // decrement x position
            xPos--;

        } while(xPos > 0);

        // once getting to x position: 0, it will be ignored
        expect(xPos).toEqual(0);

        // try to move forward
        service.moveForward();

        // invalid move so position remains the same
        expect(robot.currentX()).toEqual(xPos);
    });
});

describe('test turnLeft()', () => {
    const service = new RobotMovement(4,4);

    test('north -> west', () => {
        service.place(0, 0, Direction.NORTH);
        const robot = service['robot'];

        // turn left (north -> west)
        service.turnLeft();
        expect(robot.currentDirection()).toEqual(Direction.WEST);
    });

    test('west -> south', () => {
        service.place(0, 0, Direction.WEST);
        const robot = service['robot'];

        // turn left (west -> south)
        service.turnLeft();
        expect(robot.currentDirection()).toEqual(Direction.SOUTH);
    });

    test('south -> east', () => {
        service.place(0, 0, Direction.SOUTH);
        const robot = service['robot'];

        // turn left (south -> east)
        service.turnLeft();
        expect(robot.currentDirection()).toEqual(Direction.EAST);
    });

    test('east -> north', () => {
        service.place(0, 0, Direction.EAST);
        const robot = service['robot'];

        // turn left (east -> north)
        service.turnLeft();
        expect(robot.currentDirection()).toEqual(Direction.NORTH);
    });

});

describe('test turnRight()', () => {
    const service = new RobotMovement(4,4);

    test('north -> east', () => {
        service.place(0, 0, Direction.NORTH);
        const robot = service['robot'];

        // turn left (north -> east)
        service.turnRight();
        expect(robot.currentDirection()).toEqual(Direction.EAST);
    });

    test('east -> south', () => {
        service.place(0, 0, Direction.EAST);
        const robot = service['robot'];

        // turn left (east -> south)
        service.turnRight();
        expect(robot.currentDirection()).toEqual(Direction.SOUTH);
    });

    test('south -> west', () => {
        service.place(0, 0, Direction.SOUTH);
        const robot = service['robot'];

        // turn left (south -> west)
        service.turnRight();
        expect(robot.currentDirection()).toEqual(Direction.WEST);
    });

    test('west -> north', () => {
        service.place(0, 0, Direction.WEST);
        const robot = service['robot'];

        // turn left (west -> north)
        service.turnRight();
        expect(robot.currentDirection()).toEqual(Direction.NORTH);
    });

});

describe('test isValidPosition()', () => {
    const maxX = 4;
    const maxY = 4;
    const service = new RobotMovement(maxX,maxY);

    test('x pos negative', () => {
        const result = service.isValidPosition(-1, 0);
        expect(result).toEqual(false);
    });

    test('y pos negative', () => {
        const result = service.isValidPosition(0, -1);
        expect(result).toEqual(false);
    });

    test('x pos exeed max', () => {
        const result = service.isValidPosition(maxX+1, 0);
        expect(result).toEqual(false);
    });

    test('y pos exeed max', () => {
        const result = service.isValidPosition(0, maxY+1);
        expect(result).toEqual(false);
    });

    test('valid x pos', () => {
        const yPos = 0;
        for (let x = 0; x <= maxX; x++) {
            const result = service.isValidPosition(x, yPos);
            expect(result).toEqual(true);
        }
    });

    test('valid y pos', () => {
        const xPos = 0;
        for (let y = 0; y <= maxY; y++) {
            const result = service.isValidPosition(xPos, y);
            expect(result).toEqual(true);
        }
    });
});

describe('test currentPosition()', () => {

    const service = new RobotMovement(4,4);

    test('expect null', () => {
        expect(service.currentPosition()).toBeNull();
    });

    test('x:0, y:0', () => {
        const x = 0;
        const y = 0
        service.place(x,y,Direction.NORTH);
        expect(service.currentPosition()).toEqual([x,y]);
    });

});

describe('test currentDirection()', () => {

    const service = new RobotMovement(4,4);

    test('expect null', () => {
        expect(service.currentDirection()).toBeNull();
    });

    test('north', () => {
        const x = 0;
        const y = 0
        const direction = Direction.NORTH
        service.place(x,y,direction);
        expect(service.currentDirection()).toEqual(direction);
    });

});
