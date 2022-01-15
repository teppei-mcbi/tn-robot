export default class Constant {

    static readonly maxFileSize = 100 * 1000; // 100 KB

    // table grid (x, y) -- start from index 0
    static readonly tableGridMaxIndexX = 4; // x: 0-4
    static readonly tableGridMaxIndexY = 4; // y: 0-4

    // log configs
    static readonly logConfig = {
        showExecutingCommand: true,
        showInvalidMove: false,
        showError: true,
    }
    
}