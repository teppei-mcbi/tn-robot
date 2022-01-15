import fs from 'fs';
import { readFile, stat } from 'fs/promises';

import { RobotCommandExecutor, RobotCommandValidator } from './command.service';
import { RobotMovement } from './movement.service';
import Constant from '../utils/constants';
import LogService from './log-service';

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
            const dataString = await this.readFromFile(path);

            // each line to array
            const arrayOfLines = dataString.replace(/\r\n/g, '\n').split('\n');
            for (const line of arrayOfLines) {
                lines.push(line)
            }

            // initialise services to execute commands
            const movementService = new RobotMovement(Constant.tableGridMaxIndexX, Constant.tableGridMaxIndexY);
            const commandExecutor = new RobotCommandExecutor(movementService);

            // validate commands and filter out any invalid ones
            const commandValidator = new RobotCommandValidator();
            const commands = commandValidator.validCommands(lines);

            // loop through and execute commands
            for (const command of commands) {
                commandExecutor.execute(command);
            }

        } catch (err: any) {
            LogService.logError(`error occured: ${err.message}`);
        }
    }

    /**
     * Read data from file
     *
     * @param path file path
     * @returns string data from file
     */
    private async readFromFile(path: string) {

        try {
            // check if file exists
            if (fs.existsSync(path)) {

                // file stat for file size
                const fileStat = await stat(path);
                const fileSize = fileStat.size;

                // check file size
                if (fileSize <= Constant.maxFileSize) {
                    const buffer = await readFile(path);
                    return buffer.toString();

                } else { // file too big
                    throw new Error(`file size: ${fileSize} is too big, max limit is ${Constant.maxFileSize} B`);
                }

            } else {
                throw new Error('file does not exists');
            }

        } catch (err) {
            throw err;
        }
    }

}