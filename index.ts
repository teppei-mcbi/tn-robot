import dotnet from 'dotenv';
import { CommandReader } from "./src/services/command-reader.service";

/**
 * Entry point to execute robot challenge command line app
 * 
 * NOTE: 
 * - command should be 'npx ts-node index.ts <file path>'
 * - valid file path should be included as an argument
 */

// get configs from .env
dotnet.config({ path: './config/.env'});
        
// start reading a file to execute commands
const reader = new CommandReader();
reader.runWithFile();
