# tn-robot

Code test: Robot challenge

With this app, the app reads a text file under the folder: 'test-data' and the file should include all the commands.

## Start command line app

Run `npm run start` to execute the app

## Run lint

Run `npm run lint` to execute lint via [Eslint](https://eslint.org/)

## Run tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).


## Setup
1. Download the source code or clone from the [Github repository](https://github.com/teppei-mcbi/tn-robot)
2. Run `npm install`
3. You can find 'case1.txt' file under the folder 'test-data' and this is used to run the command. You can modify this file
4. Run the command with `npm run start` to see the result

## Configs
Under /config folder, .env file includes all the configuration for this app. You can specifiy:
- table gird x,y values (table dimension 4x4 can be changed to any other values)
- log config
- read input mode (CMD/FILE)
- max number of user input limit
- max file size limit

## How to test
1. CMD mode
Set `READ_INPUT_MODE=CMD` in /config/.env file and run `npm run start`. Type commands and press Enter key. Ctrl + c to terminate the app.

2. FILE mode
Set `READ_INPUT_MODE=FILE` in /config/.env file, include file path in start script like `npx ts-node index.ts ./test-data/case1.txt` and run `npm run start`. The app will read a file and execute the commands and be terminated after finishing all the command. There are some more test files under folder /test-data.