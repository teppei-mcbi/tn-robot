import fs from 'fs';
import { readFile, stat } from 'fs/promises';
import * as readline from 'readline'

import { RobotCommandExecutor, RobotCommandValidator } from './command.service';
import { RobotMovement } from './movement.service';
import LogService from './log-service';

/**
 * Class to read command
 * 1. from command line: use function runWithUserInput()
 * 2. from file: user function runWithFile()
 */
export class CommandReader {

    private readLineInterface: readline.Interface;
    private cmdUserInputCount = 0;
    private readonly userInputLimit = Number.parseInt(process.env.CMD_INPUT_MAX, 10);

    /**
     * Initialise robot command executor
     *
     * @returns robot command executor to execute command
     */
    private initExecutor(): RobotCommandExecutor {
        // table grid (x, y)
        const gridX = Number.parseInt(process.env.TABLE_GRID_MAX_X, 10);
        const gridY = Number.parseInt(process.env.TABLE_GRID_MAX_Y, 10);

        const movementService = new RobotMovement(gridX, gridY);
        return new RobotCommandExecutor(movementService);
    }

    /**
     * Run the app by reading command from command line
     */
    runWithUserInput() {
        // init command excutor
        const executor = this.initExecutor();

        this.readLineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // start waiting for user input
        this.waitForUserInput(executor);
    }

    /**
     * In command line, wait for user input.
     * Once user type commmand and press enter key, the provided line of command will be executed.
     *
     * @param executor robot command executor
     */
    private waitForUserInput(executor: RobotCommandExecutor) {

        // show empty question and wait for user input
        this.readLineInterface.question('', (line: string) => {

            // execute command
            executor.execute(line);

            // increment user input count
            this.cmdUserInputCount++;

            // if not yet reached to max user input limit
            if (this.cmdUserInputCount < this.userInputLimit) {
                // recursive, wait for another user input
                this.waitForUserInput(executor);

            } else {
                // log and force to finish as reached to max limit of user input
                LogService.logError(`Reached to the max number of user input (limit: ${this.userInputLimit}). Close the app`);
                this.closeReadLineAndExist();
            }
        });
    }

    /**
     * Close readline and exit from this app
     */
    private closeReadLineAndExist() {
        this.readLineInterface.close();
        process.exit(0);
    }

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
            const commandExecutor = this.initExecutor();

            // validate commands and filter out any invalid ones
            const commandValidator = new RobotCommandValidator();
            const commands = commandValidator.validCommands(lines);

            // loop through and execute commands
            for (const command of commands) {
                commandExecutor.execute(command);
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                LogService.logError(`error occured: ${err.message}`);
            }
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
                const maxFileSize = Number.parseInt(process.env.FILE_MAX_SIZE, 10);
                if (fileSize <= maxFileSize) { // within the file size limit
                    const buffer = await readFile(path);
                    return buffer.toString();

                } else { // file too big
                    throw new Error(`file size: ${fileSize} is too big, max limit is ${maxFileSize} B`);
                }

            } else {
                throw new Error('file does not exists');
            }

        } catch (err) {
            throw err;
        }
    }
}
