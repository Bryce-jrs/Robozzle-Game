import { Puzzle, Objective, Cell, Parameters, Robot } from  './Puzzle';
import { WinFunctions, ChangeFunctions } from  './ObjectiveFunctions';

// Win objective functions dictonary.
export const winFcts: WinFunctions = {
    'reachCase': reachCase,
     'collectAll': collectAll,
     'collectNumber': collectNumber,
     'walkonColor': walkonColor
};

// Change objective functions dictonary.
export const changeFcts: ChangeFunctions = {
     'updatePos': updatePos,
     'removeItem': removeItem,
     'changeColor': changeColor
};

/**
 * Returns true if the robot has reached the correct cell corresponding 
 * to objective parameters.
 * @param puzzle Puzzle
 * @param indObjective number
 * @returns boolean
 */
function reachCase(puzzle: Puzzle, indObjective: number): boolean {
    const params: Parameters = puzzle.objectives[indObjective].params;
    return params.current === params.target;
}

/**
 * Updates robot index position depending on current robot position.
 * @param puzzle Puzzle
 * @param indObjective number 
 */
 function updatePos(puzzle: Puzzle, indObjective: number): void {
    const robot: Robot = puzzle.robot;
    puzzle.objectives[indObjective].params.current = robot.row * puzzle.board.length + robot.column;
}

/**
 * Returns true if the all items have been collected, false otherwise. 
 * @param puzzle Puzzle
 * @param indObjective number
 * @returns boolean
 */
function collectAll(puzzle: Puzzle, indObjective: number): boolean {
    const params: Parameters = puzzle.objectives[indObjective].params;
    return params.current === params.target;
}

/**
 * Removes the item from the robot position cell corresponding 
 * to the objective parameters.
 * @param puzzle Puzzle
 * @param indObjective number 
 */
 function removeItem(puzzle: Puzzle, indObjective: number): void {
    const objective: Objective = puzzle.objectives[indObjective];
    const robot: Robot = puzzle.robot;
    const items: Array<string> = puzzle.items;
    const board: Array<Array<Cell>> = puzzle.board;

    if (objective.params.ref === items[board[robot.row][robot.column].indItem]) {
        puzzle.board[robot.row][robot.column].indItem = 0;
        puzzle.objectives[indObjective].params.current += 1;
    }
}

/**
 * Returns true if the correct item number have been collected, false otherwise. 
 * @param puzzle Puzzle
 * @param indObjective number
 * @returns boolean
 */
 function collectNumber(puzzle: Puzzle, indObjective: number): boolean {
    const params: Parameters = puzzle.objectives[indObjective].params;
    return params.current >= params.target;
}

/**
 * Change the robot position cell color if it corresponds to 
 * the objective parameters.
 * @param puzzle Puzzle
 * @param indObjective number 
 */
function changeColor(puzzle: Puzzle, indObjective: number): void {
    const objective: Objective = puzzle.objectives[indObjective];
    const robot: Robot = puzzle.robot;
    const colors: Array<string> = puzzle.colors;
    const board: Array<Array<Cell>> = puzzle.board;

    if (objective.params.ref === colors[board[robot.row][robot.column].indColor]) {
        puzzle.board[robot.row][robot.column].indColor = 1;
        puzzle.objectives[indObjective].params.current += 1;
    }
}

/**
 * Returns true if the robot has moved on all the cells of the color,
 * false otherwise.
 * @param puzzle Puzzle
 * @param indObjective number
 * @returns boolean
 */
function walkonColor(puzzle: Puzzle, indObjective: number): boolean {
    const params: Parameters = puzzle.objectives[indObjective].params;
    return params.current >= params.target;
}
