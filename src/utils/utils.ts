import { Direction } from "../enums/direction";
import { PositionOrientation } from "../models/moving-object";

export default class Utils {

    static placePositionOrientation(line: string): PositionOrientation | null {
        let x: number;
        let y: number;
        let direction: Direction = null;

        const commandAndParams = line.split(' ');
        if (commandAndParams.length == 2) {
            const params = commandAndParams[1].split(',');
            if (params.length === 3) {
                x = Number.parseInt(params[0]);
                y = Number.parseInt(params[1]);
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

}
