import LogService from "./log-service";

const originalEnv = process.env;

beforeEach(() => {
    process.env = {
        ...originalEnv,
        LOG_SHOW_EXECUTING_COMMAND: 'true',
        LOG_SHOW_INVALID_MOVE: 'true',
        LOG_SHOW_ERROR: 'true'
    };
});

afterEach(() => {
    process.env = originalEnv;
});

describe('test logExecutingCommand()', () => {

    test('show executing command', () => {
        const msg = 'command';

        const consoleSpy = jest.spyOn(console, 'log');
        LogService.logExecutingCommand(msg);
        
        expect(consoleSpy).toHaveBeenCalledWith(msg);
    });

});

describe('test logInvalidMove()', () => {

    test('show invalid move', () => {
        const msg = 'message';

        const consoleSpy = jest.spyOn(console, 'log');
        LogService.logInvalidMove(msg);
        
        expect(consoleSpy).toHaveBeenCalledWith(msg);
    });

});

describe('test logError()', () => {

    test('show error', () => {
        const errMsg = 'error message';

        const consoleSpy = jest.spyOn(console, 'log');
        LogService.logError(errMsg);
        
        expect(consoleSpy).toHaveBeenCalledWith(errMsg);
    });
});

describe('test showLog()', () => {
    
    test('show log', () => {
        const msg = 'message';

        const consoleSpy = jest.spyOn(console, 'log');
        LogService.showLog(msg);
        
        expect(consoleSpy).toHaveBeenCalledWith(msg);
    });
});