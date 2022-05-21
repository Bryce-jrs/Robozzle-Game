import { Robot } from "./Puzzle";

// basics move of the robot 
// direction:  0:rigth , 1:up,  2:left,  3:down 

/**
 * Updates robot position by moving it one step forward.
 * @param robot : Robot
 */
export function move(robot: Robot): void {
    switch(robot.direction) {
        case 0: 
            robot.column = robot.column+1;
            break;
        case 1: 
            robot.row = robot.row-1;
            break;
        case 2: 
            robot.column = robot.column-1;
            break;
        case 3: 
            robot.row = robot.row+1;
            break;
        default:
            break;   
    }
}

/**
 * Updates robot position by rotating it to the right.
 * @param robot : Robot
 */
export function right(robot: Robot): void {
    robot.direction = (robot.direction + 3) % 4;
}

/**
 * Updates robot position by rotating it to the left.
 * @param robot : Robot
 */
export function left(robot: Robot): void {
    robot.direction = (robot.direction + 1) % 4;
}
