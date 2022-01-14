import { Command } from "../enums/command";
import { RobotCommandValidator } from "./command.service";

describe('test isValidCommand', () => {
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

        for (let command in Command) {
            if (command !== Command.PLACE) { // ignore 'PLACE' (test done abov)
                let result = service.isValidCommand(command);
                expect(result).toBe(true);
            }
        }

        // try to add params
        let result = service.isValidCommand('RIGHT 1,2,NORTH');
        expect(result).toBe(false);

        // some random
        const notCommands = ['right', 'BACK', 'POP', 'RIGHT 1,2,NORTH'];
        for (let command of notCommands) {
            let result = service.isValidCommand(command);
            expect(result).toBe(false);
        }
    });

});