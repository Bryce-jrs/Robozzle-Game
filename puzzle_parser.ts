import { Puzzle, Cell } from "./Puzzle";
import { Robozzle } from "./Robozzle";

// Board conversion table from robozzle format to the correct format.
const conversionTable: {[key: string]: Cell} = {
	' ': { indColor: 0, indItem: 0 },
	'b': { indColor: 1, indItem: 0 },
	'r': { indColor: 2, indItem: 0 },
	'g': { indColor: 3, indItem: 0 },
	'B': { indColor: 1, indItem: 1 },
	'R': { indColor: 2, indItem: 1 },
	'G': { indColor: 3, indItem: 1 }
};

/**
 * Returns restructured puzzle board from robozzle board.
 * @param strBoard string
 * @returns Array<Array<Cell>>
 */
export function convertBoard(strBoard: string): Array<Array<Cell>> {
	let id = 0;
	const res: Array<Array<Cell>> = [];

	for (let row = 0; row < 12; row++) {
		res.push([]);
		for (let col = 0; col < 16; col++) {
			res[row].push(conversionTable[strBoard[id]]);
			id++;
		}
	}

	return res;
}

/**
 * Returns number of stars present on the puzzle board.
 * @param strBoard string
 * @returns number
 */
export function countStar(strBoard: string): number {
	let counter = 0;

	for (let i = 0; i < strBoard.length; i++) {
		if (strBoard[i] === strBoard[i].toUpperCase()) {
			counter++;
		}
	}
	
	return counter;
}

/**
 * Returns puzzle structure from robozzle puzzle.
 * @param puzzle Robozzle
 * @returns Puzzle
 */
export function parsePuzzle(puzzle: Robozzle): Puzzle {
	return {
		name: puzzle.title,
		id: puzzle.id,
		help: puzzle.about,
		robot: {
			column: puzzle.robotCol,
			row: puzzle.robotRow,
			direction: puzzle.robotDir,
		},
		subs: puzzle.subs,
		objectives: [
			{
				win: "collectAll",
				change: "removeItem",
				params: {
					target: countStar(puzzle.board),
					current: 0,
					ref: "STAR"
				}
			}
		],
		colors: ["BLACK", "BLUE", "RED", "GREEN"],
		items: ["NOITEM", "STAR"],
		board: convertBoard(puzzle.board)
	};
}

/**
 * Returns puzzle structure array from robozzle puzzles.
 * @param puzzle Array<Robozzle>
 * @returns Array<Puzzle>
 */
export function parsePuzzles(puzzles: Array<Robozzle>): Array<Puzzle> {
	return puzzles.map((puzzle: Robozzle) => parsePuzzle(puzzle));
}
