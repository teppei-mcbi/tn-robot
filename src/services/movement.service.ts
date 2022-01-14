import { Direction } from '../enums/direction';
import { MovingObject, Robot } from '../models/moving-object'

export interface MovementService {
    place(x: number, y: number, direction: Direction)
    moveForward(): void;
    turnLeft(): void;
    turnRight(): void;
    isValidPosition(x: number, y: number): boolean;
    currentPosition(): number[] | null;
    currentDirection(): Direction | null;
}

/**
 * Class to manage the movement of the Robot
 */
export class RobotMovement implements MovementService {

    private maxX: number;
    private maxY: number;
    private robot: MovingObject;
    
    /**
     * Constructor for robot movement service
     * 
     * @param x max limit of X pos
     * @param y max limit of Y pos
     */
    constructor(x: number, y: number) {
        this.maxX = x;
        this.maxY = y;
    }
    
    /**
     * Place the robot to specified position and facing direction
     * 
     * @param x robot's x position 
     * @param y robot's y position
     * @param direction robot's facing direction
     */
    place(x: number, y: number, direction: Direction) {
        
        if (this.isValidPosition(x, y)) {
            if (!this.robot) {
                // initialis 'Robot' object if not yet done
                this.robot = new Robot();
            }    

            // set the initial position
            this.robot.setPosition(x, y, direction);
        }
    }
    
    /**
     * Moving the robot to forward by 1 grid
     */
    moveForward(): void {
        if (this.robot) {
            let nextX: number;
            let nextY: number;
            
            // determine the next x/y pos
            switch (this.robot.currentDirection()) {
                case Direction.NORTH: // move up
                    nextY = this.robot.currentY() + 1;
                    break;
                
                case Direction.EAST: // move right
                    nextX = this.robot.currentX() + 1;
                    break;
            
                case Direction.SOUTH: // move down
                    nextY = this.robot.currentY() - 1;
                    break;
            
                case Direction.WEST: // move left
                    nextX = this.robot.currentX() - 1;
                    break;
            }

            // check if the next pos is valid
            if ( (nextX !== undefined && this.isValidPosition(nextX, this.robot.currentY()) || 
                nextY !== undefined && this.isValidPosition(this.robot.currentX(), nextY)) ) {

                // set x pos for robot
                if (nextX >= 0) {
                    this.robot.setCurrentX(nextX);
                }

                // set y pos for robot
                if (nextY >= 0) {
                    this.robot.setCurrentY(nextY);
                }
            }

        } else {
            console.log(`Robot is not yet initialised`)
        }
    }
    
    /**
     * Turn the robot by 90 degree to left
     */
    turnLeft():void {
        if (this.robot) {
            let nextDir: Direction = null;
            switch (this.robot.currentDirection()) {
                case Direction.NORTH: // north to west
                    nextDir = Direction.WEST;
                    break;

                case Direction.WEST: // west to south
                    nextDir = Direction.SOUTH;
                    break;

                case Direction.SOUTH: // south to east
                    nextDir = Direction.EAST;
                    break;

                case Direction.EAST: // east to north
                    nextDir = Direction.NORTH;
                    break;
            }

            // set current facing direction of the robot
            this.robot.setCurrentDirection(nextDir);

        } else {
            console.log(`Robot is not yet initialised`)
        }
    }
    
     /**
     * Turn the robot by 90 degree to right
     */
    turnRight(): void {
        if (this.robot) {
            let nextDir: Direction = null;
            switch (this.robot.currentDirection()) {
                case Direction.NORTH: // north to east
                    nextDir = Direction.EAST;
                    break;

                case Direction.EAST: // east to south
                    nextDir = Direction.SOUTH;
                    break;

                case Direction.SOUTH: // south to west
                    nextDir = Direction.WEST;
                    break;

                case Direction.WEST: // west to north
                    nextDir = Direction.NORTH;
                    break;
            }

            // set current facing direction of the robot
            this.robot.setCurrentDirection(nextDir);

        } else {
            console.log(`Robot is not yet initialised`)
        }
    }
    
    /**
     * Return true if the provided x, y positions are within the table
     * 
     * @param x robot's x position
     * @param y robot's y position
     * @returns boolean for valid position (still within the table)
     */
    isValidPosition(x: number, y: number): boolean {
        let valid = true;

        if (x < 0) {
            console.error(`X pos is negative: ${x}`)
            valid = false;

        } else if (this.maxX < x) {
            console.error(`X pos: ${x} exceeds max X: ${this.maxX}`)
            valid = false;

        } else if (y < 0) {
            console.error(`Y pos is negative: ${y}`)
            valid = false;

        } else if (this.maxY < y) {
            console.error(`Y pos: ${x} exceeds max Y: ${this.maxY}`)
            valid = false;
        }
        
        return valid;
    }

    /**
     * Current position(x, y) for the robot
     * 
     * @returns number array to include x y like [x,y] or null if robot is not initialised 
     */
    currentPosition(): number[] | null {
        if (this.robot) {
            return [this.robot.currentX(), this.robot.currentY()];
        } else {
            return null;
        }
    }

    /**
     * Current facing direction for the robot
     * 
     * @returns direction or null if robot is not initialised 
     */
    currentDirection(): Direction | null {
        if (this.robot) {
            return this.robot.currentDirection();
        } else {
            return null;
        }
    }
    
}
