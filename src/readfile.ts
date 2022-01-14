import fs from 'fs';

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
            
        }
    })
}