import { Command } from '../enums/command';
import { Direction } from '../enums/direction';
import { MovementService } from './movement.service';

export interface CommandValidateService {

    isValidCommand(line: string): boolean;
    validCommands(lines: string[]): string[];
}

export class RobotCommandValidator implements CommandValidateService {
    
    private readonly commandDelimiter = ' ';
    private readonly paramsDelimiter = ',';
    private readonly paramLength = 3;
    private readonly paramIndexPosX = 0;
    private readonly paramIndexPosY = 1;
    private readonly paramIndexDirection = 2
    
    /**
     * Return true if the give parameter is valid command
     * 
     * @param line single line string to include command
     * @returns boolean
     */
    isValidCommand(line: string): boolean {
        let valid = false;

        const trimmed = line.trim(); // trim any extra space
        const commandAndParams = trimmed.split(this.commandDelimiter);
        const command = commandAndParams[0];

        switch(command) {
            case Command.LEFT:
            case Command.RIGHT:
            case Command.MOVE:
            case Command.REPORT:
                valid = commandAndParams.length === 1;
                break;

            case Command.PLACE:
                if (commandAndParams.length === 2) { // expecting params
                    // PLACE X,Y,F
                    const params = commandAndParams[1].split(this.paramsDelimiter);
                    if (params.length === this.paramLength) {
                        const x = Number.parseInt(params[this.paramIndexPosX]);
                        const y = Number.parseInt(params[this.paramIndexPosY]);
                        const direction = params[this.paramIndexDirection];

                        if (Number.isInteger(x) && Number.isInteger(y)) {
                            // x, y is integer
                            for (let d in Direction) { // direction matches
                                if (d === direction) {
                                    valid = true;
                                    break;
                                }
                            }
                        }
                    }
                }                
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
        const commands = [];

        // loop through and check if the line is valid command
        for (let line of lines) {
            const trimmedText = line.trim();
            if (this.isValidCommand(trimmedText)) {
                commands.push(trimmedText);
            }
        }

        return commands;
    }

}


export interface CommandExecuteService {
    execute(line: string): void;
}

/**
 * This class is used to excute the commands to move object
 */
export class RobotCommandExecutor implements CommandExecuteService {
    
    private movementService: MovementService;
    
    constructor(service: MovementService) {
        this.movementService = service;
    }

    /**
     * Execute command from the given string 
     * 
     * @param line string that contains command to move object
     */
    execute(line: string): void {

        if (line.startsWith(Command.PLACE)) {
            const params = line.split(' ')[1].split(',');
            const x = Number.parseInt(params[0]);
            const y = Number.parseInt(params[1]);
            let direction: Direction = null;

            switch (params[2]) {
                case Direction.NORTH:
                    direction = Direction.NORTH;
                    break;
                case Direction.EAST:
                    direction = Direction.EAST;
                    break;
                case Direction.SOUTH:
                    direction = Direction.SOUTH;
                    break;
                case Direction.WEST:
                    direction = Direction.WEST;
                    break;
            }
            this.movementService.place(x, y, direction)

        } else if (line === Command.MOVE) {
            this.movementService.moveForward();

        } else if (line === Command.LEFT) {
            this.movementService.turnLeft();

        } else if (line === Command.RIGHT) {
            this.movementService.turnRight();

        } else if (line === Command.REPORT) {
            const xy = this.movementService.currentPosition();
            const direction = this.movementService.currentDirection();

            if (Array.isArray(xy) && xy.length === 2 && direction) {
                const x = xy[0];
                const y = xy[1];
                console.log(`OUTPUT: ${x},${y},${direction}`);
            }
        }
    }
    
}

