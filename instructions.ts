import { Puzzle, Robot } from './Puzzle';
import { InstructionFunctions } from './InstructionFunctions';

// Robot functions dictonary.
export const instructionFcts: InstructionFunctions = {
    'pass': pass,
    'move': move,
    'left': left,
    'right': right,
    'rotate': rotate
};

/**
 * Returns puzzle, represents an leaf function used when calling a program function.
 * @param puzzle Puzzle
 */
function pass(puzzle: Puzzle): Puzzle {
    return puzzle;
}

/**
 * Returns puzzle updating robot position by moving it one step forward. 
 * direction:  0:left , 1:down,  2:right,  3:up 
 * @param puzzle : Puzzle
 */
function move(puzzle: Puzzle): Puzzle {
    const robot: Robot = puzzle.robot;
    
    switch(robot.direction) {
        case 0: 
            puzzle.robot.column = robot.column-1;
            break;
        case 1: 
            puzzle.robot.row = robot.row+1;
            break;
        case 2: 
            puzzle.robot.column = robot.column+1;
            break;
        case 3: 
            puzzle.robot.row = robot.row-1;
            break;
        default:
            break;   
    }
    
    return puzzle;
}

/**
 * Returns puzzle updating robot position by rotating it to the right.
 * @param puzzle : Puzzle
 */
function right(puzzle: Puzzle): Puzzle {
    puzzle.robot.direction = (puzzle.robot.direction + 3) % 4;
    return puzzle;
}

/**
 * Returns puzzle updating robot position by rotating it to the left.
 * @param puzzle : Puzzle
 */
function left(puzzle: Puzzle): Puzzle {
    puzzle.robot.direction = (puzzle.robot.direction + 1) % 4;
    return puzzle;
}

/**
 * Returns puzzle updating robot position by making it turn around.
 * @param puzzle : Puzzle
 */
function rotate(puzzle: Puzzle): Puzzle {
    puzzle.robot.direction = (puzzle.robot.direction + 2) % 4;
    return puzzle;
}
