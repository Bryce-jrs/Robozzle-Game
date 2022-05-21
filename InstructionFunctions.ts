import { Puzzle } from './Puzzle';

/**
 * Corresponds to instruction function dictonary.
 */
export type InstructionFunctions = {
  [key: string]: (puzzle: Puzzle) => Puzzle;
};
