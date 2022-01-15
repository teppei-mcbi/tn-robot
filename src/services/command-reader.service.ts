import fs from 'fs';
import { readFile } from 'fs/promises';
import { RobotCommandExecutor, RobotCommandValidator } from './command.service';
import { RobotMovement } from './movement.service';

/**
 * Class to read command
 */
export class CommandReader {

    /**
     * Run the app by reading command from file
     */
    async runWithFile() {
        try {
            
            // file path from command line argument
            const path = process.argv[2];
            
            // store lines of strings from file
            const lines: string[] = [];
            
            // read file async/await
            const buffer = await readFile(path);
            
            // each line to array
            const arrayOfLines = buffer.toString().replace(/\r\n/g, '\n').split('\n');
            for (let line of arrayOfLines) {
                lines.push(line)
            }
            
            const commandValidator = new RobotCommandValidator();
            const commands = commandValidator.validCommands(lines);

            const movementService = new RobotMovement(4, 4);
            const commandExecutor = new RobotCommandExecutor(movementService);

            for (let command of commands) {
                commandExecutor.execute(command);
            }
        
        } catch (err) {
            console.log(`error occured while reading a file: ${err.message}`);
        }
    }
}