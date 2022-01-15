import { Command } from '../enums/command';
import { PositionOrientation } from '../models/moving-object';
import Utils from '../utils/utils';
import LogService from './log-service';
import { MovementService } from './movement.service';

export abstract class CommandValidateService {

    /**
     * Check if the given line is valid command
     *
     * @param line
     */
    abstract isValidCommand(line: string): boolean;
}

/**
 * Class to validate the robot command
 */
export class RobotCommandValidator extends CommandValidateService {

    private readonly _commandDelimiter = ' ';

    /**
     * Return true if the give parameter is valid command
     *
     * @param line single line string to include command
     * @returns boolean
     */
    isValidCommand(line: string): boolean {
        let valid = false;

        const trimmed = line.trim(); // trim any extra space
        const commandAndParams = trimmed.split(this._commandDelimiter);
        const command = commandAndParams[0];

        switch(command) {
            case Command.LEFT:
            case Command.RIGHT:
            case Command.MOVE:
            case Command.REPORT:
                valid = commandAndParams.length === 1;
                break;

            case Command.PLACE:
                const posDir = Utils.placePositionOrientation(line);
                valid = posDir !== null;
                break;
        }

        return valid;
    }

    /**
     * Filter out invalid lines
     *
     * @param lines
     */
    validCommands(lines: string[]): string[] {
        const commands: string[] = [];

        // loop through and check if the line is valid command
        for (const line of lines) {
            const trimmedText = line.trim();
            if (this.isValidCommand(trimmedText)) {
                commands.push(trimmedText);
            }
        }

        return commands;
    }

}


/**
 * Abstract servic class to execute commands
 */
export abstract class CommandExecuteService {

    protected movementService: MovementService;

    constructor(service: MovementService) {
        this.movementService = service;
    }

    /**
     * Command: 'PLACE' can have different format/parameters
     *
     * @param line string value of 'PLACE' command
     */
    abstract placeValues(line: string): PositionOrientation;

    /**
     * Command: 'REPORT' can print result in different format
     */
    abstract report(): void;

}

/**
 * This class is used to excute the commands to move object
 */
export class RobotCommandExecutor extends CommandExecuteService {

    /**
     * Expecting command line 'PLACE <x>,<y>,<direction>'
     *
     * NOTE:
     * - one space between <command: PLACE> and parameters: <x,y,direction>
     * - parameters are seperated by comma(no space)
     *
     * @param line place command of string
     * @returns if valid command, return 'PositionOrientation' value. otherwise return null
     */
    placeValues(line: string): PositionOrientation | null {
        return Utils.placePositionOrientation(line);
    }

    /**
     * Show result in command line like this: 'OUTPUT: <x>,<y>,<direction>'
     */
    report(): void {
        // retrieve values: x, y, direction
        const xy = this.movementService.currentPosition();
        const direction = this.movementService.currentDirection();

        if (Array.isArray(xy) && xy.length === 2 && direction) {
            const x = xy[0];
            const y = xy[1];

            LogService.showLog(`OUTPUT: ${x},${y},${direction}`);
        }
    }

    /**
     * Execute command from the given string
     *
     * @param line string that contains command to move object
     */
    execute(line: string): void {
        // show the command to be executed if configured
        LogService.logExecutingCommand(line);

        if (line.includes(Command.PLACE)) {
            const posDir = this.placeValues(line);
            if (posDir) {
                this.movementService.place(posDir.x, posDir.y, posDir.direction);
            }

        } else if (line === Command.MOVE) {
            this.movementService.moveForward();

        } else if (line === Command.LEFT) {
            this.movementService.turnLeft();

        } else if (line === Command.RIGHT) {
            this.movementService.turnRight();

        } else if (line === Command.REPORT) {
            this.report();
        }
    }

}
