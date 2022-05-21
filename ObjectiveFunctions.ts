import { Puzzle } from './Puzzle';

/**
 * Corresponds to objective win function dictonary.
 */
export type WinFunctions = {
  [key: string]: (puzzle: Puzzle, indObjective: number) => boolean;
};

/**
 * Corresponds to objective change function dictonary.
 */
export type ChangeFunctions = {
  [key: string]: (puzzle: Puzzle, indObjective: number) => void;
};
