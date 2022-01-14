import fs from 'fs';
import { RobotCommandExecutor, RobotCommandValidator } from './services/command.service';
import { RobotMovement } from './services/movement.service';

export function readFile(path: string): void {
    // console.log(`readFile()`)

    // fs.readFile('./src/file.txt', (err, data) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            throw err;

        } else {
            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');

            for (let i of arr) {
                console.log(i);
            }

            const commandValidator = new RobotCommandValidator();
            const lines = commandValidator.validCommands(arr);

            const movementService = new RobotMovement(4, 4);
            const commandExecutor = new RobotCommandExecutor(movementService);

            for (let line of lines) {
                commandExecutor.execute(line);
            }
            
        }
    })
}