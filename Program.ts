import { Puzzle } from './Puzzle';

/**
 * Corresponds to instruction structure.
 */
export type Instruction = {
  fct : (puzzle: Puzzle) => Puzzle; // 'pass': no instruction, else: instruction function.
  condition : number; // -1: no condition, else: puzzle structure color index.
  type: number; // -1: simple instruction, >= 0: function.
};

/**
 * Corresponds to program structure (instruction function list).
 */
export type Program = Array<Array<Instruction>>;
