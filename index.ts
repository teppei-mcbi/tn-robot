import dotnet from 'dotenv';
import { InputMode } from './src/enums/input-mode';
import { CommandReader } from "./src/services/command-reader.service";
import LogService from './src/services/log-service';

/**
 * Entry point to execute robot challenge command line app
 * 
 * NOTE: 
 * - two modes to read data
 *      1: CMD - user input from command promst
 *      2: FILE - read from file
 * 
 * - with CMD, user needs to type command and press Enter key.
 * - with FILE, user needs to provide a file path in npx command like 'npx ts-node index.ts <file path>'
 * - valid file path should be included as an argument
 */

// get configs from .env
dotnet.config({ path: './config/.env'});

// initialise command reader
const reader = new CommandReader();

// input mode is defined in config(.env file)
const readInputMode = process.env.READ_INPUT_MODE;

switch(readInputMode) {
    case InputMode.CMD:
        // read command from user input
        reader.runWithUserInput();
        break;

    case InputMode.FILE:
        // read commands from file, make sure that <file path> is included in npm command
        reader.runWithFile();
        break;

    default:
        LogService.logError(`No such mode: ${readInputMode} to start`);
}