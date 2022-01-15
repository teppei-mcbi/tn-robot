import { Command } from "../enums/command";
import { Direction } from "../enums/direction";
import { MovingObject } from "../models/moving-object";
import { RobotCommandExecutor, RobotCommandValidator } from "./command.service";
import { RobotMovement } from "./movement.service";

describe('test isValidCommand()', () => {
    const service = new RobotCommandValidator();

    test('command: PLACE', () => {

        // success
        let result = service.isValidCommand('PLACE 1,2,NORTH');
        expect(result).toBe(true);

        // lowercase direction
        result = service.isValidCommand('PLACE 1,2,north');
        expect(result).toBe(false);

        // no direction
        result = service.isValidCommand('PLACE 1,2');
        expect(result).toBe(false);

        // x is not a number
        result = service.isValidCommand('PLACE a,2,NORTH');
        expect(result).toBe(false);

        // y is not a number
        result = service.isValidCommand('PLACE 1,abc,NORTH');
        expect(result).toBe(false);

        // not paramss
        result = service.isValidCommand('PLACE');
        expect(result).toBe(false);
    });

    test('command: others', () => {

        for (const command in Command) {
            if (command !== Command.PLACE) { // ignore 'PLACE' (test done abov)
                const result = service.isValidCommand(command);
                expect(result).toBe(true);
            }
        }

        // try to add params
        const result = service.isValidCommand('RIGHT 1,2,NORTH');
        expect(result).toBe(false);

        // some random
        const notCommands = ['right', 'BACK', 'POP', 'RIGHT 1,2,NORTH'];
        for (const command of notCommands) {
            const isValid = service.isValidCommand(command);
            expect(isValid).toBe(false);
        }
    });

});

describe('test validCommands()', () => {
    const service = new RobotCommandValidator();

    test('filter out invalid code', () => {

        // 10 commands, 5 valid (index 0-4), 5 invalid (index 5-9)
        const numOfValidComamnds = 5;
        const lines = [
              'PLACE 0,0,NORTH'
            , 'MOVE'
            , 'LEFT'
            , 'RIGHT'
            , 'REPORT'
            , 'PLACE 1,2,SOUTHEAST' // invalid (SOUTHEAST is not included)
            , 'UP' // invalid
            , 'DOWN' // invalid
            , 'PLACE 0 2 NORTH' // invalid (not use comma for dilimiter for params)
            , 'Move' // invalid (not uppercase)
        ];

        const validCommands = service.validCommands(lines);
        expect(validCommands.length).toEqual(numOfValidComamnds);

        // index 0-4 has valid command
        for (const i = 0; i < numOfValidComamnds; i++) {
            expect(validCommands[i]).toEqual(lines[i]); // valid command
        }

    });

});

describe('test execute()', () => {

    const maxX = 4;
    const maxY = 4;
    const movementService = new RobotMovement(maxX, maxY);
    const commandExecutor = new RobotCommandExecutor(movementService);

    test('skip until PLACE command is executed', () => {

        let robot: MovingObject = movementService['robot'];

        // robot is not yet initialised as valid PLACE command is executed
        expect(robot).toBeUndefined();

        commandExecutor.execute('MOVE'); // still not PLACE command
        robot = movementService['robot'];
        expect(robot).toBeUndefined();

        commandExecutor.execute('PLACE'); // still not valid as PLACE command needs params
        robot = movementService['robot'];
        expect(robot).toBeUndefined();

        commandExecutor.execute('PLACE 1,2'); // still not valid as PLACE command needs params (x,y,direction)
        robot = movementService['robot'];
        expect(robot).toBeUndefined();

        commandExecutor.execute('PLACE 1 2 NORTH'); // still not valid as PLACE command needs params (x,y,direction)
        robot = movementService['robot'];
        expect(robot).toBeUndefined();

        commandExecutor.execute('PLACE 1,2,SOUTHEAST'); // still not valid as PLACE command needs params (x,y,direction), direction is invalid
        robot = movementService['robot'];
        expect(robot).toBeUndefined();

        commandExecutor.execute('PLACE 1,2,EAST'); // valid
        robot = movementService['robot'];
        expect(robot.currentX()).toEqual(1); // x: 1
        expect(robot.currentY()).toEqual(2); // y: 2
        expect(robot.currentDirection()).toEqual('EAST'); // direction: 'EAST'
    });

    test('valid place, left, move', () => {

        const lines = [
            'PLACE 2,3,NORTH'
            , 'LEFT' // face to 'WEST'
            , 'MOVE' // move (2,3) to (1,3)
        ];

        for (const line of lines) {
            commandExecutor.execute(line);
        }

        const robot = movementService['robot'];

        // expect x: 1, y:3, direction: WEST
        expect(robot.currentX()).toEqual(1);
        expect(robot.currentY()).toEqual(3);
        expect(robot.currentDirection()).toEqual(Direction.WEST);
    });

    test('include some invalid command', () => {
        const lines = [
              'PLACE 1,2,EAST'
            , 'MOVE' // (1,2) to (2,2)
            , 'UP' // invalid command (ignored)
            , 'MOVE' // to (3, 2)
            , 'DOWN' // invalid command (ignored)
            , 'LEFT' // face to 'NORTH'
            , 'REPORT'
        ];

        for (const line of lines) {
            commandExecutor.execute(line);
        }

        const robot = movementService['robot'];

        // expect x: 3, y:2, direction: NORTH
        expect(robot.currentX()).toEqual(3);
        expect(robot.currentY()).toEqual(2);
        expect(robot.currentDirection()).toEqual(Direction.NORTH);
    });

    test('skip invalid move(fall from table)', ()=> {

        const lines = [
            'PLACE 3,4,WEST'
          , 'MOVE' // (3,4) to (2,4)
          , 'RIGHT' // face to 'NORTH'
          , 'MOVE' // ignored as yPos will be 5 (out of boundary)
          , 'RIGHT' // face to 'EAST'
          , 'RIGHT' // face to 'SOUTH'
          , 'MOVE' // to (2, 3)
        ];

        for (const line of lines) {
            commandExecutor.execute(line);
        }

        const robot = movementService['robot'];

        // expect x: 2, y:3, direction: SOUTH
        expect(robot.currentX()).toEqual(2);
        expect(robot.currentY()).toEqual(3);
        expect(robot.currentDirection()).toEqual(Direction.SOUTH);
    });

});