import { Puzzle } from './Puzzle';

// Corresponds to result program execution structure.
export type ProgramResult = {
  executionStack: Array<Puzzle>; // stack puzzle states.
  log: string; // log message (error or 'OK').
  calledInstructions: number; // number of called instructions.
  calledFunctions: number; // number of called functions.
}
