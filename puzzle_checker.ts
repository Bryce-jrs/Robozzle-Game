import { Puzzle, Objective, Cell, Robot } from './Puzzle';

import { winFcts, changeFcts } from './objective_functions';

// Contains all Puzzle attributes for checking.
const puzzleAtt: Array<string> = [
    'name', 
    'id', 
    'help', 
    'robot', 
    'subs', 
    'objectives', 
    'colors', 
    'items', 
    'board'
];

/**
 * Returns true if required attributs are defined in 'puzzle'
 * structures (contains 'puzzleAtt' elements), false otherwise.
 * @param puzzle Puzzle
 * @returns boolean
 */
export function puzzleAttributesAreDefined(puzzle: Puzzle): boolean {
    return puzzleAtt.every((att: string) => 
        puzzle[att as keyof Puzzle] !== null && puzzle[att as keyof Puzzle] !== undefined);
}

/**
 * Returns true if 'obj' has a 'key' attribute, false otherwise.
 * @param obj Object
 * @param key string
 * @returns boolean
 */
export function hasKey(obj: object, key: string): boolean {
    return Object.keys(obj).includes(key);
}

/**
 * Returns true if required attributs are defined in 'robot'
 * structure, false otherwise.
 * A correct robot :
 * - contains 'row' attribute; 
 * - contains 'column' attribute; 
 * - contains 'direction' attribute.
 * @param robot Robot
 * @returns boolean
 */ 
 export function robotAttributesAreDefined(robot: Robot): boolean {
    return hasKey(robot, 'row') && hasKey(robot, 'column') && hasKey(robot, 'direction') ;
}

/**
 * Returns true if 'fctName' export function existence, false otherwise.
 * @param fctName string
 * @returns boolean
 */
export function fctIsDefined(fctName: string): boolean {
    return hasKey(winFcts, fctName) || hasKey(changeFcts, fctName);
}

/**
 * Returns true if functions of 'objectives' list are well defined, false otherwise.
 * A correct objective :
 * - contains 'win' key not empty and corresponding to an existing win 
 * objective function;
 * - contains 'change' key corresponding to an existing change objective function if
 * not empty;
 * - contains 'params' key with 'target', 'current' and 'ref' defined.
 * @param objectives Array<Objective>
 * @returns boolean
 */
export function objectivesAreCorrect(objectives: Array<Objective>): boolean {
    return objectives.every(
        (objective: Objective) => 
            hasKey(objective, 'win') &&
            hasKey(objective, 'change') &&
            hasKey(objective, 'params') &&
            objective.win !== '' &&
            fctIsDefined(objective.win) &&
            (objective.change === '' || fctIsDefined(objective.change))
    );
}

/**
 * Returns true if 'cell' is empty (cell.indColor = 0)
 * and has an item (cell.indItem != 0), false otherwise.
 * @param cell Cell
 * @returns boolean
 */
export function cellIsEmptyWithItem(cell: Cell): boolean {
    return cell.indColor === 0 && cell.indItem !== 0;
}

/**
 * Returns true if board attributes are correct, false otherwise.
 * To be correct :
 * - board attributes 'indColor' and 'indItem' have to exist;
 * - 'indColor' is part of colors defined;
 * - 'inditem' is part of items defined;
 * - empty cells do not have to take items.
 * @param board Array<Array<Cell>>
 * @param colors Array<string>
 * @param items Array<string>
 * @returns boolean
 */
export function boardAttributsAreCorrect(
    board: Array<Array<Cell>>,
    colors: Array<string>,
    items: Array<string>
): boolean {
    return board.every((row: Array<Cell>) =>
        row.every(
            (cell: Cell) =>
                hasKey(cell, 'indColor') &&
                hasKey(cell, 'indItem') &&
                cell.indColor < colors.length &&
                cell.indItem < items.length &&
                !cellIsEmptyWithItem(cell)
        )
    );
}

/**
 * Returns true if puzzles structure and data are correct,
 * false otherwise.
 * @param puzzles Array<Puzzle>
 * @returns boolean
 */
export function puzzlesAreCorrect(puzzles: Array<Puzzle>): boolean {
    return puzzles.every(
        (puzzle: Puzzle) =>
            puzzleAttributesAreDefined(puzzle) &&
            robotAttributesAreDefined(puzzle.robot) &&
            objectivesAreCorrect(puzzle.objectives) &&
            boardAttributsAreCorrect(puzzle.board, puzzle.colors, puzzle.items)
    );
}
