import { Direction } from '../enums/direction';

/**
 * moving object interface
 */
export interface MovingObject {

    setPosition(x: number, y: number, direction: Direction);

    currentX(): number;
    setCurrentX(x: number): void;

    currentY(): number;
    setCurrentY(y: number): void;

    currentDirection(): Direction;
    setCurrentDirection(direction: Direction): void
}

/**
 * Robot class to move by commands
 */
export class Robot implements MovingObject {

    private x: number;
    private y: number;
    private direction: Direction;

    setPosition(xPos: number, yPos: number, facingDirection: Direction) {
        this.x = xPos;
        this.y = yPos;
        this.direction = facingDirection;
    }

    currentX(): number {
        return this.x;
    }

    setCurrentX(x: number): void {
        this.x = x;
    }

    currentY(): number {
        return this.y;
    }

    setCurrentY(y: number): void {
        this.y = y;
    }

    currentDirection(): Direction {
        return this.direction
    }

    setCurrentDirection(direction: Direction): void {
        this.direction = direction;
    }
}