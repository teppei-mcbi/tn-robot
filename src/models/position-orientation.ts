import { Direction } from '../enums/direction';

/**
 * Model for position: x, y and direction/orientation
 */

export interface PositionOrientation {
    x: number;
    y: number;
    direction: Direction;
}
