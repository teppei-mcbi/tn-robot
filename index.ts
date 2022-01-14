console.log(`${process.argv[2]}`)
const path = process.argv[2];

import { readFile } from './src/readfile';
// readFile('./test-data/case1.txt');
readFile(path);