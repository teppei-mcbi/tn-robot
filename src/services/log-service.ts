import Constant from "../utils/constants";

enum LogType {
    ExecutingCommand = 'ExecutingCommand',
    InvalidMove = 'InvalidMove',
    Error = 'Error',
}

/**
 * Log service class to show a log message in cosole
 */
export default class LogService {

    /**
     * Log executing command if configured
     *
     * @param message
     */
    static logExecutingCommand(message: string): void {
        this.log(message, LogType.ExecutingCommand);
    }

    /**
     * Log invalid move if configured
     *
     * @param message
     */
    static logInvalidMove(message: string): void {
        this.log(message, LogType.InvalidMove);
    }

    /**
     * Log error if configured
     *
     * @param message
     */
    static logError(message: string): void {
        this.log(message, LogType.Error)
    }

    /**
     * Show log message
     *
     * @param message
     */
    static showLog(message: string): void {
        console.log(message);
    }

    /**
     * Log the message in cosole if configured
     *
     * @param logMessage
     * @param type
     */
    private static log(logMessage: string, type: LogType) {
        if (this.isConfiguredToLog(type)) {
            this.showLog(logMessage);
        }
    }

    /**
     * Return true if log type is configure to print message in cosole
     *
     * @param logType log type
     * @returns
     */
    private static isConfiguredToLog(logType: LogType): boolean {
        const config = Constant.logConfig;

        switch(logType) {
            case LogType.ExecutingCommand:
                return config.showExecutingCommand;

            case LogType.InvalidMove:
                return config.showInvalidMove;

            case LogType.Error:
                return config.showError;

            default:
                return false;
        }
    }

}