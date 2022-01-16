import { Direction } from "../enums/direction";
import { PositionOrientation } from "../models/position-orientation";

export default class Utils {

    /**
     * Pass line of command string and return position(x,y) and direction/orientation
     *
     * @param line string command
     * @returns position and orientation
     */
    static placePositionOrientation(line: string): PositionOrientation | null {
        let x: number;
        let y: number;
        let direction: Direction = null;

        const commandAndParams = line.split(' ');
        if (commandAndParams.length === 2) {
            const params = commandAndParams[1].split(',');
            if (params.length === 3) {
                x = Number.parseInt(params[0], 10);
                y = Number.parseInt(params[1], 10);
                const facingDirection = params[2];

                switch (facingDirection) {
                    case Direction.NORTH:
                        direction = Direction.NORTH;
                        break;
                    case Direction.EAST:
                        direction = Direction.EAST;
                        break;
                    case Direction.SOUTH:
                        direction = Direction.SOUTH;
                        break;
                    case Direction.WEST:
                        direction = Direction.WEST;
                        break;
                }
            }
        }

        if (Number.isInteger(x) && Number.isInteger(y) && direction) {
            return {x,y,direction};
        } else {
            return null;
        }
    }

    /**
     * Pass string value for boolean and return true/false
     *
     * @param stringValue string value of boolean
     * @returns boolean value
     */
    static stringToBool(stringValue: string): boolean {
        // string is not empty
        if (stringValue) {
            return stringValue.toLocaleLowerCase() === 'true';
        } else {
            return false;
        }
    }

}
