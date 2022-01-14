// const world1 = 'world';

// export function hello(world: string = world1): string {
//   return `Hello ${world}! `;
// }

// const result = hello();
// console.log(`result: ${result}`)

export function sum(a, b) {
    return a + b;
}


// module.exports = sum;

// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
//   });

console.log(`${process.argv[2]}`)
//   console.log(`${process.argv[3]}`)

const path = process.argv[2];

import { readFile } from './readfile';
// readFile('./test-data/case1.txt');
readFile(path);